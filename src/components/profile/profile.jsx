 
import React, {useEffect, useState } from 'react'
import axios from 'axios';
import './profile.css'
import profileimage from '../../public/profile.png';
import { BiPhoneOff } from 'react-icons/bi';
import {HiOutlineCamera} from "react-icons/hi"
import { base64ToArrayBuffer } from 'base64-js'
import defaultPfp from '../../public/profile.png'
import ClipLoader from "react-spinners/ClipLoader";
import {url} from '../../config'

function Profile() {

     
    const[img,setImg]=useState('')
    const[imgsrc,setImgsrc]=useState(defaultPfp)

    const [email,setEmail]=useState('')
    const [username,setUsername]=useState('')
    const [firstname,setFirstname]=useState('')
    const [lastname,setLastname]=useState('')
    const [phone,setPhone]=useState('')
    const [bd,setBd]=useState('')
    const [loading,setLoading]=useState(false)
 


    useEffect(()=>{

        setLoading(true) 

       axios.post(`${url}/user/getuser`,{email:sessionStorage.getItem('email')}).then((res)=>{
 
        setEmail(res.data[0].email)
        setUsername(res.data[0].username)
        setFirstname(res.data[0].firstname)
        setLastname(res.data[0].lastname)
        setPhone(res.data[0].phone)
        setBd(res.data[0].bd)

        
         
    })

    getPfp()

     

     },[])

    function handleImageChange(e){
       setImg(e.target.files[0])
       setImgsrc(URL.createObjectURL(e.target.files[0]))    
    }
     

     async function getPfp(){

        

        await axios.post(`${url}/user/getuserpfp`,{email:sessionStorage.getItem('email')},{responseType: 'arraybuffer'}).then((res)=>{
        
            let base64 = btoa(
                new Uint8Array(res.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  '',
                ),
              );
              let srcc = `data:image/jpeg;base64,${base64}`;
              setImgsrc(srcc)
              console.log(srcc);
              setLoading(false)
            })

        
     }
    
  
    
   

async function edit(e){

    e.preventDefault()

     
     const formData = new FormData();
     console.log(img);
     formData.append('file', img);
     formData.append('email', email);
     formData.append('firstname',e.target.firstname.value);
     formData.append('lastname',  e.target.lastname.value);
     formData.append('phone', e.target.phone.value);
     formData.append('bd', e.target.bd.value);
  
     
    
    axios.post(`${url}/user/editprofile`, formData)
    .then((res)=>{
        sessionStorage.setItem('username',JSON.stringify(res.data.username))
         
        // console.log(userdata[0]['pfp']);
       getPfp()
    })

}


  return (
     <>
    <div className='profile_container'>

        {loading ? <ClipLoader

        color="#aa00ff"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> : 

<form onSubmit={edit} enctype="multipart/form-data"> 

 

    <div className='profile_image'>


<label for='profileimage' className='profileimage'>
     <img  src={imgsrc}  width='120' height='120' alt='' style={{borderRadius:'50%'}}/>
<input type='file' id="profileimage" name='pfp' onChange={handleImageChange} ></input> 
 <div className='camImg'><HiOutlineCamera  size="40px" color='white' style={{verticalAlign:"middle"}}  /></div>
 </label>

<h2>{ username ? username : 'undefined' }</h2>

    </div>


    <div className='profile_info'>
        
        
        <div>
        <b for='email'>Email:</b>
        <input type='email' id='email' value={ email ? email : 'undefined'}/>
        </div>

        <div>
        <b for='email'>Username:</b>
        <input type='text' id='username'value={ username } />
        </div>

        <div>
        <b for='email'>First name:</b>
        <input type='text' id='firstname' name='firstname' defaultValue={ firstname }/>
        </div>

        <div>
        <b for='email'>Last name:</b>
        <input type='text' id='lastname'  name='lastname' defaultValue={ lastname } />
        </div>

        <div>
        <b for='email'>Phone number:</b>
        <input type='text' id='phonenumber'  name='phone' defaultValue={ phone  }/>
        </div>

        <div>
        <b  for='gender'>Birth day:</b>
        <input type='date' id='birthday' name='bd' defaultValue={ bd }/>
        </div>

<button type='submit' className='profile_editbutton'>Edit</button>

     

    </div>



 </form> 

}
    </div>
     
     </>
  )
}

export default Profile