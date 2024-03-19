import React from 'react'
import { Link } from 'react-router-dom'

function LogIn() {
  return (
    <div>
        <form action="http://localhost/register" method='post'>
            <input type="text" name='name' />
            <input type="password" name='password'/>
            <input type="submit" value={'submit'} />
            <Link to={'/login'}>login</Link>
        </form>
    </div>
  )
}

export default LogIn