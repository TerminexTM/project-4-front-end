import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

import Add from './components/Add'
import Edit from './components/Edit'

const App = () => {
    let [products, setProducts] = useState([])
    let [businesses, setBusinesses] = useState([])

    const handleCreate = (addProduct) => {
        axios
            .post('http://localhost:8000/api/#', addProduct)
            .then((response) => {
                console.log(response)
                getProducts()
            })
    }

    const handleUpdate = (editProduct) => {
        axios
            .put('http://localhost:8000/api/#' + editProduct.id, editProduct)
            .then((response) => {
                getProducts()
            })

    }

    const handleDelete = (event) => {
        axios
            .delete('http://localhost:8000/api/#' + event.target.value)
            .then((response) => {
                getProducts()
            })
    }

    const getProducts = () => {
        axios
            .get('http://localhost:8000/api/#')
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
