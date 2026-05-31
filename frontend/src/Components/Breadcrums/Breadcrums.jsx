import React from 'react'
import './Breadcrums.css'
import arror_icon from '../Assets/breadcrum_arrow.png'
const Breadcrums = (props) => {
    const {product}=props;
  return (
    <div className='Breadcrums'>
      HOME <img src={arror_icon} alt="" /> 
      SHOP <img src={arror_icon} alt="" />
      {product.category} <img src={arror_icon} alt="" />
      {product.name}
    </div>
  )
}

export default Breadcrums
