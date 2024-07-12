import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import remove_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo  = async () => {
    const response = await fetch('http://localhost:4000/allproducts');
    const data = await response.json();
    setAllProducts(data);
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((item, index) => {
          return <div key={index} className="listproduct-format-main listproduct-format">
            <img src={item.image} alt="" className="listproduct-product-icon" />
            <p>{item.name}</p>
            <p>${item.old_price}</p>
            <p>${item.new_price}</p>
            <p>{item.category}</p>
            <img src={remove_icon} alt="" className="listproduct-remove-icon" />
          </div>
        })}
      </div>
    </div>
  )
}

export default ListProduct
