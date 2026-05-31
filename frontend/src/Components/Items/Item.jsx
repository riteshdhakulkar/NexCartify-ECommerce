import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <Link
      to={`/product/${props.id}`}
      className='item-link'
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className='item'>
        <img src={props.image} alt="" />

        <p>{props.name}</p>

        <div className='item-price'>
          <div className='item-price-new'>
            Rs.{props.new_price}
          </div>

          <div className='item-price-old'>
            Rs.{props.old_price}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Item