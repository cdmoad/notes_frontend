import React, {useEffect, useState } from 'react'
import './home.css'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import {Link} from 'react-router-dom';
import logo from '../../public/newproject.gif';
import {RiLogoutCircleRLine} from "react-icons/ri";
import {GrContactInfo} from "react-icons/gr";
import axios from 'axios'
import {url} from '../../config'


function Home(){


  const emailsess=sessionStorage.getItem('email')
  var [lang,setlang]=useState(sessionStorage.getItem('lang'))
  const [userdata,setuserdata]=useState([])
  
 // sessionStorage.setItem('userdata','')
  

 /*
  {emailsess &&  axios.post('http://localhost:5001/user/getuser',{email:emailsess}).then((res)=>{
sessionStorage.setItem('userdata',JSON.stringify(res.data))
 
  })}
  */


      
  async function handlechange(event){

  sessionStorage.setItem('lang',"ENG")

    sessionStorage.setItem('lang',event.target.value)
    setlang(event.target.value)
  }

  
 
 


  async function logout(){
    sessionStorage.removeItem('email');
    window.location.reload()
  }

return(
 <>
 <div className='homecontainer'>

  <div className='radiocon'>
  {lang==="ENG" ? <input type="radio" name="lang" value="ENG"   onChange={handlechange} defaultChecked/>:<input type="radio" name="lang" value="ENG"   onChange={handlechange} />}ENG
  {lang==="FR" ?  <input type="radio"name="lang" value="FR"  onChange={handlechange} defaultChecked/>:<input type="radio"name="lang" value="FR"  onChange={handlechange} />}FR

  </div>

 {/* <div className='sidestyle'></div> */}

  <h1 className='homeheader'>Note<y>S</y><img className='homelogo' src={logo} alt='logo'/><bl>M</bl>anager</h1>
 
<div className='hgrid'>


    <div className='hgrid-item'> <Link to="/makenote"> {lang==="ENG" ?<p> Make a note</p>:<p>Créer une note</p> } </Link>{/*<div className='newgif' />*/}</div>
     <div className='hgrid-item'><Link to="/seenote"> {lang==="ENG" ?<p>See your notes</p>:<p>Voir vos notes</p> } </Link>{/*<div className='newgif2' />*/}</div>
    {emailsess ? <div className='hgrid-item'><Link to="/profile">{lang==="ENG" ?<p>Profile</p>:<p>Profil</p> } </Link> {/*<div className='newgif3' />*/}</div> : <div className='hgrid-item'><Link to="/signup">{lang==="ENG" ?<p>Sign up</p>:<p>S'inscrire</p> } </Link> {/*<div className='newgif3' />*/}</div> } 
     {emailsess ? <div className='hgrid-item'><Link to="/contact">{lang==="ENG" ?<p>Contact us</p>:<p>Contacter nous</p> }</Link></div>  :  <div className='hgrid-item'><Link to="/login">{lang==="ENG" ?<p>Log in</p>:<p>Se connecter</p> }</Link>{/*} <div className='newgif3' />*/}</div>}
     
 
 
</div>



<div className='logoutcontainer'>
{emailsess &&  <button onClick={logout} className='homelogout'>  {lang==="ENG" ?<p>Log out</p>:<p>Se déconnecter </p> } <RiLogoutCircleRLine /> </button> }
</div>

</div>

</>
 
    
    
)


}
export default Home;
