// import React, { useContext } from 'react'
// import './ProductDisplay.css'

// import star_icon from '../Assets/star_icon.png'
// import star_dull_icon from '../Assets/star_dull_icon.png'

// import { ShopContext } from '../../Context/ShopContext'

// const ProductDisplay = ({ product }) => {

//   const { addToCart } = useContext(ShopContext);
  

//   if (!product) {
//     return <h1>Loading...</h1>
//   }

//   return (
//     <div className='productdisplay'>

//       <div className="productdisplay-left">

//         <div className="productdisplay-img-list">
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//         </div>

//         <div className="productdisplay-img">
//           <img
//             className='productdisplay-main-img'
//             src={product.image}
//             alt=""
//           />
//         </div>

//       </div>

//       <div className="productdisplay-right">

//         <h1>{product.name}</h1>

//         <div className="productdisplay-right-stars">
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_dull_icon} alt="" />
//           <p>(122)</p>
//         </div>

//         <div className="productdisplay-right-price">

//           <div className="productdisplay-right-price-old">
//            Rs. {product.old_price}
//           </div>

//           <div className="productdisplay-right-price-new">
//             Rs.{product.new_price}
//           </div>

//         </div>

//         <div className="productdisplay-right-description">
//           A lightweight, usually knitted, pullover shirt, close-fitting and with
//           a round neckline and short sleeves, worn as an undershirt or outer garment.
//         </div>

//         <div className="productdisplay-right-size">

//           <h1>Select Size</h1>

//           <div className="productdisplay-right-sizes">
//             <div>S</div>
//             <div>M</div>
//             <div>L</div>
//             <div>XL</div>
//             <div>XXL</div>
//           </div>

//         </div>

//         <button onClick={() => addToCart(product.id)}>
//           ADD TO CART
//         </button>

//         <p className='productdisplay-right-category'>
//           <span>Category :</span> Women, T-shirt, Crop top
//         </p>

//         <p className='productdisplay-right-category'>
//           <span>Tags :</span> Modern, Latest
//         </p>

//       </div>

//     </div>
//   )
// }

// export default ProductDisplay
 import React, { useContext, useState } from 'react'
import './ProductDisplay.css'

import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'

import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = ({ product }) => {

  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return <h1>Loading...</h1>
  }

  return (
    <div className='productdisplay'>

      <div className="productdisplay-left">

        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>

        <div className="productdisplay-img">
          <img
            className='productdisplay-main-img'
            src={product.image}
            alt=""
          />
        </div>

      </div>

      <div className="productdisplay-right">

        <h1>{product.name}</h1>

        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-price">

          <div className="productdisplay-right-price-old">
            Rs. {product.old_price}
          </div>

          <div className="productdisplay-right-price-new">
            Rs. {product.new_price}
          </div>

        </div>

        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with
          a round neckline and short sleeves, worn as an undershirt or outer garment.
        </div>

        <div className="productdisplay-right-size">

          <h1>Select Size</h1>

          <div className="productdisplay-right-sizes">

            <div
              className={selectedSize === "S" ? "selected-size" : ""}
              onClick={() => setSelectedSize("S")}
            >
              S
            </div>

            <div
              className={selectedSize === "M" ? "selected-size" : ""}
              onClick={() => setSelectedSize("M")}
            >
              M
            </div>

            <div
              className={selectedSize === "L" ? "selected-size" : ""}
              onClick={() => setSelectedSize("L")}
            >
              L
            </div>

            <div
              className={selectedSize === "XL" ? "selected-size" : ""}
              onClick={() => setSelectedSize("XL")}
            >
              XL
            </div>

            <div
              className={selectedSize === "XXL" ? "selected-size" : ""}
              onClick={() => setSelectedSize("XXL")}
            >
              XXL
            </div>

          </div>

        </div>

        <button
          onClick={() => {

            if (!selectedSize) {
              alert("Please select a size");
              return;
            }

            addToCart(product.id, selectedSize);

          }}
        >
          ADD TO CART
        </button>

        <p className='productdisplay-right-category'>
          <span>Category :</span> Women, T-shirt, Crop top
        </p>

        <p className='productdisplay-right-category'>
          <span>Tags :</span> Modern, Latest
        </p>

      </div>

    </div>
  )
}

export default ProductDisplay