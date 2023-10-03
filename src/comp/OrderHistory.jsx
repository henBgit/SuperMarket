import React from 'react';

export default function OrderHistory({ HistoryOrders }) {
  console.log(HistoryOrders);
  return (
    <div className="order-history-container">
      {HistoryOrders.map((element, elementIndex) => (
        <div key={elementIndex} className="order-item">
          <div>
            <h1 className="order-title">Order {elementIndex + 1}</h1>
            <h2 className="products-title">Products in Order:</h2>
            {element.cart.map((elementCart, elementIndexCart) => (
              <div key={elementIndexCart} className="cart-item">
                <p className="product-name">Product Name: {elementCart.product.Pname}</p>
                <p className="product-price">Product Price: <strong>{elementCart.product.Price}</strong></p>
                <p className="product-quantity">Product Quantity: {elementCart.qty}</p>
                <img src={elementCart.product.imgSrc} alt="" style={{height:100,width:100}} />
        
              </div>
            ))}
          </div>
          <div>
            <p className="product-total">Total: {element.total}</p>
          </div>
          <div>
            <h2 className="payment-details-title">Details Payment:</h2>
            <p className="payment-detail">Payment Name: {element.details.name}</p>
            <p className="payment-detail">Card Number: {element.details.cardNum}</p>
            <p className="payment-detail">CVV: {element.details.CVV}</p>
            <p className="payment-detail">Expired Date: {element.details.expiredDate}</p>
          </div>
          <hr className="order-divider" />
        </div>
      ))}
    </div>
  );
}
