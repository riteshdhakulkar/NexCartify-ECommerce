// import React, { useEffect, useState } from 'react'
// import './ListProduct.css'
// import cross_icon from '../../assets/cross_icon.png'

// const ListProduct = () => {

//   const [allproducts, setAllProducts] = useState([]);

//   // FETCH PRODUCTS
//   const fetchInfo = async () => {
//     await fetch('http://localhost:4000/allproducts')
//       .then((res) => res.json())
//       .then((data) => {
//         setAllProducts(data);
//       });
//   };

//   useEffect(() => {
//     fetchInfo();
//   }, []);

//   // REMOVE PRODUCT
//   const remove_product = async (id) => {

//     await fetch('http://localhost:4000/removeproduct', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id: id }),
//     });

//     // REFRESH PRODUCTS AFTER DELETE
//     await fetchInfo();
//   };

//   return (
//     <div className='list-product'>

//       <h1>All Product List</h1>

//       <div className="listproduct-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Old Price</p>
//         <p>New Price</p>
//         <p>Category</p>
//         <p>Remove</p>
//       </div>

//       <div className="listproduct-allproducts">

//         {allproducts.map((product, index) => {
//           return (
//             <div
//               key={index}
//               className="listproduct-format-main listproduct-format"
//             >
//               <img
//                 src={product.image}
//                 alt=""
//                 className='listproduct-product-icon'
//               />

//               <p>{product.name}</p>

//               <p>${product.old_price}</p>

//               <p>${product.new_price}</p>

//               <p>{product.category}</p>

//               <img
//                 onClick={() => {
//                   remove_product(product.id)
//                 }}
//                 className='listproduct-remove-icon'
//                 src={cross_icon}
//                 alt=""
//               />
//             </div>
//           )
//         })}

//       </div>

//     </div>
//   )
// }

// // export default ListProduct
// import React, { useEffect, useState } from 'react';
// import './ListProduct.css';
// import cross_icon from '../../assets/cross_icon.png';
// import API_URL from '../../config/api';

// const ListProduct = () => {

//   const [allproducts, setAllProducts] = useState([]);

//   // FETCH PRODUCTS
//   const fetchInfo = async () => {
//     try {
//       const res = await fetch(`${API_URL}/allproducts`);
//       const data = await res.json();
//       setAllProducts(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchInfo();
//   }, []);

//   // REMOVE PRODUCT
//   const remove_product = async (id) => {

//     try {
//       await fetch(`${API_URL}/removeproduct`, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id }),
//       });

//       // refresh list
//       fetchInfo();

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className='list-product'>

//       <h1>All Product List</h1>

//       <div className="listproduct-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Old Price</p>
//         <p>New Price</p>
//         <p>Category</p>
//         <p>Remove</p>
//       </div>

//       <div className="listproduct-allproducts">

//         {allproducts.map((product, index) => {
//           return (
//             <div
//               key={index}
//               className="listproduct-format-main listproduct-format"
//             >
//               <img
//                 src={product.image}
//                 alt=""
//                 className='listproduct-product-icon'
//               />

//               <p>{product.name}</p>

//               <p>${product.old_price}</p>

//               <p>${product.new_price}</p>

//               <p>{product.category}</p>

//               <img
//                 onClick={() => remove_product(product.id)}
//                 className='listproduct-remove-icon'
//                 src={cross_icon}
//                 alt=""
//               />
//             </div>
//           );
//         })}

//       </div>

//     </div>
//   );
// };

// export default ListProduct;
import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import API_URL from "../../config/api";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const res = await fetch(`${API_URL}/allproducts`);
      const data = await res.json();
      setAllProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      const res = await fetch(`${API_URL}/removeproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Product Removed");
        fetchInfo();
      } else {
        alert("Failed to remove product");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="list-product">
      <h1>All Products</h1>

      <div className="listproduct-format-main">
        <p>Image</p>
        <p>Name</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproducts">
        {allproducts.map((product) => (
          <div
            key={product.id}
            className="listproduct-format-main listproduct-format"
          >
            <img
              src={product.image}
              alt=""
              className="listproduct-product-icon"
            />

            <p>{product.name}</p>
            <p>₹{product.old_price}</p>
            <p>₹{product.new_price}</p>
            <p>{product.category}</p>

            <img
              onClick={() => remove_product(product.id)}
              src={cross_icon}
              alt=""
              className="listproduct-remove-icon"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;