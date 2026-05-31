// import React, { useState } from 'react'
// import './AddProduct.css'
// import upload_area from '../../assets/upload_area.svg'

// const AddProduct = () => {

//   const [image, setImage] = useState(false);

//   const [productDetails, setProductDetails] = useState({
//     name: "",
//     image: "",
//     category: "women",
//     new_price: "",
//     old_price: ""
//   });

//   // Image Handler
//   const imageHandler = (e) => {
//     setImage(e.target.files[0]);
//   };

//   // Input Change Handler
//   const changeHandler = (e) => {
//     setProductDetails({
//       ...productDetails,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Add Product Function
//   const Add_Product = async () => {

//     console.log(productDetails);

//     let responseData;

//     let product = { ...productDetails };

//     let formData = new FormData();

//     formData.append('product', image);

//     // Upload Image
//     await fetch('http://localhost:4000/upload', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//       },
//       body: formData,
//     })
//       .then((resp) => resp.json())
//       .then((data) => {
//         responseData = data;
//       });

//     // Save Product
//     if (responseData.success) {

//       product.image = responseData.image_url;

//       console.log(product);

//       await fetch('http://localhost:4000/addproduct', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(product),
//       })
//         .then((resp) => resp.json())
//         .then((data) => {

//           if (data.success) {
//             alert("Product Added");
//           }
//           else {
//             alert("Failed");
//           }

//         });
//     }
//   }

//   return (
//     <div className='add-product'>

//       <div className="addproduct-itemfield">
//         <p>Product title</p>

//         <input
//           value={productDetails.name}
//           onChange={changeHandler}
//           type="text"
//           name='name'
//           placeholder='type here'
//         />
//       </div>

//       <div className="addproduct-price">

//         <div className="addproduct-itemfield">
//           <p>Price</p>

//           <input
//             value={productDetails.old_price}
//             onChange={changeHandler}
//             type="text"
//             name='old_price'
//             placeholder='type here'
//           />
//         </div>

//         <div className="addproduct-itemfield">
//           <p>Offer Price</p>

//           <input
//             value={productDetails.new_price}
//             onChange={changeHandler}
//             type="text"
//             name='new_price'
//             placeholder='type here'
//           />
//         </div>

//         <div className="addproduct-itemfield">
//           <p>Product Category</p>

//           <select
//             value={productDetails.category}
//             onChange={changeHandler}
//             name="category"
//             className='add-product-selector'
//           >
//             <option value="women">Women</option>
//             <option value="men">Men</option>
//             <option value="kid">Kid</option>
//           </select>
//         </div>

//         <div className="addproduct-itemfield">

//           <label htmlFor="file-input">

//             <img
//               src={image ? URL.createObjectURL(image) : upload_area}
//               alt=""
//               className='addproduct-thumbnail-img'
//             />

//           </label>

//           <input
//             onChange={imageHandler}
//             type="file"
//             name='image'
//             id='file-input'
//             hidden
//           />

//         </div>

//         <button
//           onClick={() => { Add_Product() }}
//           className='addproduct-button'
//         >
//           ADD
//         </button>

//       </div>
//     </div>
//   )
// }

// // export default AddProduct
// import React, { useState } from 'react';
// import './AddProduct.css';
// import upload_area from '../../assets/upload_area.svg';
// import API_URL from '../../config/api';

// const AddProduct = () => {

//   const [image, setImage] = useState(false);

//   const [productDetails, setProductDetails] = useState({
//     name: "",
//     image: "",
//     category: "women",
//     new_price: "",
//     old_price: ""
//   });

//   // Image Handler
//   const imageHandler = (e) => {
//     setImage(e.target.files[0]);
//   };

//   // Input Change Handler
//   const changeHandler = (e) => {
//     setProductDetails({
//       ...productDetails,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Add Product Function
//   const Add_Product = async () => {

//     let responseData;

//     let product = { ...productDetails };

//     let formData = new FormData();
//     formData.append('product', image);

//     // ================= UPLOAD IMAGE =================
//     await fetch(`${API_URL}/upload`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//       },
//       body: formData,
//     })
//       .then((resp) => resp.json())
//       .then((data) => {
//         responseData = data;
//       })
//       .catch(err => console.log(err));

//     // ================= SAVE PRODUCT =================
//     if (responseData?.success) {

//       product.image = responseData.image_url;

//       await fetch(`${API_URL}/addproduct`, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(product),
//       })
//         .then((resp) => resp.json())
//         .then((data) => {

//           if (data.success) {
//             alert("Product Added Successfully");
//           } else {
//             alert("Failed to Add Product");
//           }

//         })
//         .catch(err => console.log(err));
//     }
//   };

//   return (
//     <div className='add-product'>

//       <div className="addproduct-itemfield">
//         <p>Product title</p>
//         <input
//           value={productDetails.name}
//           onChange={changeHandler}
//           type="text"
//           name='name'
//           placeholder='type here'
//         />
//       </div>

//       <div className="addproduct-price">

//         <div className="addproduct-itemfield">
//           <p>Price</p>
//           <input
//             value={productDetails.old_price}
//             onChange={changeHandler}
//             type="text"
//             name='old_price'
//             placeholder='type here'
//           />
//         </div>

//         <div className="addproduct-itemfield">
//           <p>Offer Price</p>
//           <input
//             value={productDetails.new_price}
//             onChange={changeHandler}
//             type="text"
//             name='new_price'
//             placeholder='type here'
//           />
//         </div>

//         <div className="addproduct-itemfield">
//           <p>Product Category</p>

//           <select
//             value={productDetails.category}
//             onChange={changeHandler}
//             name="category"
//             className='add-product-selector'
//           >
//             <option value="women">Women</option>
//             <option value="men">Men</option>
//             <option value="kid">Kid</option>
//           </select>
//         </div>

//         <div className="addproduct-itemfield">

//           <label htmlFor="file-input">
//             <img
//               src={image ? URL.createObjectURL(image) : upload_area}
//               alt=""
//               className='addproduct-thumbnail-img'
//             />
//           </label>

//           <input
//             onChange={imageHandler}
//             type="file"
//             name='image'
//             id='file-input'
//             hidden
//           />

//         </div>

//         <button
//           onClick={Add_Product}
//           className='addproduct-button'
//         >
//           ADD
//         </button>

//       </div>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import API_URL from "../../config/api";

const AddProduct = () => {
  const [image, setImage] = useState(null);

  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const Add_Product = async () => {
    try {
      if (!image) {
        alert("Please select an image");
        return;
      }

      // 1️⃣ Upload image first
      const formData = new FormData();
      formData.append("product", image);

      const uploadRes = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        alert("Image upload failed");
        return;
      }

      // 2️⃣ Save product
      const product = {
        ...productDetails,
        image: uploadData.image_url,
      };

      const response = await fetch(`${API_URL}/addproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (data.success) {
        alert("Product Added Successfully");

        setProductDetails({
          name: "",
          category: "women",
          new_price: "",
          old_price: "",
        });
        setImage(null);
      } else {
        alert("Failed to Add Product");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Enter product name"
        />
      </div>

      <div className="addproduct-price">
        <input
          value={productDetails.old_price}
          onChange={changeHandler}
          type="number"
          name="old_price"
          placeholder="Old Price"
        />

        <input
          value={productDetails.new_price}
          onChange={changeHandler}
          type="number"
          name="new_price"
          placeholder="New Price"
        />
      </div>

      <select
        name="category"
        value={productDetails.category}
        onChange={changeHandler}
      >
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="kid">Kid</option>
      </select>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="addproduct-thumbnail-img"
          />
        </label>

        <input
          onChange={imageHandler}
          type="file"
          id="file-input"
          hidden
        />
      </div>

      <button onClick={Add_Product} className="addproduct-button">
        ADD PRODUCT
      </button>
    </div>
  );
};

export default AddProduct;