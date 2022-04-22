import { useState, useEffect } from "react"
import "../FormHolder.css"

const EditForm = ({ editProduct, content }) => {
    const [name, setName] = useState(content.name)
    const [price, setPrice] = useState(content.price)
    const [quantity, setQuantity] = useState(content.quantity)
    const [id, setId] = useState(content.id)

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const priceHandler = (e) => {
        setPrice(e.target.value)
    }

    const quantityHandler = (e) => {
        setQuantity(e.target.value)
    }
    const submitProduct = e => {
        e.preventDefault()

        if (!name || !price || !quantity) {
            return alert("Invalid Inputs")
        }

        editProduct({
            name,
            price,
            quantity,
            id
        })

        setName("")
        setPrice("")
        setQuantity("")
    }

    return (
        <section className="form my-5">
            <h1 className="mb-3" style={{fontFamily: "Montserrat", fontWeight: 700}}>Edit Product</h1>
            <form onSubmit={submitProduct} className="w-100 d-flex flex-column align-items-center">

                <input type="text" value={name} onChange={nameHandler} placeholder="Product name" />

                <div className="multiple-input d-flex w-100">
                    <input value={price} onChange={priceHandler} type="number" placeholder="Price" />
                    <input value={quantity} onChange={quantityHandler} type="number" placeholder="Quantity" />
                </div>

                <button type="submit">Edit</button>
            </form>
        </section>
    )
}


export default EditForm