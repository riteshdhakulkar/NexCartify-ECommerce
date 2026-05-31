import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>

      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">
          Description
        </div>

        <div className="descriptionbox-nav-box-fade">
          Reviews (122)
        </div>
      </div>

      <div className="descriptionbox-description">

        <p>
          Elevate your everyday style with this premium quality T-shirt designed
          for comfort and modern fashion. Crafted from soft and breathable fabric,
          this outfit offers a lightweight feel perfect for daily wear, casual
          outings, gym sessions, or weekend styling.
        </p>

        <p>
          Featuring a trendy fit, durable stitching, and a stylish finish, this
          product combines elegance with long-lasting comfort. Pair it effortlessly
          with jeans, joggers, shorts, or jackets to create a smart and versatile
          look for every season.
        </p>

      </div>

    </div>
  )
}

export default DescriptionBox