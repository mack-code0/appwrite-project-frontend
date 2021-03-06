import { useState, useContext } from "react"
import { Context } from "../../Context/Context"

const Form = ({ addToListHandler, themeSelector, reset }) => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")

    const { alert_h } = useContext(Context)
    const [alertModal, setAlertModal] = alert_h

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
            return setAlertModal(() => { return { mode: true, msg: "Invalid Inputs", icon: "warning" } })
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

                <div className="input-holder w-100">
                    <label>Product Name</label>
                    <input type="text" value={name} onChange={nameHandler} placeholder="Product name" />
                </div>

                <div className="multiple-input d-flex w-100">
                    <div className="input-holder">
                        <label>Product Price</label>
                        <input value={price} onChange={priceHandler} type="number" placeholder="Price" />
                    </div>
                    <div className="input-holder">
                        <label>Product Quantity</label>
                        <input value={quantity} onChange={quantityHandler} type="number" placeholder="Quantity" />
                    </div>
                </div>

                <button type="submit">
                    Add
                </button>


            </form>
            <div className="multiple-button d-flex w-100">
                <button onClick={reset}>Cancel</button>
                <button onClick={themeSelector}>Select Theme</button>
            </div>
        </section>
    )
}


export default Form