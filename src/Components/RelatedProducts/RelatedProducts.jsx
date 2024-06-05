import React from 'react'
import './RelatedProducts.css'
import new_collections from '../Assets/new_collections'
import Item from '../Item/Item'

const RelatedProducts = () => {
  return (
    <div className='related-products'>
      <h1>RELATED PRODUCTS</h1>
      <hr />
      <div className="related-products-item">
        {new_collections.map((item,i) => {
          return <Item 
          key={i} 
          id={item.id} 
          name={item.name} 
          image={item.image} 
          new_price={item.new_price} 
          old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
