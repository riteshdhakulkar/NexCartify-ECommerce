// import React, { useContext } from 'react'
// import './CSS/ShopCategory.css'
// import { ShopContext } from '../Context/ShopContext'
// import dropdown_icon from '../Components/Assets/dropdown_icon.png'
// import Item from '../Components/Items/Item'
// import { Link } from 'react-router-dom'

// const ShopCategory = (props) => {
//   const {all_product} = useContext(ShopContext)

//   return (
//     <div className='shop-category'>
//       <img className='shopcategory-banner' src={props.banner} alt="" />
//       <div className="shopcategory-indexSort">
//         <p>
//           <span>Showing 1-12</span> out of 36 products
//         </p>
//         <div className="shopcategor7g   q1y-sort">
//           Sort by <img src={dropdown_icon} alt="" />
//         </div>
//       </div>
      
//       <div className="shopcategory-products">
//   {all_product.map((item, i) => {

//     if (props.category.toLowerCase() === item.category.toLowerCase()) {

//       return (
//         <Item
//           key={i}
//           id={item.id}
//           name={item.name}
//           image={item.image}
//           new_price={item.new_price}
//           old_price={item.old_price}
//         />
//       )
//     }
//     else {
//       return null;
//     }

//   })}
// </div>
//        <Link 
//   to={`/${props.category === "men" ? "mens" : props.category === "women" ? "womens" : "kids"}`}
//   style={{ textDecoration: "none" }}
// >
//   <div className="shopcategory-loadmore">
//     Explore More
//   </div>
// </Link>
//       </div>

//   )
// }

// export default ShopCategory
import React, { useContext, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Items/Item'

const ShopCategory = (props) => {

  const { all_product } = useContext(ShopContext)
  const [visible, setVisible] = useState(10)

  const filteredProducts = all_product.filter(
    (item) => props.category.toLowerCase() === item.category.toLowerCase()
  )

  return (
    <div className='shop-category'>

      <a href="#shopcategory-products"><img className='shopcategory-banner' src={props.banner} alt="" /></a>

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{Math.min(visible, filteredProducts.length)}</span> out of {filteredProducts.length} products
        </p>

        <div className="shopcategor7g q1y-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products" id='shopcategory-products'>

        {filteredProducts
          .slice(0, visible)
          .map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        }

      </div>

      {visible < filteredProducts.length && (
        <div
          className="shopcategory-loadmore"
          onClick={() => setVisible(visible + 10)}
        >
          Explore More
        </div>
      )}

    </div>
  )
}

export default ShopCategory