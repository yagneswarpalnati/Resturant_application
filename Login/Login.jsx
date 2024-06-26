import { Link } from "react-router-dom";
import './Registration.css';
import { useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserEmailContext from "../Store/UserEmailContext";

export default function Login(){
    const [email,setEmail]=useState(localStorage.getItem('userEmail')||'');
    const [password,setPassword]=useState();
    const [msg,setMsg]=useState('');
    const navigate=useNavigate();
    const {login}=useContext(UserEmailContext);

    useEffect(()=>{
      localStorage.setItem('userEmail',email);
    })

    function handleSubmit(event){
        event.preventDefault();
        axios.post('https://resturant-api-rust.vercel.app/login',{email,password})
        .then((result)=>
          {
            console.log(result)
            if(result.data.data==='Success'){
              setMsg('')
              login(result.data.userEmail)
              navigate('/Resturant')
            }else if (result.data==='Wrong password'){
              setMsg(`Password is Incorrect`);
            }else{
              setMsg('Not Registered, Please  Sign Up!');
            }
            
          })
        .catch(error => console.log(error));
      }
    return (
        <div className='container'>
        <div className="login-container" />
        <div className='form-container'>
          <h1>Login</h1>
          <form className='form-container' onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Enter Email'  onChange={(e)=>setEmail(e.target.value)}required/>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' placeholder='Enter Password'  onChange={(e)=>setPassword(e.target.value)}required/>
            <button type='submit'>Login</button>
            {msg!='' &&<p style={{fontSize:'20px'}}>{msg}</p>}
          </form>
          <p>Not Yet Registered !!!</p>
          <Link to='/home/registration'><button>Sign Up</button></Link>
        </div>
    </div>
    );
}
