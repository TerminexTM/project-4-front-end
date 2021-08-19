import React, { useState } from 'react'

const Edit = (props) => {
    // let emptyProduct = { name: '', image: '', description: '', price: 0, category: '' }
    const [product, setProduct] = useState({...props.product})

    const handleChange = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleUpdate(product)
    }

    return (
        <>
            <details>
                <summary>Edit Product</summary>
                <form onSubmit={handleSubmit} >
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" onChange={handleChange} />
                    <br/>
                    <label htmlFor="image"> Image: </label>
                    <input type="text" name="image" onChange={handleChange} />
                    <br/>
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" onChange={handleChange} />
                    <br/>
                    <label htmlFor="price">Price: </label>
                    <input type="number" name="price" onChange={handleChange} />
                    <br/>
                    <label htmlFor="category">Category: </label>
                    <input type="text" name="category" onChange={handleChange} />
                    <br/>
                    <input type="submit" />
                </form>
            </details>
        </>
    )
}

export default Edit
