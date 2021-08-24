import React, { useState } from 'react'
import '../App.css'

const NewUserForm = (props) => {
    let emptyUserAuth = { username: '', password: '' }
    const [userAuth, setUserAuth] = useState(emptyUserAuth)

    const handleChange = (event) => {
        setUserAuth({ ...userAuth, [event.target.name]: event.target.value })
    }

    const triggerCreateUser = (event) => {
        event.preventDefault()
        props.handleCreateUserAuth(userAuth)
    }

    return (
        <div>
            <h3>Create a Client Account</h3>
            <form onSubmit={triggerCreateUser} >
                <label htmlFor="username"></label>
                <input type='text' name="username" placeholder='Username' onChange={handleChange} />
                <label htmlFor="password"></label>
                <input type='password' name="password" placeholder='Password' onChange={handleChange} />
                <input type='submit' value='Register' className="headButton"  />
            </form>
        </div>
    )
}

export default NewUserForm;
