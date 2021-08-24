import React, { useState, useEffect } from 'react'
import {Modal} from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import axios from 'axios'
import './App.css'
import Add from './components/Add'
import Edit from './components/Edit'
import NewBusinessForm from './components/NewBusinessForm'
import LoginForm from './components/LoginForm'
import NewUserForm from './components/NewUserForm'
import UserLoginForm from './components/UserLoginForm'

const App = () => {
   //Atlas for products and businesses
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
    const [users, setUsers] = useState([])
    const [toggleUserLogin, setToggleUserLogin] = useState(true)
    const [toggleUserLogout, setToggleUserLogout] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    //open and close the New Product Modal
    const [openProductModal, setOpenProductModal] = useState(false)
    const [productModal, setProductModal] = useState(false)
    //Modal event handlers
    const openProductManager = () => {setOpenProductModal(true)}
    const closeProductManager = () => {setOpenProductModal(false)}
    const openProduct = (id) => {setProductModal(id)}
    const closeProduct = () => {setProductModal(false)}

    let emptyCart = { name: '', image: '', description: '', price: 0, category: 'clothing', business_name: '', business_id: '' }
    // shopping cart
    const [shoppingCart, setShoppingCart] = useState([])
    const [openShoppingCartModal, setOpenShoppingCartModal] = useState(false)
    const [shoppingCartModal, setShoppingCartModal] = useState(false)
    // Shopping Cart event handlers
    const openShoppingCart = () => {setOpenShoppingCartModal(true)}
    const closeShoppingCart = () => {setOpenShoppingCartModal(false)}



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
                    getUser()
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
                    getBusiness()
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
            .put('https://project-four-backend.herokuapp.com/api/users/login', userObj)
            .then((response) => {
                if (response.data.username) {
                    setToggleError(false)
                    setErrorMessage('')
                    setCurrentUser(response.data)
                    handleToggleUserLogout()
                    getUser()
                } else {
                    setToggleError(true)
                    setErrorMessage(response.data)
                }
            })
    }

    const handleUserLogout = () => {
        setCurrentUser({})
        setShoppingCart([])
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

    const addShoppingCart = (productObj) => {
        setShoppingCart([ ...shoppingCart, productObj.data])

    }
    console.log(shoppingCart);

    // const removeProduct = (event) => {
    //     const deleteItem = shoppingCart.filter(shoppingCart) => event.target.value !== event.target.value;
    // }

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

   const getUser = (addUser) => {
       axios
        .get('https://project-four-backend.herokuapp.com/api/users')
        .then(
            (response) => setUsers(response.data),
            (error) => console.error(error)
        )
        .catch((error) => console.error(error))
   }

    useEffect(() => {
        getProducts()
        getBusiness()
        getUser()
    }, [])


    return (
        <>
        <div className="headContainer">
            <h1>Ecom:<h4>A Shop App</h4></h1>
            <div className="loggedIn">
               {currentBusiness.name ?
                  <div >
                       <h3>{currentBusiness.name}</h3>
                  </div>
                  :
                  null
               }
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
            </div>
            <div className="loggedIn">
               {currentUser.username ?
                  <div >
                       <h3>{currentUser.username}</h3>
                  </div>
                  :
                  null
               }
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
            </div>
         </div>
            <br/>
            <br/>
            <button onClick={openShoppingCart}>Shopping Cart</button>
            <Modal open={openShoppingCartModal} onClose={closeShoppingCart}>
                <h4>Shopping Cart</h4>
                {shoppingCart.map((cartProduct) => {
                    return (
                        <div className="cartProduct" id={shoppingCart.indexOf(cartProduct)} >
                            <img src={cartProduct.image} />
                            <h5>{cartProduct.name}</h5>
                            <h5>{cartProduct.price}</h5>
                            {console.log(shoppingCart.indexOf(cartProduct))}
                        </div>
                    )
                })}
            </Modal>
            <br/>
            <br/>
            <button onClick={openProductManager}>Add Product</button>
            <Modal open={openProductModal} onClose={closeProductManager}>
               <Add handleCreate={handleCreate} businessKey={businessKey} />
            </Modal>
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
                            <img src={product.image} onError={(e)=>{e.target.onerror = null; e.target.src="https://i.imgur.com/63ojVXq.jpeg"}} />
                            <h4>Name: {product.name}</h4>
                            <h5>Description: {product.description}</h5>
                            <h5>Category: {product.category}</h5>
                            <h5>Business: {product.business_name}</h5>
                            <h5>Business ID: {product.business_id}</h5>
                            <h5>Price: {product.price}</h5>
                            {currentUser.username &&
                            <button onClick={(e)=>setShoppingCart([...shoppingCart, product])}>Add to Cart</button>
                           }
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
                       <div
                       className="product"
                       key={product.id}
                       id={product.id}
                       >
                       {currentUser.username &&
                       <button onClick={(e)=>setShoppingCart([...shoppingCart, product])}>Add to Cart</button>
                       }
                       {console.log(product)}
                       <div
                       className="modalButton"
                       onClick={(e)=>setProductModal(product.id)}>
                           <img src={product.image} onError={(e)=>{e.target.onerror = null; e.target.src="https://i.imgur.com/63ojVXq.jpeg"}} />
                           <h4>Name: {product.name}</h4>
                           <h5>Price: ${product.price}</h5>
                        </div>
                        <Modal open={productModal===product.id} onClose={(e)=>setProductModal(false)}>
                           <div className='product Modal'>
                              <img src={product.image} />
                              <h4>Name: {product.name}</h4>
                              <h5>Description: {product.description}</h5>
                              <h5>Category: {product.category}</h5>
                              <h5>Business: {product.business_name}</h5>
                              <h5>Business ID: {product.business_id}</h5>
                              <h5>Price: ${product.price}</h5>
                              <h4>Name: {product.name}</h4>
                              {currentUser.username &&
                                 <button onClick={(e)=>setShoppingCart([...shoppingCart, product])}>Add to Cart</button>
                              }
                              {(currentBusiness.id===product.business_id) &&
                              <div>
                              <button onClick={handleDelete} value={product.id}>
                                  Delete
                              </button>
                              <Edit handleUpdate={handleUpdate}/>
                              </div>
                              }
                           </div>

                        </Modal>

                       </div>
                   )
                })}

            </div>
        </>
    )
}

export default App
