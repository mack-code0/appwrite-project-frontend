const EditRecipient = ({ content }) => {
    return (
        <section className="form">
            {/* <h1 className="mb-3" style={{ fontFamily: "Montserrat", fontWeight: 700 }}>Edit Product</h1> */}
            <form onSubmit={(e) => e.preventDefault()} className="w-100 mt-2 d-flex flex-column align-items-center text-left">

                <div className="input-holder w-100">
                    <label>Full Name</label>
                    <input id="edit-mode-name" type="text" defaultValue={content.name} placeholder="Recipient name" />
                </div>

                <div className="input-holder w-100">
                    <label>Address</label>
                    <input id="edit-mode-address" type="text" defaultValue={content.address} placeholder="Address" />
                </div>

                <div className="multiple-input d-flex w-100">
                    <div className="input-holder">
                        <label>City</label>
                        <input id="edit-mode-city" defaultValue={content.city} type="text" placeholder="City" />
                    </div>
                    <div className="input-holder">
                        <label>Country</label>
                        <input id="edit-mode-country" defaultValue={content.country} type="text" placeholder="Country" />
                    </div>
                </div>
            </form>
        </section>
    )
}


export default EditRecipient