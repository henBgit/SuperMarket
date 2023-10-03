import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';

export default function Register({RegisterFunc}) {
  //(name, email, pass)
  const navigate = useNavigate();
  const [name,SetName]=useState('');
  const [email,SetEmail]=useState('');
  const [pass,SetPass] =useState('');
  
  const RegisterButton = ()=>{

     // Validate email, password, and name
      // if (!isValidEmail(email)) {
      //   alert("Please enter a valid email address.");
      //   return;
      // }
      
      // if (!isValidPassword(pass)) {
      //   alert("Password should be at least 8 characters long and contain at least one uppercase letter and one digit.");
      //   return;
      // }
      
      // if (!isValidName(name)) {
      //   alert("Name should have at least 3 characters.");
      //   return;
      // }

    if(RegisterFunc(name,email,pass)){
      
        alert("registration successfuly ");
        navigate(`/`);
    }else{
      alert("registration failed");
      return;
    }
  }


  //----------
  const isValidEmail = (email) => {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Password should be at least 8 characters, contain at least one uppercase letter, and at least one digit
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };
  

  const isValidName = (name) => {
    // Name should have at least 3 characters
    return name.length >= 3;
  };
  


  

  return (
    <div className="register-container">
   <input
        type="text"
        className="register-input"
        placeholder="Email"
        value={email}
        onChange={(e) => SetEmail(e.target.value)}
      /> <br />
      <input
        type="text"
        className="register-input"
        placeholder="Name"
        value={name}
        onChange={(e) => SetName(e.target.value)}
      /> <br />
      <input
        type="password"
        className="register-input"
        placeholder="Password"
        value={pass}
        onChange={(e) => SetPass(e.target.value)}
      />
      <button className="register-button" onClick={RegisterButton}>Register</button>
    </div>
  )
}
