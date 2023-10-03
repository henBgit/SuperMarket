import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login({LoginFunc}) {

    //(Email,Pass)
    const navigate = useNavigate();
    const [email,SetEmail] = useState('');
    const [pass,SetPass] = useState('');
    
    const LoginButton =()=>{
        const resultUser = LoginFunc(email,pass);
        if(resultUser){
            
            alert(`Hello ${resultUser.name}`);
            navigate(`/${resultUser.name}`);
        }else{
            alert("User Carditianals are Wrong ! ");
            return;
        }
    }
  return (
    <div className="login-container">
         <input
        type="text"
        className="login-input"
        placeholder="Email"
        value={email}
        onChange={(e) => SetEmail(e.target.value)}
      /> <br />
      <input
        type="password"
        className="login-input"
        placeholder="Password"
        value={pass}
        onChange={(e) => SetPass(e.target.value)}
      />
      <button className="login-button" onClick={LoginButton}>Login</button>
      <p className="register-link">Not Registered Yet? <Link to='/register'>Register here</Link></p>
    </div>
  )
}
