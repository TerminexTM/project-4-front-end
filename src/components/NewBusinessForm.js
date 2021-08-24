import React, { useState } from 'react'
import '../App.css'

const NewBusinessForm = (props) => {
    let emptyBusinessAuth = { name: '', password: '' }
    const [businessAuth, setBusinessAuth] = useState(emptyBusinessAuth)
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')

    const handleChange = (event) => {
        setBusinessAuth({ ...businessAuth, [event.target.name]: event.target.value })
    }

    const triggerCreateUser = (event) => {
        event.preventDefault()
        // let businessObj = {
        //     username: username,
        //     password: password
        // }
        props.handleCreateBusinessAuth(businessAuth)
    }

    return (
        <div>
            <h3>Create an Account</h3>
            <form onSubmit={triggerCreateUser} >
                <label htmlFor="name"></label>
                <input type='text' name="name" placeholder='Name' onChange={handleChange} />
                <label htmlFor="password"></label>
                <input type='password' name="password" placeholder='Password' onChange={handleChange} />
                <input type='submit' value='Register' className="headButton"  />
            </form>
        </div>
    )
}

export default NewBusinessForm;
