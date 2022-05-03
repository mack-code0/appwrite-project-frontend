const Product = ({ product, deleteProduct, editProduct }) => {

    return (
        <div className="product-info">
            <h6>{product.name}</h6>

            <div className="d-flex justify-content-between">
                <div className="product-subinfo">
                    <span className="product-title">Price: </span>
                    <span>${product.price}.00</span>
                </div>
                <div className="product-subinfo">
                    <span className="product-title">Quantity: </span>
                    <span>{product.quantity}</span>
                </div>
            </div>

            <div className="product-btn d-flex">
                <button value={product.id} onClick={editProduct}>Edit</button>
                <button value={product.id} onClick={deleteProduct}>Delete</button>
            </div>
        </div>
    )
}
export default Product