import React, { useState } from 'react'

const Edit = (props) => {
    let emptyProduct = { ...props.product }
    const [product, setProduct] = useState(emptyProduct)

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
                    <input type="text" name="name" value={product.name} onChange={handleChange} />
                    <br/>
                    <label htmlFor="image"> Image: </label>
                    <input type="text" name="image" value={product.image} onChange={handleChange} />
                    <br/>
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" value={product.description} onChange={handleChange} />
                    <br/>
                    <label htmlFor="price">Price: </label>
                    <input type="number" name="price" value={product.price} onChange={handleChange} />
                    <br/>
                    <label htmlFor="category">Category: </label>
                    <select name="category" value={product.category} onChange={handleChange}>
                        <option value="clothing">Clothing</option>
                        <option value="electronics">Electronics</option>
                    </select>
                    <br/>
                    <label htmlFor="business_name">Business Name: </label>
                    <input type="hidden" name="business_name" value={product.business_name} onChange={handleChange} />
                    <br/>
                    <label htmlFor="business_id">Business ID: </label>
                    <input type="hidden" name="business_id" value={product.business_id} onChange={handleChange} />
                    <br/>
                    <input type="submit" />
                </form>
            </details>
        </>
    )
}

export default Edit


// <label htmlFor="category">Category: </label>
// <input type="text" name="category" onChange={handleChange} />
