import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useNavigation } from 'react-router-dom';

function Login1() {
  const [name, setname] = useState()
  const [password, setpassword] = useState()
  const navigate=useNavigate()

  useEffect(() => {
    const token=localStorage.getItem('token')
    axios.get('http://localhost/protected',{
      headers:{
        Authorization:token
      }
    }).then((res=>{
       navigate('/home')
    })).catch(err=>{
     console.log(err)
      
    })
  }, [])
  const login=()=>{
      axios.post('http://localhost/login',{
        name:name,
        password:password
      }).then(user=>{
        console.log(user)
        localStorage.setItem('token',user.data)
        navigate('/home')
      }).catch(err=>console.log(err))
  }
  return (
    <div>
    <input type="text" name='username' value={name} onChange={e=>setname(e.target.value)} />
    <input type="password" name='password' value={password} onChange={e=>setpassword(e.target.value)}/>
    <button onClick={login}>submit</button>
</div>
  )
}

export default Login1