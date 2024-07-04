import './Registration.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Registration(){
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [err,setErr]=useState(false);
  const navigate=useNavigate();

  function handleSubmit(event){
    event.preventDefault();
    axios.post('https://resturant-w4u6.onrender.com/register',{name,email,password})
    .then((result)=>
      {console.log(result)
        if(result.data.message!=='User created successfully'){
          setErr(true);
        }else{
          setErr(false);
          navigate('/home/login')
        }
        })
    .catch(error => console.log(error));
  }

  return (
    <div className='container'>
        <div className="registration-container" />
        <div className='form-container'>
          <h1>Registration</h1>
          {err && <p>User Email Already Registered,Please Login</p>}
          <form className='form-container' onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' placeholder='Enter Name'  onChange={(e)=>setName(e.target.value)} required/>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Enter Email'  onChange={(e)=>setEmail(e.target.value)}required/>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' placeholder='Enter Password'  onChange={(e)=>setPassword(e.target.value)}required/>
            <button type='submit'>Sign Up</button>
          </form>
          <p>Already Registered !!!</p>
          <Link to='/home/login'><button>Login</button></Link>
        </div>
    </div>
  );
}
