import React,{useState,useEffect} from 'react'
import './admin.css'
import Dashboard from './dashboard/dashboard'
import Users from './users/users'
import {url} from '../../config'


function Admin() {
  return (
    <>
 
    <div className='admin-container'>
     <Dashboard/>
    <Users/> 
    </div>
    

    </>
  )
}

export default Admin