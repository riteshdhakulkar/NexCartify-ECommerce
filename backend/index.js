const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// DATABASE
mongoose.connect("mongodb+srv://riteshdhakulkar:Ritesh1905@cluster0.hprzz5q.mongodb.net/e-commerce");

// ROOT
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// IMAGE STORAGE
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});


// PRODUCT MODEL
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: String,
    image: String,
    category: String,
    new_price: Number,
    old_price: Number,
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

// ADD PRODUCT
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
        id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    await product.save();

    res.json({ success: true, name: req.body.name });
});

// REMOVE PRODUCT
app.post('/removeproduct', async (req, res) => {
    const deletedProduct = await Product.findOneAndDelete({
        id: Number(req.body.id)
    });

    res.json({ success: true, deletedProduct });
});

// ALL PRODUCTS
app.get('/allproducts', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

// USER MODEL
const Users = mongoose.model('Users', {
    name: String,
    email: { type: String, unique: true },
    password: String,
    cartData: { type: Object, default: {} },
    date: { type: Date, default: Date.now }
});

// SIGNUP
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });

    if (check) {
        return res.status(400).json({
            success: false,
            errors: "User already exists"
        });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    const token = jwt.sign(
        { user: { id: user._id } },
        'secret_ecom'
    );

    res.json({ success: true, token });
});

// LOGIN
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });

    if (!user) {
        return res.json({ success: false, errors: "Wrong Email Id" });
    }

    if (req.body.password !== user.password) {
        return res.json({ success: false, errors: "Wrong Password" });
    }

    const token = jwt.sign(
        { user: { id: user._id } },
        'secret_ecom'
    );

    res.json({ success: true, token });
});

// NEW COLLECTIONS
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(-8);
    res.send(newcollection);
});

// POPULAR WOMEN
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: "women" });
    res.send(products.slice(0, 4));
});

// MIDDLEWARE
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ errors: "Please authenticate" });
    }
 else{
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (err) {
        return res.status(401).json({ errors: "Invalid token" });
    }}
};

// // ADD TO CART
// app.post('/addtocart', fetchUser, async (req, res) => {

//     try {
// console.log("Added:", req.body.itemId);
// console.log("Received Size:", req.body.size);
// console.log("User ID:", req.user.id);

//         let userData = await Users.findOne({ _id: req.user.id });

//         // CHECK USER
//         if (!userData) {
//             return res.status(404).json({
//                 success: false,
//                 errors: "User not found"
//             });
//         }

//         // CREATE cartData IF MISSING
//         if (!userData.cartData) {
//             userData.cartData = {};
//         }

//         // CREATE ITEM IF MISSING
//         if (!userData.cartData[req.body.itemId]) {
//             userData.cartData[req.body.itemId] = 0;
//         }

//         // INCREMENT
//         userData.cartData[req.body.itemId] += 1;

//        await Users.findOneAndUpdate(
//     { _id: req.user.id },
    
//     { $set: { cartData: userData.cartData } }
// );
//         res.json({
//             success: true,
//             message: "Added to cart"
//         });

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             success: false,
//             errors: "Server Error"
//         });
//     }
// });
app.post('/addtocart', fetchUser, async (req, res) => {

    try {

        console.log("Added:", req.body.itemId);
        console.log("Received Size:", req.body.size);
        console.log("User ID:", req.user.id);

        let userData = await Users.findOne({ _id: req.user.id });

        if (!userData) {
            return res.status(404).json({
                success: false,
                errors: "User not found"
            });
        }

        if (!userData.cartData) {
            userData.cartData = {};
        }

        // ✅ IMPORTANT FIX (SIZE INCLUDED)
        const { itemId, size } = req.body;
        const key = `${itemId}-${size}`;

        if (!userData.cartData[key]) {
            userData.cartData[key] = {
                itemId,
                size,
                qty: 0
            };
        }

        userData.cartData[key].qty += 1;

        await Users.updateOne(
            { _id: req.user.id },
            { $set: { cartData: userData.cartData } }
        );

        res.json({
            success: true,
            message: "Added to cart"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            errors: "Server Error"
        });
    }
});

// REMOVE FROM CART
app.post('/removefromcart', fetchUser, async (req, res) => {

    try {

        console.log("Removed:", req.body.itemId);

        let userData = await Users.findOne({ _id: req.user.id });

        // CHECK USER
        if (!userData) {
            return res.status(404).json({
                success: false,
                errors: "User not found"
            });
        }

        // CREATE cartData IF MISSING
        if (!userData.cartData) {
            userData.cartData = {};
        }

        const itemId = req.body.itemId;

        // DECREMENT ONLY IF > 0
        if (userData.cartData[itemId] > 0) {
            userData.cartData[itemId] -= 1;
        }
await Users.findOneAndUpdate(
    { _id: req.user.id },
    { $set: { cartData: userData.cartData } }
);

        res.json({
            success: true,
            message: "Removed from cart"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            errors: "Server Error"
        });
    }
});
// GET CART DATA
app.post('/getcart', fetchUser, async (req, res) => {

    try {

        let userData = await Users.findOne({ _id: req.user.id });

        if (!userData) {
            return res.status(404).json({
                success: false,
                errors: "User not found"
            });
        }

        res.json(userData.cartData);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            errors: "Server Error"
        });
    }
});

// // GET CART DATA
// app.post('/getcart', fetchUser, async (req, res) => {

//     try {

//         let userData = await Users.findOne({ _id: req.user.id });

//         if (!userData) {
//             return res.status(404).json({
//                 success: false,
//                 errors: "User not found"
//             });
//         }

//         res.json(userData.cartData);

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             success: false,
//             errors: "Server Error"
//         });
//     }
// });




// SERVER (ONLY ONCE)
app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});