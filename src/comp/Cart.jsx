import React, { useEffect, useState } from 'react';

export default function Cart({ currentCart, Change_Qty, CalcTotal, DeleteProdFromCart, EmptyCart,currentUSer,PayCartFunc }) {
  useEffect(() => {
    // This code will run whenever `element.qty` changes
  }, [currentCart]);

 
  const [cardNum,SetCardNum] =useState('');
  const [cvv,Setcvv] = useState('');
  const [FullName,SetFullName] = useState(currentUSer?.name || '');
  const [ExpiredDate,SetExpiredDate] = useState('');


  const ShowInputsPay=()=>{
    document.getElementById('inp-pay').style.display = "block";

  }
  const PayFunc=()=>{

    if(PayCartFunc(cardNum , cvv , FullName , ExpiredDate)){
        alert('Payed seccfully');
        // EmptyCart();

    
    }else{
        alert('payed falied') ;
        return;
    }
   
  }

  return (
    <div className="cart-container">
      {currentCart.map((element, elementIndex) => (
        <div key={elementIndex} className="cart-item">
          <p className="product-name">Product Name: {element.product.Pname}</p>
          <p className="product-price">Product Price: {element.product.Price}</p>
          <p className="product-quantity">
            Product Quantity: <button onClick={() => Change_Qty('-', element.product.Pid)} className="quantity-button">-</button> {element.qty} <button onClick={() => Change_Qty('+', element.product.Pid)} className="quantity-button">+</button>
          </p>
          <img src={element.product.imgSrc} alt="" style={{height:100,width:100}} />
        
          <p className="product-total">Total: {element.product.Price * element.qty}</p>
          <button className="delete-button" onClick={() => DeleteProdFromCart(element.product.Pid)}>Delete From Cart</button>
        </div>
      ))}
      <h1 className="total-cart">Total Cart: {CalcTotal()}</h1>
      <div className='btns'>
        <button className="empty-cart-button" onClick={EmptyCart}>Empty Your Cart</button>
        <button className="empty-cart-button" onClick={ShowInputsPay}  >Start Pay</button>
      </div>
      <hr />
        <div id='inp-pay' className='inputs_pay'>
            <input 
            type="text"
            placeholder='Full Name'
            className='payment-input'
            value={currentUSer?.name}
            onChange={(e)=>SetFullName(e.target.value)}
            />
            <input 
            type="text" 
            placeholder='card Number'
            className='payment-input'
            value={cardNum}
            onChange={(e) => SetCardNum(e.target.value)}
            />
            <input 
            type="text"
            placeholder='cvv'
            className='payment-input'
            value={cvv}
            onChange={(e)=>Setcvv(e.target.value)}
            />
            <input 
            type="date"
            value={ExpiredDate}
            className='payment-input'
            onChange={(e)=>SetExpiredDate(e.target.value)}
            
            />
            <button  className='pay-button' onClick={PayFunc}> Pay Now </button>

        </div>
    </div>
  );
}
