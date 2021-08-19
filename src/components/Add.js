import React, { useState } from 'react'

const Add = (props) => {
    let emptyProduct = { name: '', image: '', description: '', price: 0, category: 'clothing', business_name: '', business_id: 0 }
    const [product, setProduct] = useState(emptyProduct)

    const handleChange = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreate(product)
    }

    return (
        <>
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
                <select name="category" onChange={handleChange}>
                    <option value="clothing">Clothing</option>
                    <option value="electronics">Electronics</option>
                    <option value="pets">Pets</option>
                </select>

                {/* <label htmlFor="category">Category: </label>
                <input type="text" name="category" onChange={handleChange} /> */}
                <br/>
                <label htmlFor="business_name">Business Name: </label>
                <input type="text" name="business_name" onChange={handleChange} />
                <br/>
                <label htmlFor="business_id">Business ID: </label>
                <input type="number" name="business_id" onChange={handleChange} />
                <br/>
                <input type="submit" />
            </form>
        </>
    )
}

export default Add
