import React, { useRef } from 'react'
import './RelatedProducts.css'
import new_collections from '../Assets/new_collections'
import Item from '../Item/Item'

const RelatedProducts = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollLeft -= 200;
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollLeft += 200;
  };

  return (
    <div className='related-products'>
      <h1>RELATED PRODUCTS</h1>
      <hr />
      <button className='scroll-button scroll-button-left' onClick={scrollLeft}>
        &lt;
      </button>
      <div className="related-products-item" ref={scrollContainerRef}>
        {new_collections.map((item, i) => {
          return <Item 
            key={i} 
            id={item.id} 
            name={item.name} 
            image={item.image} 
            new_price={item.new_price} 
            old_price={item.old_price}
          />
        })}
      </div>
      <button className='scroll-button scroll-button-right' onClick={scrollRight}>
        &gt;
      </button>
    </div>
  )
}

export default RelatedProducts
