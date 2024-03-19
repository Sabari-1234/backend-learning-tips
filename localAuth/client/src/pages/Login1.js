import React from 'react'

function Login1() {
  return (
    <div><form action="http://localhost/login" method='post'>
    <input type="text" name='username' />
    <input type="password" name='password'/>
    <input type="submit" value={'submit'} />
</form></div>
  )
}

export default Login1