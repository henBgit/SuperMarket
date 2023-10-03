
import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './comp/Login';
import User from './comp/User';
import Register from './comp/Register';



function App() {

  const [users,SetUsers]=useState([]);
  const [user,SetUser]=useState(null);

  const [hasLogin,SetHasLogin] = useState(false);

  const [products,SetProducts] = useState([
    {Pname:"Milk",Price:15,Pid:1,imgSrc:"https://cdn-icons-png.flaticon.com/512/869/869664.png"},
    {Pname:"Eggs",Price:23,Pid:2,imgSrc:"https://cdn-icons-png.flaticon.com/512/3142/3142726.png"},
    {Pname:"Cheese",Price:29,Pid:3,imgSrc:"https://cdn-icons-png.flaticon.com/512/883/883514.png"},
    {Pname:"Beef",Price:65,Pid:4,imgSrc:"https://cdn-icons-png.flaticon.com/512/3143/3143643.png"},
    {Pname:"Cucumber",Price:9,Pid:5,imgSrc:"https://cdn-icons-png.flaticon.com/512/3456/3456583.png"},
    {Pname:"Protein drink",Price:19,Pid:6,imgSrc:"https://cdn-icons-png.flaticon.com/512/4257/4257132.png"},
    {Pname:"Fries",Price:27,Pid:7,imgSrc:"https://cdn-icons-png.flaticon.com/512/4459/4459356.png"},
    {Pname:"Tomatoes",Price:15,Pid:8,imgSrc:"https://cdn-icons-png.flaticon.com/512/2909/2909894.png"},
    {Pname:"Orange jucie",Price:13,Pid:9,imgSrc:"https://cdn-icons-png.flaticon.com/512/1694/1694564.png"},
    {Pname:"Bananas",Price:10,Pid:10,imgSrc:"https://cdn-icons-png.flaticon.com/512/2909/2909761.png"},
    {Pname:"Mince",Price:35,Pid:11,imgSrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp7eyCLskiBcexz8HcLNElS8KCxuqVFqg0B0-aoErN-g&s"},
    {Pname:"Avocados",Price:20,Pid:12,imgSrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr6K_Z2Ejnk_8TGTDKoAEJ8jAuc8zjPMRKaNM01ItNIA&s"},
    {Pname:"Pizza",Price:40,Pid:13,imgSrc:"https://icons.iconarchive.com/icons/iconarchive/fat-sugar-food/512/Pizza-icon.png"},
    {Pname:"EggPlant",Price:19,Pid:14,imgSrc:"https://cdn-icons-png.flaticon.com/512/5572/5572151.png"},
  ])

  const [products_,SetProducts_] = useState(products);
  

  //crud: 

  // Register func: 

  const RegisterFunc = (name, email, pass) => {
    // Check if the email already exists in the users array
    const emailExists = users.some(user => user.email === email);
  
    if (emailExists) {
      console.log("Email already exists. User registration failed.");
      return false; // Return false to indicate that the registration failed
    }
  
    // If the email doesn't exist, create a new user
    const newUser = {
      name, email, pass, cart: [],historyOrders:[] ,favorites:[]
    };
  
    // Update the users array with the new user
    const updatedUsers = [...users, newUser];
    SetUsers(updatedUsers);
  
    return true; // Return true to indicate a successful registration
  }
  
  

  // Log in Func: 
  const LoginFunc=(Email,Pass)=>{
    const UserFound = users.filter(user => user.email === Email && user.pass === Pass);
    if (UserFound.length > 0) {
      console.log(UserFound[0]);
      SetUser(UserFound[0]);
      SetHasLogin(!hasLogin);
      return UserFound[0];
    } else {
      console.log("User not found");
      return null;
    }
  }


  // add to cart: 

  const Add_To_Cart = (pid) => {
    const ProductFound = products.find(prod => prod.Pid === pid);
  
    if (ProductFound) {
      // Clone the user object and its cart array
      const updatedUser = { ...user };
      const updatedCart = [...updatedUser.cart];
  
      // Check if the product already exists in the cart
      const existingCartItem = updatedCart.find(item => item.product.Pid === pid);
  
      if (existingCartItem) {
        // If it exists, increment the quantity
        existingCartItem.qty++;
      } else {
        // If it doesn't exist, add it to the cart with a quantity of 1
        const Prod_With_qty = { product: ProductFound, qty: 1 };
        updatedCart.push(Prod_With_qty);
      }
  
      // Update the user object with the modified cart
      updatedUser.cart = updatedCart;
  
      // Find the index of the user in the users array
      const userIndex = users.findIndex(u => u.email === user.email);
  
      // Clone the users array and update the user at the found index
      const updatedUsers = [...users];
      updatedUsers[userIndex] = updatedUser;
  
      // Update the state with the updated users and user objects
      SetUsers(updatedUsers);
      SetUser(updatedUser);
  
      console.log(user);
      return true;
    } else {
      console.log("Product not found");
      return false;
    }
  }
  
  

  //remove from cart: 


  const DeleteProdFromCart = (pid) => {
    // Clone the user object and its cart array
    const updatedUser = { ...user };
    const updatedCart = [...updatedUser.cart];
  
    // Find the index of the product in the cart
    const IndexToDelete = updatedCart.findIndex(element => element.product.Pid === pid);
  
    if (IndexToDelete !== -1) {
      // Remove the product from the cart array
      updatedCart.splice(IndexToDelete, 1);
  
      // Update the user object with the modified cart
      updatedUser.cart = updatedCart;
  
      // Find the index of the user in the users array
      const userIndex = users.findIndex(u => u.email === user.email);
  
      // Clone the users array and update the user at the found index
      const updatedUsers = [...users];
      updatedUsers[userIndex] = updatedUser;
  
      // Update the state with the updated users and user objects
      SetUsers(updatedUsers);
      SetUser(updatedUser);
  
      return true;
    } else {
      console.log("Product not found in the cart");
      return false;
    }
  }
  
  // change_Quantity:
  const Change_Qty = (char, pid) => {
    // Clone the user object and its cart array
    const updatedUser = { ...user };
    const updatedCart = [...updatedUser.cart];
  
    // Find the index of the product in the cart
    const IndexToChange = updatedCart.findIndex(element => element.product.Pid === pid);
  
    if (IndexToChange !== -1) {
      // Get the current quantity
      let currentQty = updatedCart[IndexToChange].qty;
  
      // Update the quantity based on the character
      if (char === '-') {
        if (currentQty > 1) {
          currentQty--; // Decrease by 1, but don't go below 1
        }
      } else if (char === '+') {
        currentQty++; // Increase by 1
      }
  
      // Update the cart with the new quantity
      updatedCart[IndexToChange].qty = currentQty;
  
      // Update the user object with the modified cart
      updatedUser.cart = updatedCart;
  
      // Find the index of the user in the users array
      const userIndex = users.findIndex(u => u.email === user.email);
  
      // Clone the users array and update the user at the found index
      const updatedUsers = [...users];
      updatedUsers[userIndex] = updatedUser;
  
      // Update the state with the updated users and user objects
      SetUsers(updatedUsers);
      SetUser(updatedUser);
  
      return true;
    } else {
      console.log("Product not found in the cart");
      return false;
    }
  }
  



  //products sort_by_price:
  


  const SortByPrice_Prods = () => {
    const sortedProducts = [...products].sort((a, b) => a.Price - b.Price);
    SetProducts_(sortedProducts);
  }

  //products sort_by_name:
  const SortByName_Prods = () => {
    const sortedProducts = [...products].sort((a, b) => a.Pname.localeCompare(b.Pname));
    SetProducts_(sortedProducts);
  }

  
  
  // Calc_total_cart: 

  const CalcTotal =()=>{
    const updatedUser = { ...user };
    const updatedCart = [...updatedUser.cart];
    let sum = 0;
    for(const element of updatedCart){
      sum += element.product.Price * element.qty;
    }
    return sum;
  }

  const ReturnTheOriginalsProds =()=>{
    SetProducts_(products);
  }
  const EmptyCart = () => {


    const updatedUser = { ...user };
    let updatedCart = [...updatedUser.cart];
  
    updatedCart = [];
    updatedUser.cart = updatedCart;
  
    const userIndex = users.findIndex(u => u.email === user.email);
  
    // Clone the users array and update the user at the found index
    const updatedUsers = [...users];
    updatedUsers[userIndex] = updatedUser;
  
    // Update the state with the updated users and user objects
    SetUsers(updatedUsers);
    SetUser(updatedUser);
  
    return true;
  };
  



  const PayCartFunc = (cardNum, CVV, name, expiredDate) => {
    console.log(cardNum);
    console.log(CVV);
    console.log(name);
    console.log(expiredDate);
    const orderObj = {
      cart: user.cart,
      total: CalcTotal(),
      details: {
        cardNum,
        CVV,
        name,
        expiredDate,
      },
    };
  
    const updatedUser = { ...user };
    const updatedHistoryOrders = [...updatedUser.historyOrders];
  
    updatedHistoryOrders.push(orderObj);
  
    // Update the user object with the modified historyOrders
    updatedUser.historyOrders = updatedHistoryOrders;
    
    // Update the cart and clear it
    updatedUser.cart = [];
    
    console.log(updatedUser);
  
    // Find the index of the user in the users array
    const userIndex = users.findIndex(u => u.email === user.email);
  
    // Clone the users array and update the user at the found index
    const updatedUsers = [...users];
    updatedUsers[userIndex] = updatedUser;
  
    // Update the state with the updated users and user objects
    SetUsers(updatedUsers);
    SetUser(updatedUser);
  
    return true;
  };
  
  
  const AddOrRemoveFromFavorites = (prod) => {
    // Clone the user object and its favorites array
    const updatedUser = { ...user };
    const updatedFavorites = [...updatedUser.favorites];
  
    // Check if the product already exists in the favorites
    const existingIndex = updatedFavorites.findIndex((favorite) => favorite.Pid === prod.Pid);
  
    if (existingIndex === -1) {
      // If it's not in favorites, add it
      updatedFavorites.push(prod);
    } else {
      // If it's already in favorites, remove it
      updatedFavorites.splice(existingIndex, 1);
    }
  
    // Update the user object with the modified favorites
    updatedUser.favorites = updatedFavorites;
  
    // Find the index of the user in the users array
    const userIndex = users.findIndex((u) => u.email === user.email);
  
    // Clone the users array and update the user at the found index
    const updatedUsers = [...users];
    updatedUsers[userIndex] = updatedUser;
  
    // Update the state with the updated users and user object
    SetUsers(updatedUsers);
    SetUser(updatedUser);
  
    console.log(updatedUser);
    return true
  };
  
  //currentProd,

  return (
    <div >
      <Router>
          <Routes>

          {hasLogin ? (
            users.map((user, indexUser) => (

              <Route
                key={indexUser}
                path={`/${user.name}`}
                element={<User  AddOrRemoveFromFavorites={AddOrRemoveFromFavorites} PayCartFunc={PayCartFunc} EmptyCart={EmptyCart} ReturnTheOriginalsProds={ReturnTheOriginalsProds} SetHasLogin={SetHasLogin} hasLogin={hasLogin} SetUser={SetUser} currentUser={user} Change_Qty={Change_Qty} CalcTotal={CalcTotal} SortByName_Prods={SortByName_Prods} SortByPrice_Prods={SortByPrice_Prods}  products={products} products_={products_} Add_To_Cart={Add_To_Cart} DeleteProdFromCart={DeleteProdFromCart}    />  }
              />
             
            ))
          ) : (
            <Route path='/' element ={ <Login  LoginFunc={LoginFunc}   /> } />
          )}

          <Route path='/register' element ={ <Register  RegisterFunc={RegisterFunc}   /> } />
        

          </Routes>
        </Router>
    </div>
  );
}

export default App;
