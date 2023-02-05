import React, {useEffect, useState } from 'react'
import './signup.css'
import axios from 'axios';
import $ from 'jquery';
import {Link,useNavigate} from 'react-router-dom';
import {FaEnvelope} from "react-icons/fa";
import {FaUserAlt} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";
import {RiLockPasswordLine} from "react-icons/ri";
import {FaHome} from "react-icons/fa";
import {FaSms} from "react-icons/fa";
import {SiMinutemailer} from "react-icons/si";
import {url} from '../../config'



function Signup(){
const navigate=useNavigate()

const [error,seterror]=useState(<br/>)
const [emails,setemails]=useState()
const [log,setlog]=useState(false)
const [number,setnumber]=useState()
const [username,setusername]=useState()
const [password,setpassword]=useState()
const [emailsent,setemailsent]=useState(<br/>)
const [attempt,setAttempt]=useState(0)

 

    const handleSubmit=(event)=>{
        event.preventDefault();
var iusername=event.target.username.value;
var iemail=event.target.email.value;
var ipassword=event.target.password.value;
var cpassword=event.target.cpassword.value;

if(cpassword===ipassword){
const sendData = async () => {
    
    seterror(<br/>)

    axios.post('http://localhost:5001/user/signup',{email:iemail}).then((res)=>{
 
    if(res.data==='signed'){
      setemails(iemail)
      setlog(true)
      setusername(iusername)
      setpassword(ipassword)
 

      /* sending the random number to the user's email */
      axios.post('http://localhost:5001/user/verify',{email:iemail}).then((res)=>{
        setAttempt(0)
        setemailsent('Verification number is sent !')
     setnumber(res.data.number)
    })
        
    }
    if(res.data=="exist"){
        seterror('Email already used')
    } 
    

        }) 
    
 
    }
    sendData();
 
}else{
    seterror('Password is not confimred correctly')
}

    }


    async function verify(e){

        e.preventDefault()

 
      
    if( number==e.target.verify.value && attempt<6)
    {
        if(log==true){
            axios.post('http://localhost:5001/user/register',{email:emails,password:password,username:username}).then((res)=>{
                if(res.data=='registered'){ sessionStorage.setItem('email',emails)
                
        navigate("/");}
        else{
            console.log('not registered')
        }
            })
   
           }else{
           console.log('other inputs are not correct')
        }
       }else{
        setAttempt((v)=>v+1)
        // to inform that the verification number was not entered correctly
        setemailsent('Wrong verification number')
console.log('wrong number')
       } 

         
       

    }
    
    



    return(
        <>
        
        <Link to="/"> <div className='pin'><p><FaHome  size="35px"   style={{verticalAlign:"middle",marginRight:"10px"}}/></p></div>  </Link>   

        <div className='signupcontainer'>

            <div className='formbox'>
<h1 className='signupheader'>Signup</h1>

<form className='signupform' onSubmit={handleSubmit}>
   
 
 <div>
 <FaUserAlt size="25px" color="black" style={{marginRight:"15px",verticalAlign:"middle"}}/><input type='text' name='username' placeholder='Username' />
</div>
 
 
<div>
<FaEnvelope size="25px" color="black" style={{marginRight:"15px",verticalAlign:"middle"}}/><input type='email' name='email' placeholder='Email' />
</div>
 
<div>
<RiLockPasswordFill size="25px" color="black" style={{marginRight:"15px",verticalAlign:"middle"}}/><input type='password' name='password' placeholder='Password' minLength={6}/>
</div>

<div>
<RiLockPasswordLine size="25px" color="black" style={{marginRight:"15px",verticalAlign:"middle"}}/><input type='password'  name='cpassword' placeholder='Confirm password' minLength={6}/>
</div>

<div>
<button>Submit</button>
</div>
<p className='relerror'>{error}</p>
</form>
 
<form className='verify_form' onSubmit={verify}>
<SiMinutemailer size="25px" color="black" style={{marginRight:"15px",verticalAlign:"middle"}}/><input type="text" className='verifyinput' name='verify'  placeholder='XXXXXX' /><button>Verify</button>
</form>
<p className='emailsent'>{emailsent}</p>
 
<p className='ifAlrSignup'><Link to='/login'><b><u>Login</u></b></Link> if you already signed up</p>
 


</div>
        </div>
        
        
        
        
        
        </>
    )
}

export default Signup;