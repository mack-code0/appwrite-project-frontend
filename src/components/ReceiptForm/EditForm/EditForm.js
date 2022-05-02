import "../FormHolder.css"

const EditForm = ({ content }) => {
    return (
        <section className="form">
            {/* <h1 className="mb-3" style={{ fontFamily: "Montserrat", fontWeight: 700 }}>Edit Product</h1> */}
            <form onSubmit={(e) => e.preventDefault()} className="w-100 mt-2 d-flex flex-column align-items-center">

                <input id="edit-mode-name" type="text" defaultValue={content.name} placeholder="Product name" />

                <div className="multiple-input d-flex w-100">
                    <input id="edit-mode-price" defaultValue={content.price} type="number" placeholder="Price" />
                    <input id="edit-mode-quantity" defaultValue={content.quantity} type="number" placeholder="Quantity" />
                </div>
            </form>
        </section>
    )
}


export default EditForm