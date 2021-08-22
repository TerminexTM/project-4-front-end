import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Add from './components/Add'
import Edit from './components/Edit'
import NewBusinessForm from './components/NewBusinessForm'
import LoginForm from './components/LoginForm'
import NewUserForm from './components/NewUserForm'
import UserLoginForm from './components/UserLoginForm'

const App = () => {
    let [products, setProducts] = useState([])
    let [businesses, setBusinesses] = useState([])

    // Error Messages
    const [toggleError, setToggleError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // Business Login & Logout States
    const [toggleLogin, setToggleLogin] = useState(true)
    const [toggleLogout, setToggleLogout] = useState(false)
    const [currentBusiness, setCurrentBusiness] = useState({})
    const [filter, setFilter] = useState('all')

    // User Login & Logout States
    const [toggleUserLogin, setToggleUserLogin] = useState(true)
    const [toggleUserLogout, setToggleUserLogout] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    let businessKey = {...currentBusiness}
    console.log(businessKey);

    // ============== Products Handles ============== //
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

    // ============== Business Registration Handles ============== //
    const handleCreateBusinessAuth = (businessObj) => {
        axios
            .post('https://project-four-backend.herokuapp.com/api/companies', businessObj)
            .then((response) => {
                if(response.data.name) {
                    // console.log(response)
                    setToggleError(false)
                    setErrorMessage('')
                    setCurrentBusiness(response.data)
                    handleToggleLogout()
                    getBusiness()
                } else {
                    setErrorMessage(response.data)
                    setToggleError(true)
                }
            })
    }

// ============== User Registration Handles ============== //
    const handleCreateUserAuth = (userObj) => {
        axios
            .post('https://project-four-backend.herokuapp.com/api/users', userObj)
            .then((response) => {
                if(response.data.name) {
                    setToggleError(false)
                    setErrorMessage('')
                    setCurrentUser(response.data)
                    handleToggleUserLogout()
                } else {
                    setErrorMessage(response.data)
                    setToggleError(true)
                }
            })
    }

// ============== Business Login and Logout Handles ============== //
    const handleLogin = (userObj) => {
        axios
            .put('https://project-four-backend.herokuapp.com/api/companies/login', userObj)
            .then((response) => {
                if (response.data.name) {
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

    // ============== User Login and Logout Handles ============== //
    const handleUserLogin = (userObj) => {
        axios
            .put('https://project-four-backend.herokuapp.com/api/users', userObj)
            .then((response) => {
                if (response.data.name) {
                    setToggleError(false)
                    setErrorMessage('')
                    setCurrentUser(response.data)
                    handleToggleUserLogout()
                } else {
                    setToggleError(true)
                    setErrorMessage(response.data)
                }
            })
    }

    const handleUserLogout = () => {
        setCurrentUser({})
        handleToggleUserLogout()
    }

    const handleToggleUserForm = () => {
        setToggleError(false)
        if (toggleUserLogin === true) {
            setToggleUserLogin(false)
        } else {
            setToggleUserLogin(true)
        }
    }

    const handleToggleUserLogout = () => {
        if (toggleUserLogout) {
            setToggleUserLogout(false)
        } else {
            setToggleUserLogout(true)
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
            <h1>E-commerce Store</h1>
            <div>
                {toggleLogout ?
                    <button onClick={handleLogout} >Logout</button> :
                    <div >
                        {toggleLogin ?
                            <LoginForm handleLogin={handleLogin} toggleError={toggleError} errorMessage={errorMessage} />
                            :
                            <NewBusinessForm
                             handleCreateBusinessAuth={handleCreateBusinessAuth} toggleError={toggleError} errorMessage={errorMessage} />
                        }
                        <button onClick={handleToggleForm} >
                            {toggleLogin ? 'Need an account?' : 'Already have an account?'}
                        </button>
                    </div>
                }
                {currentBusiness.name ?
                    <div >
                        <h3>{currentBusiness.name}</h3>
                    </div>
                    :
                    null
                }
            </div>
            <div>
                {toggleUserLogout ?
                    <button onClick={handleUserLogout} >Logout</button> :
                    <div >
                        {toggleUserLogin ?
                            <UserLoginForm handleUserLogin={handleUserLogin} toggleError={toggleError} errorMessage={errorMessage} />
                            :
                            <NewUserForm handleCreateUserAuth={handleCreateUserAuth} toggleError={toggleError} errorMessage={errorMessage} />
                        }
                        <button onClick={handleToggleUserForm} >
                            {toggleUserLogin ? 'Need an account?' : 'Already have an account?'}
                        </button>
                    </div>
                }
                {currentUser.username ?
                    <div >
                        <h3>{currentUser.username}</h3>
                    </div>
                    :
                    null
                }
            </div>
            <br/>
            <br/>

            <Add handleCreate={handleCreate} businessKey={businessKey} />
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
                {(filter===filter && filter!=="all") && products.filter(products => products.business_name.includes(filter)).map((product) => {
                    return (
                        <div className="product" key={product.id}>
                            <img src={product.image} />
                            <h4>Name: {product.name}</h4>
                            <h5>Description: {product.description}</h5>
                            <h5>Category: {product.category}</h5>
                            <h5>Business: {product.business_name}</h5>
                            <h5>Business ID: {product.business_id}</h5>
                            <h5>Price: {product.price}</h5>
                            <Edit handleUpdate={handleUpdate} />
                            {(currentBusiness.id === product.business_id) &&
                                <button onClick={handleDelete} value={product.id}>
                                    Delete
                                </button>

                            }

                        </div>
                    )
                })}
                {(filter==="all") && products.map( (product) => {
                   return (
                       <div className="product" key={product.id}>
                           <img src={product.image} />
                           <h4>Name: {product.name}</h4>
                           <h5>Description: {product.description}</h5>
                           <h5>Category: {product.category}</h5>
                           <h5>Business: {product.business_name}</h5>
                           <h5>Business ID: {product.business_id}</h5>
                           <h5>Price: {product.price}</h5>
                           <Edit handleUpdate={handleUpdate} />
                           {(currentBusiness.id === product.business_id) &&
                              <button onClick={handleDelete} value={product.id}>
                                  Delete
                              </button>

                           }

                       </div>
                   )

                })}
            </div>
        </>
    )
}

export default App
