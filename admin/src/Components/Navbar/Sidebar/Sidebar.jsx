import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from "../../../assets/Product_Cart.svg";
import list_product_icon from "../../../assets/Product_list_icon.svg"
const Sidebar = () => {
  return (
    <div className='sidebar'>

      <Link to={'/addproduct'} className="sidebar-link" style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="Add Product" />
          <p>Add Product</p>
        </div>
      </Link>
      
      <Link to={'/listproduct'} className="sidebar-link" style={{textDecoration:"none"}}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="Product list" />
          <p>Product list</p>
        </div>
      </Link>

    </div>
  )
}

export default Sidebar