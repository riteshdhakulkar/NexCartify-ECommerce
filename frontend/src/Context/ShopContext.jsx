// import React, { createContext, useEffect, useState } from "react";


// export const ShopContext = createContext(null);

// const getDefaultCart = () => {

//     let cart = {};

//     for (let index = 0; index < 300+1; index++) {

//         cart[index]= 0;

//     }

//     return cart;
// }

// const ShopContextProvider = (props) => {
//     const [all_product,setAll_Product]=useState([]);

//     const [cartItems, setCartItems] = useState(getDefaultCart());
// //for keeping the same products
//     // useEffect(()=>{
//     //      fetch('http://localhost:4000/allproducts')
//     //      .then((response)=>response.json())
//     //      .then((data)=>setAll_Product(data))
//     // },[])
//     useEffect(() => {

//   fetch('http://localhost:4000/allproducts')
//     .then((response) => response.json())
//     .then((data) => setAll_Product(data));



//   if(localStorage.getItem('auth-token')){

//     fetch('http://localhost:4000/getcart', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'auth-token': localStorage.getItem('auth-token'),
//         'Content-Type': 'application/json',
//       },
//       body: "",
//     })
//     .then((response) => response.json())
//     .then((data) => setCartItems(data));

//   }

// }, [])

//  const addToCart = (itemId, size) => {

//     console.log("Item ID:", itemId);
//     console.log("Selected Size:", size);

//     setCartItems((prev) => ({
//         ...prev,
//         [itemId]: (prev[itemId] || 0) + 1
//     }));

//     if (localStorage.getItem('auth-token')) {
//         fetch('http://localhost:4000/addtocart', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'auth-token': localStorage.getItem('auth-token'),
//             },
//             body: JSON.stringify({
//                 itemId,
//                 size
//             }),
//         })
//         .then(res => res.json())
//         .then(data => console.log(data))
//         .catch(err => console.error(err));
//     }
// };
//    const removeFromCart = (itemId) => {

//     setCartItems((prev) => ({
//         ...prev,
//         [itemId]:prev[itemId]-1}));

//     if (localStorage.getItem('auth-token')) {
//         fetch('http://localhost:4000/removefromcart', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'auth-token': localStorage.getItem('auth-token'),
//             },
//             body: JSON.stringify({ itemId }),
//         });
//     }
// };
//       const getTotalCartAmount = () => {

//     let totalAmount = 0;

//     for (const item in cartItems) {

//         if (cartItems[item] > 0) {

//             let itemInfo = all_product.find(
//                 (product) => product.id === Number(item)
//             );

//             totalAmount += itemInfo.new_price * cartItems[item];
//         }
//     }

//     return totalAmount;
// }
// const getTotalCartItems = () => {
//     let totalItem = 0;
//     for(const item in cartItems){
//         if(cartItems[item]>0){
//             totalItem+=cartItems[item];
//         }
//     }
//     return totalItem;
// }
//     const contextValue = {
//         getTotalCartItems,
//         getTotalCartAmount,
//         all_product,
//         cartItems,
//         addToCart,
//         removeFromCart
//     };

    

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }

// // export default ShopContextProvider;
// import React, { createContext, useEffect, useState } from "react";

// export const ShopContext = createContext(null);

// const ShopContextProvider = (props) => {

//     const [all_product, setAll_Product] = useState([]);

//     // ================= CART STATE =================
//     const [cartItems, setCartItems] = useState(() => {
//         const savedCart = localStorage.getItem("cart");
//         return savedCart ? JSON.parse(savedCart) : {};
//     });

//     // ================= LOAD PRODUCTS =================
//     useEffect(() => {
//         fetch("http://localhost:4000/allproducts")
//             .then(res => res.json())
//             .then(data => setAll_Product(data))
//             .catch(err => console.log(err));
//     }, []);

//     // ================= LOAD CART FROM BACKEND (ONLY IF LOGGED IN) =================
//     useEffect(() => {

//         const token = localStorage.getItem("auth-token");

//         if (token) {
//             fetch("http://localhost:4000/getcart", {
//                 method: "POST",
//                 headers: {
//                     Accept: "application/json",
//                     "auth-token": token,
//                     "Content-Type": "application/json",
//                 },
//                 body: "",
//             })
//                 .then(res => res.json())
//                 .then(data => {
//                     setCartItems(data || {});
//                 })
//                 .catch(err => console.log(err));
//         }

//     }, []);

//     // ================= SAVE CART TO LOCALSTORAGE =================
//     useEffect(() => {
//         localStorage.setItem("cart", JSON.stringify(cartItems));
//     }, [cartItems]);

//     // ================= ADD TO CART =================
//     const addToCart = (itemId, size) => {

//         const key = `${itemId}-${size}`;

//         setCartItems((prev) => ({
//             ...prev,
//             [key]: {
//                 itemId,
//                 size,
//                 qty: (prev[key]?.qty || 0) + 1
//             }
//         }));

//         const token = localStorage.getItem("auth-token");

//         if (token) {
//             fetch("http://localhost:4000/addtocart", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "auth-token": token,
//                 },
//                 body: JSON.stringify({ itemId, size }),
//             }).catch(err => console.log(err));
//         }
//     };

//     // ================= REMOVE FROM CART =================
//     const removeFromCart = (itemId, size) => {

//         const key = `${itemId}-${size}`;

//         setCartItems((prev) => {
//             const updated = { ...prev };

//             if (updated[key]?.qty > 1) {
//                 updated[key].qty -= 1;
//             } else {
//                 delete updated[key];
//             }

//             return updated;
//         });

//         const token = localStorage.getItem("auth-token");

//         if (token) {
//             fetch("http://localhost:4000/removefromcart", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "auth-token": token,
//                 },
//                 body: JSON.stringify({ itemId, size }),
//             }).catch(err => console.log(err));
//         }
//     };

//     // ================= TOTAL PRICE =================
//     const getTotalCartAmount = () => {

//         let totalAmount = 0;

//         for (const key in cartItems) {

//             const item = cartItems[key];

//             if (item.qty > 0) {

//                 const product = all_product.find(
//                     (p) => p.id === Number(item.itemId)
//                 );

//                 if (product) {
//                     totalAmount += product.new_price * item.qty;
//                 }
//             }
//         }

//         return totalAmount;
//     };

//     // ================= TOTAL ITEMS =================
//     const getTotalCartItems = () => {

//         let total = 0;

//         for (const key in cartItems) {
//             if (cartItems[key].qty > 0) {
//                 total += cartItems[key].qty;
//             }
//         }

//         return total;
//     };

//     // ================= CLEAR CART (LOGOUT USE) =================
//     const clearCart = () => {
//         setCartItems({});
//         localStorage.removeItem("cart");
//     };

//     // ================= CONTEXT VALUE =================
//     const contextValue = {
//         all_product,
//         cartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount,
//         getTotalCartItems,
//         clearCart
//     };

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     );
// };

// export default ShopContextProvider;
import React, { createContext, useEffect, useState } from "react";
import API_URL from "../config/api";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([]);

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : {};
    });

    // ================= LOAD PRODUCTS =================
    useEffect(() => {
        fetch(`${API_URL}/allproducts`)
            .then(res => res.json())
            .then(data => setAll_Product(data))
            .catch(err => console.log("Products error:", err));
    }, []);

    // ================= LOAD CART =================
    useEffect(() => {
        const token = localStorage.getItem("auth-token");

        if (token) {
            fetch(`${API_URL}/getcart`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": token,
                    "Content-Type": "application/json",
                },
                body: "",
            })
                .then(res => res.json())
                .then(data => setCartItems(data || {}))
                .catch(err => console.log("Cart error:", err));
        }
    }, []);

    // ================= SAVE CART =================
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // ================= ADD TO CART =================
    const addToCart = (itemId, size) => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
        alert("Please login first");
        return;
    }

    const key = `${itemId}-${size}`;

    setCartItems((prev) => ({
        ...prev,
        [key]: {
            itemId,
            size,
            qty: (prev[key]?.qty || 0) + 1
        }
    }));

    fetch(`${API_URL}/addtocart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
        body: JSON.stringify({ itemId, size }),
    });
};
    // ================= REMOVE FROM CART =================
  const removeFromCart = (itemId, size) => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
        alert("Please login first");
        return;
    }

    const key = `${itemId}-${size}`;

    setCartItems((prev) => {
        const updated = { ...prev };

        if (updated[key]?.qty > 1) {
            updated[key].qty -= 1;
        } else {
            delete updated[key];
        }

        return updated;
    });

    fetch(`${API_URL}/removefromcart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
        body: JSON.stringify({ itemId, size }),
    });
};

    // ================= TOTAL AMOUNT =================
    const getTotalCartAmount = () => {

        let totalAmount = 0;

        for (const key in cartItems) {

            const item = cartItems[key];

            if (item.qty > 0) {

                const product = all_product.find(
                    (p) => p.id === Number(item.itemId)
                );

                if (product) {
                    totalAmount += product.new_price * item.qty;
                }
            }
        }

        return totalAmount;
    };

    // ================= TOTAL ITEMS =================
    const getTotalCartItems = () => {

        let total = 0;

        for (const key in cartItems) {
            if (cartItems[key].qty > 0) {
                total += cartItems[key].qty;
            }
        }

        return total;
    };

    // ================= CLEAR CART =================
    const clearCart = () => {
        setCartItems({});
        localStorage.removeItem("cart");
    };

    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        clearCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;