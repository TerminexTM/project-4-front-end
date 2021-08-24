import React, { useState } from 'react'
import '../App.css'

const UserLoginForm = (props) => {
    let loginUser = { username: '', password: '' }
    const [currentUser, setCurrentUser] = useState(loginUser)

    const handleChange = (event) => {
        setCurrentUser({ ...currentUser, [event.target.name]: event.target.value })
    }

    const triggerUserLogin = (event) => {
        event.preventDefault()
        props.handleUserLogin(currentUser)
    }

    return (
        <div>
            <h3>Client Login</h3>
            <form onSubmit={triggerUserLogin} >
                <label htmlFor="username"></label>
                <input type='text' name="username" placeholder='Username' onChange={handleChange} />
                <label htmlFor="password"></label>
                <input type='password' name="password" placeholder='Password' onChange={handleChange} />
                <input type="submit" value='Login' className="headButton" />
            </form>
        </div>
    )
}

export default UserLoginForm;
