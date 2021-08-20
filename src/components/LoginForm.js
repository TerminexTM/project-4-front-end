import React, { useState } from 'react'
import '../App.css'

const LoginForm = (props) => {
    let loginUser = { name: '', password: '' }
    const [currentUser, setCurrentUser] = useState(loginUser)
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')

    const handleChange = (event) => {
        setCurrentUser({ ...currentUser, [event.target.name]: event.target.value })
    }

    const triggerLogin = (event) => {
        event.preventDefault()
        // let userObj = {
        //     username: username,
        //     password: password
        // }
        props.handleLogin(currentUser)
    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={triggerLogin} >
                <label htmlFor="name"></label>
                <input type='text'  name="name" placeholder='Username'  onChange={handleChange} />
                <label htmlFor="password"></label>
                <input type='password' name="password" placeholder='Password' onChange={handleChange} />
                <input type="submit" value='Login'  />
            </form>
        </div>
    )
}

export default LoginForm
