import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Add from './components/Add'
import Edit from './components/Edit'
import NewBusinessForm from './components/NewBusinessForm'
import LoginForm from './components/LoginForm'

const App = () => {
    let [products, setProducts] = useState([])
    let [businesses, setBusinesses] = useState([])

    const [toggleLogin, setToggleLogin] = useState(true)
    const [toggleError, setToggleError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [toggleLogout, setToggleLogout] = useState(false)
    const [currentBusiness, setCurrentBusiness] = useState({})
    const [filter, setFilter] = useState('all')

    const handleCreate = (addProduct) => {
        axios
            .post('https://project-four-backend.herokuapp.com/api/products', addProduct)
            .then((response) => {
                console.log(response)
                getProducts()
            })
    }

    const handleUpdate = (editProduct) => {
        axios
            .put('https://project-four-backend.herokuapp.com/api/products/' + editProduct.id, editProduct)
            .then((response) => {
                getProducts()
            })

    }

    const handleDelete = (event) => {
        axios
            .delete('https://project-four-backend.herokuapp.com/api/products/' + event.target.value)
            .then((response) => {
                getProducts()
            })
    }

    // create new business
    const handleCreateBusiness = (businessObj) => {
        axios
            .post('http://localhost:8000/api/#', businessObj)
            .then((response) => {
                if(response.data.username) {
                    // console.log(response)
                    setToggleError(false)
                    setErrorMessage('')
                    setCurrentBusiness(response.data)
                    handleToggleLogout()
                } else {
                    setErrorMessage(response.data)
                    setToggleError(true)
                }
            })
    }

    const handleLogin = (userObj) => {
        axios
            .put('http://localhost:8000/login', userObj)
            .then((response) => {
                if (response.data.username) {
                    setToggleError(false)
                    setErrorMessage('')
                    setCurrentBusiness(response.data)
                    handleToggleLogout()
                } else {
                    setToggleError(true)
                    setErrorMessage(response.data)
                }
            })
    }

    const handleLogout = () => {
        setCurrentBusiness({})
        handleToggleLogout()
    }

    const handleToggleForm = () => {
        setToggleError(false)
        if (toggleLogin === true) {
            setToggleLogin(false)
        } else {
            setToggleLogin(true)
        }
    }

    const handleToggleLogout = () => {
        if (toggleLogout) {
            setToggleLogout(false)
        } else {
            setToggleLogout(true)
        }
    }

    const getProducts = () => {
        axios
            .get('https://project-four-backend.herokuapp.com/api/products')
            .then(
                (response) => setProducts(response.data),
                (error) => console.error(error)
            )
            .catch((error) => console.error(error))
    }

    const getBusiness = (addBusiness) => {
      axios
         .get('https://project-four-backend.herokuapp.com/api/companies')
         .then(
            (response) => setBusinesses(response.data),
            (error) => console.error(error)
         )
         .catch((error) => console.error(error))
   }


    useEffect(() => {
        getProducts()
        getBusiness()
    }, [])

    return (
        <>
            <h1>Businesses & Products</h1>
            <div>
                {toggleLogout ?
                    <button onClick={handleLogout} >Logout</button> :
                    <div >
                        {toggleLogin ?
                            <LoginForm handleLogin={handleLogin} toggleError={toggleError} errorMessage={errorMessage} />
                            :
                            <NewBusinessForm handleCreateBusiness={handleCreateBusiness} toggleError={toggleError} errorMessage={errorMessage} />
                        }
                        <button onClick={handleToggleForm} >
                            {toggleLogin ? 'Need an account?' : 'Already have an account?'}
                        </button>
                    </div>
                }

                {currentBusiness.username ?
                    <div >
                        <h3>{currentBusiness.name}</h3>
                    </div>
                    :
                    null
                }
            </div>
            <br/>
            <br/>
            <Add handleCreate={handleCreate} />
            <fieldset className="filter">
               <legend>Filter: </legend>
               <select onChange={(e)=>{setFilter(e.target.value)}}>
                  <option value="all">all</option>
                  {businesses.map( (business)=> {
                     return (
                        <option value={business.name}>{business.name}</option>
                     )
                  })}
               </select>
            </fieldset>

            <div className="products">
                {(filter===filter) && products.filter(products => products.business_name.includes(filter)).map((product) => {
                    return (
                        <div className="product" key={product.id}>
                            <img src={product.image} />
                            <h4>Name: {product.name}</h4>
                            <h5>Description: {product.description}</h5>
                            <h5>Price: {product.price}</h5>
                            <Edit handleUpdate={handleUpdate} product={product} />
                            <button onClick={handleDelete} value={product.id}>
                                Delete
                            </button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default App
