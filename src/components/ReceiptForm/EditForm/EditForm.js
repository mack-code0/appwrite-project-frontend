const EditForm = ({ content }) => {
    return (
        <section className="form">
            {/* <h1 className="mb-3" style={{ fontFamily: "Montserrat", fontWeight: 700 }}>Edit Product</h1> */}
            <form onSubmit={(e) => e.preventDefault()} className="w-100 mt-2 d-flex flex-column align-items-center text-left">

                <div className="input-holder w-100">
                    <label>Product Name</label>
                    <input id="edit-mode-name" type="text" defaultValue={content.name} placeholder="Product name" />
                </div>

                <div className="multiple-input d-flex w-100">
                    <div className="input-holder">
                        <label>Product Price</label>
                        <input id="edit-mode-price" defaultValue={content.price} type="number" placeholder="Price" />
                    </div>
                    <div className="input-holder">
                        <label>Product Quantity</label>
                        <input id="edit-mode-quantity" defaultValue={content.quantity} type="number" placeholder="Quantity" />
                    </div>
                </div>
            </form>
        </section>
    )
}


export default EditForm