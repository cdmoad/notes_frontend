import React, {useEffect, useState } from 'react'
import './login.css'
import axios from 'axios';
import $ from 'jquery';
import {Link,useNavigate} from 'react-router-dom';
import {FaHome} from "react-icons/fa";
import {FaEnvelope} from "react-icons/fa";
import {FaUserAlt} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";
import {RiLockPasswordLine} from "react-icons/ri";
import ReCAPTCHA from "react-google-recaptcha";
import {url} from '../../config'
  

function Login(){
const navigate = useNavigate();

const [error,seterror]=useState(<br/>);
const [verified,setVerified]=useState(false);

    const handleSubmit=(event)=>{
        event.preventDefault();
 
var email=event.target.email.value;
var password=event.target.password.value;
 

 
const sendData = async () => {
    
    axios.post(`${url}/user/login`,{email:email,password:password}).then((res)=>{

   if(res.data.log === 'logged'){
  
    sessionStorage.setItem('email',email)
    sessionStorage.setItem('username',res.data.username)
 
    navigate(-1);
 
   }else{
    seterror('Password or email is not correct')
   }

        }) 
    
 
    }
    sendData();

    }
    
    



    return(
        <>
        <Link to="/"> <div className='pin'><p><FaHome  size="35px"   style={{verticalAlign:"middle",marginRight:"10px"}}/></p></div>  </Link>   
        
        <div className='logincontainer'>
        

            <div className='loginformbox'>
<h1 className='loginheader'>Login</h1>

<form className='loginform' onSubmit={handleSubmit}>
   
 

 
<div>
<FaEnvelope size="25px" color="black" style={{marginRight:"15px",verticalAlign:"middle"}}/><input type='email' name='email' placeholder='Email' />
</div>

<div>
<RiLockPasswordFill size="25px" color="black" style={{marginRight:"15px",verticalAlign:"middle"}}/><input type='password' name='password' placeholder='Password'/>
</div>

<ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={()=>{setVerified(true)}}
              />

 
<div>
<button disabled={!verified}>Submit</button>
</div>

<p className='relerror'>{error}</p>
 
<p><Link to='/signup'><b><u>Sing up</u></b></Link> if you don't have an account</p>
 

</form>
</div>
        </div>
        
        
        
        
        
        </>
    )
}

export default Login;