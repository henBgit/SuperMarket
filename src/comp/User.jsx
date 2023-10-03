import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Products from './Products';
import Cart from './Cart';
import OrderHistory from './OrderHistory';
import FavoriteProds from './FavoriteProds';

export default function User({AddOrRemoveFromFavorites,PayCartFunc,EmptyCart,ReturnTheOriginalsProds,SetUser,SetHasLogin,hasLogin,currentUser,Change_Qty,CalcTotal,SortByName_Prods, SortByPrice_Prods, products , products_ ,Add_To_Cart, DeleteProdFromCart}) {
    const navigate = useNavigate();
    const cart = currentUser.cart;
    console.log(currentUser);
    const orders = currentUser.historyOrders;

    useEffect(() => {
        // This code will run whenever `element.qty` changes
      }, [currentUser]);
    const [selectedComponent, setSelectedComponent] = useState('Products');
    const toggleComponent = (componentName) => {
        setSelectedComponent(componentName);
    };
    const logout =()=>{
        SetHasLogin(!hasLogin);
        SetUser(null);
          navigate('/');
        
      }

  return (
    <div className="user-container">
    <div className="user-buttons">
      <button onClick={() => toggleComponent('cart')}>Cart</button>
      <button onClick={() => toggleComponent('Products')}>Products</button>
      <button onClick={() => toggleComponent('OrderHistory')}>Order History</button>
      <button onClick={() => toggleComponent('Favorites')}>  Favorites Prods</button>
      <button onClick={() => logout()}>Exit</button>
    </div>

    {selectedComponent === 'Products' && (
      <Products AddOrRemoveFromFavorites={AddOrRemoveFromFavorites} ReturnTheOriginalsProds={ReturnTheOriginalsProds} SortByName_Prods={SortByName_Prods} SortByPrice_Prods={SortByPrice_Prods} products={products} products_={products_} Add_To_Cart={Add_To_Cart} />
    )}

    {selectedComponent === 'cart' && (
      <Cart currentUSer={currentUser} currentCart={cart} PayCartFunc={PayCartFunc} EmptyCart={EmptyCart} Change_Qty={Change_Qty} CalcTotal={CalcTotal} DeleteProdFromCart={DeleteProdFromCart} />
    )}
    {selectedComponent === 'OrderHistory' && (
      <OrderHistory HistoryOrders={orders} />
    )}
     {selectedComponent === 'Favorites' && (
      <FavoriteProds Add_To_Cart={Add_To_Cart} AddOrRemoveFromFavorites={AddOrRemoveFromFavorites} Favorites={currentUser.favorites} />
    )}

    
  </div>
  )
}
