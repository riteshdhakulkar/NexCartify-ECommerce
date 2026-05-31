// import React, { useContext } from 'react'
// import "./CartItems.css"
// import remove_icon from '../Assets/cart_cross_icon.png'
// import { ShopContext } from '../../Context/ShopContext'

// const CartItems = () => {

//   const {getTotalCartAmount,  all_product, cartItems, removeFromCart } = useContext(ShopContext);

//   return (
//     <div className='cartitems'>
//       <div className="cartitems-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Price</p>
//         <p>Quantity</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <hr />

//       {all_product.map((e) => {

//         if (cartItems[e.id] > 0) {
//           return (
//             <div key={e.id}>
//               <div className="cartitems-format cartitems-format-main">
//                 <img className='carticon-product-icon' src={e.image} alt="" />
//                 <p>{e.name}</p>
//                 <p>${e.new_price}</p>

//                 <button className='cartitems-quantity'>
//                   {cartItems[e.id]}
//                 </button>

//                 <p>${e.new_price * cartItems[e.id]}</p>

//                 <img className='cartitems-remove-icon'
//                   src={remove_icon}
//                   onClick={() => { removeFromCart(e.id) }}
//                   alt=""
//                 />
//               </div>
//               <hr />
//             </div>
//           )
//         }

//         return null;
//       })}
//      <div className="cartitems-down">

//     <div className="cartitems-total">

//         <h1>Cart Totals</h1>

//         <div className="cartitems-total-items">
//             <p>Subtotal</p>
//             <p>${getTotalCartAmount()}</p>
//         </div>

//         <hr />

//         <div className="cartitems-total-items">
//             <p>Shipping fee</p>
//             <p>Free</p>
//         </div>

//         <hr />

//         <div className="cartitems-total-items">
//             <h3>Total</h3>
//             <h3>Rs.{getTotalCartAmount()}</h3>
//         </div>

//       <button >
//   PROCEED TO CHECKOUT
// </button>

//     </div>

//     <div className="cartitems-promocode">

//         <p>If you have a promo code, Enter it here</p>

//         <div className="cartitems-promobox">
//             <input type="text" placeholder='promo code' />
//             <button>Submit</button>
//         </div>

//     </div>

// </div>
//     </div>
//   )
// }

// export default CartItems

import React, { useContext } from 'react'
import "./CartItems.css"
import remove_icon from '../Assets/cart_cross_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const CartItems = () => {

  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart
  } = useContext(ShopContext);

  return (
    <div className='cartitems'>

      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr />

      {Object.keys(cartItems).map((key) => {

        const item = cartItems[key];

        const product = all_product.find(
          (p) => p.id === Number(item.itemId)
        );

        if (!product) return null;

        return (
          <div key={key}>
            <div className="cartitems-format cartitems-format-main">

              <img className='carticon-product-icon' src={product.image} alt="" />

              <p>{product.name}</p>

              {/* SIZE */}
              <p>{item.size}</p>

              <p>Rs.{product.new_price}</p>

              <button className='cartitems-quantity'>
                {item.qty}
              </button>

              <p>Rs.{product.new_price * item.qty}</p>

              <img
                className='cartitems-remove-icon'
                src={remove_icon}
                onClick={() => removeFromCart(item.itemId, item.size)}
                alt=""
              />

            </div>

            <hr />
          </div>
        );
      })}

      {/* TOTAL SECTION */}
      <div className="cartitems-down">

        <div className="cartitems-total">

          <h1>Cart Totals</h1>

          <div className="cartitems-total-items">
            <p>Subtotal</p>
            <p>Rs.{getTotalCartAmount()}</p>
          </div>

          <hr />

          <div className="cartitems-total-items">
            <p>Shipping fee</p>
            <p>Free</p>
          </div>

          <hr />

          <div className="cartitems-total-items">
            <h3>Total</h3>
            <h3>Rs.{getTotalCartAmount()}</h3>
          </div>

          <button>
            PROCEED TO CHECKOUT
          </button>

        </div>

        <div className="cartitems-promocode">

          <p>If you have a promo code, Enter it here</p>

          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>

        </div>

      </div>

    </div>
  )
}

export default CartItems