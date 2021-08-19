import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

import Add from './components/Add'
import Edit from './components/Edit'
// import NewBusinessForm from './components/NewBusinessForm'

const App = () => {
    let [products, setProducts] = useState([])
    // let [businesses, setBusinesses] = useState([])
    //
    // const [toggleLogin, setToggleLogin] = useState(true)
    // const [toggleError, setToggleError] = useState(false)
    // const [errorMessage, setErrorMessage] = useState('')
    // const [toggleLogout, setToggleLogout] = useState(false)
    // const [currentBusiness, setCurrentBusiness] = useState({})

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
    // const handleCreateBusiness = (userObj) => {
    //     axios
    //         .post('http://localhost:8000/api/#', userObj)
    //         .then((response) => {
    //             if(response.data.username) {
    //                 // console.log(response)
    //                 setToggleError(false)
    //                 setErrorMessage('')
    //                 setCurrentBusiness(response.data)
    //                 handleToggleLogout()
    //             } else {
    //                 setErrorMessage(response.data)
    //                 setToggleError(true)
    //             }
    //         })
    //
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

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <h1>Businesses & Products</h1>

            <Add handleCreate={handleCreate} />
            <div className="products">
                {products.map((product) => {
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
