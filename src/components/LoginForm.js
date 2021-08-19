import React, { useState } from 'react'
import '../App.css'

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const triggerLogin = (event) => {
        event.preventDefault()
        let userObj = {
            username: username,
            password: password
        }
        props.handleLogin(userObj)
    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={triggerLogin} >
                <input type='text' placeholder='Username'  onChange={(event) => {setUsername(event.target.value)}} />
                <input type='password' placeholder='Password' class="textInput" onChange={(event) => {setPassword(event.target.value)}} />
                {props.toggleError ?
                    <h5 >{props.errorMessage}</h5>
                    :
                    null
                }
                <input type="submit" value='Login'  />
            </form>
        </div>
    )
}

export default LoginForm
