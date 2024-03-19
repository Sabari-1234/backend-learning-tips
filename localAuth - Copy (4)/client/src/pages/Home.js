
import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate=useNavigate()
  useEffect(() => {
    const token=localStorage.getItem('token')
    axios.get('http://localhost/protected',{
      headers:{
        Authorization:token
      }
    }).then((res=>{
        console.log(res)
    })).catch(err=>{
     console.log(err)
      navigate('/')
    })
  }, [])
  const logout=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  
  return (
   <button onClick={logout}>logout</button>
  )
}

export default Home