import React from 'react';
export default function Products({AddOrRemoveFromFavorites, ReturnTheOriginalsProds, SortByName_Prods, SortByPrice_Prods, products_, Add_To_Cart }) {
    
    const addTocartBtn =(pid)=>{
        if(Add_To_Cart(pid)){
            alert('prod added ');
        }else{
            alert('faliled to add');
        }
    }
    const changeFavorite=(prod)=>{
        if(AddOrRemoveFromFavorites(prod)){
            alert('added or remove secceffuly');
        }else{
            alert('cannot add or remove this prod');
        }
    }

  return (
    <div className="products-container">
    <div className="products-buttons">
      <button onClick={SortByName_Prods}>Sort by Name</button>
      <button onClick={SortByPrice_Prods}>Sort by Price</button>
      <button onClick={ReturnTheOriginalsProds}>Remove Sorting</button>
    </div>

    {products_.map((prod, prodIndex) => (
      <div key={prod.Pid} className="product-card">
        <p className="product-name">Name: {prod.Pname}</p>
        <p className="product-price">Price: <strong>{prod.Price}</strong></p>
        <p className="product-pid">Pid: {prod.Pid}</p>
        <img src={prod.imgSrc} alt="" style={{height:100,width:100}} />
        
        <div className='btns'>
            <button className="add-to-cart-button" onClick={() => addTocartBtn(prod.Pid)}>Add To Cart</button>
            <button className="add-to-cart-button" onClick={() => changeFavorite(prod)}>add to Favorites</button>
        </div>
        
      </div>
    ))}
  </div>
  );
}
