import React,{useState,useEffect} from "react";
import "./users.css";
import axios from 'axios'
import {url} from '../../../config'

 
function Users() {
 
  const [users,setUsers]=useState([])
  const [search,setSearch]=useState('')

useEffect(()=>{

axios.get(`${url}/user/getallusers`).then((result=>{
setUsers(result.data)
console.log(result.data)
  }))  

},[])

async function deleteUser(e){

  axios.delete(`${url}/user/deleteuser/${e.target.id}`).then((result)=>{
    setUsers(result.data)
  })

}
  




  return (
    <>

      <div className="users-container">
      <input type="search" onChange={(e)=>{setSearch(e.target.value)}}></input>
        <div class="container">
         
          <ul id="user-list">
           
           {users.filter((f)=>(
            f.username.toLowerCase().includes(search.toLowerCase())
           )).map((m)=>(
              <li key={m._id}>
      <span class="username">{m.username} || {m.email}</span>
      <button class="delete-button" id={m._id} onClick={deleteUser}>Delete</button>
             </li>
    
           ))}
  
  </ul>
        </div>
      </div>
    </>
  );
}

export default Users;
