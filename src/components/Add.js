import React, { useState } from 'react'
import './style.css'
const Add = (props) => {

    let emptyProduct = { name: '', image: '', description: '', price: 0, category: 'clothing', business_name: props.businessKey.name, business_id: props.businessKey.id }
    const [product, setProduct] = useState(emptyProduct)

    const handleChange = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreate(product)
        event.currentTarget.reset()
        setProduct(emptyProduct)
    }

    return (
        <>
            <form class='container' onSubmit={handleSubmit} >
                <label htmlFor="name">Name: </label>
                <input class='box' type="text" name="name" onChange={handleChange} />
                <br/>
                <label htmlFor="image"> Image: </label>
                <input class='box' type="text" name="image" onChange={handleChange} />
                <br/>
                <label htmlFor="description">Description: </label>
                <input class='box' type="text" name="description" onChange={handleChange} />
                <br/>
                <label htmlFor="price">Price: </label>
                <input class='box' type="number" name="price" onChange={handleChange} />
                <br/>
                <label htmlFor="category">Category: </label>
                <select class='box' name="category" onChange={handleChange}>
                    <option value="clothing">Clothing</option>
                    <option value="electronics">Electronics</option>
                    <option value="pets">Pets</option>
                </select>
                <br/>
                <label htmlFor="business_name">Business Name: </label>
                <input class='box' type="hidden" value={props.businessKey.name} name="business_name" onChange={handleChange} />
                <br/>
                <label htmlFor="business_id">Business ID: </label>
                <input class='box' type="hidden" value={props.businessKey.id} name="business_id" onChange={handleChange} />
                <br/>
                <input id='btn' type="submit" />
            </form>
        </>
    )
}

export default Add
