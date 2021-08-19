import React, { useState } from 'react'
import '../App.css'

const NewBusinessForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const triggerCreateUser = (event) => {
        event.preventDefault()
        let businessObj = {
            username: username,
            password: password
        }
        props.handleCreateBusiness(businessObj)
    }

    return (
        <div>
            <h3>Create an Account</h3>
            <form onSubmit={triggerCreateUser} >
                <input type='text' placeholder='Username' onChange={(event) => {setUsername(event.target.value)}} />
                <input type='password' placeholder='Password' onChange={(event) => {setPassword(event.target.value)}} />

                <input type='submit' value='Register'  />
            </form>
        </div>
    )
}

export default NewBusinessForm;
