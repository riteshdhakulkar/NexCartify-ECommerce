import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Items/Item';
import API_URL from '../../config/api';

const Popular = () => {

  const [popularProduct, setPopularProduct] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/popularinwomen`)
      .then((response) => response.json())
      .then((data) => setPopularProduct(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />

      <div className="popular-item">
        {popularProduct.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;