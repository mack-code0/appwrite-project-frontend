import { useState, useEffect } from "react"

const Form = ({ addToListHandler, themeSelector }) => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")

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

        addToListHandler({
            name,
            price,
            quantity
        })

        setName("")
        setPrice("")
        setQuantity("")
    }

    return (
        <section className="form">
            <form onSubmit={submitProduct} className="w-100 d-flex flex-column align-items-center">

                <input type="text" value={name} onChange={nameHandler} placeholder="Product name" />

                <div className="multiple-input d-flex w-100">
                    <input value={price} onChange={priceHandler} type="number" placeholder="Price" />
                    <input value={quantity} onChange={quantityHandler} type="number" placeholder="Quantity" />
                </div>

                <button type="submit">
                    Add
                </button>


            </form>
            <div className="multiple-button d-flex w-100">
                <button onClick={() => ""}>Cancel</button>
                <button onClick={themeSelector}>Select Theme</button>
            </div>
        </section>
    )
}


export default Form