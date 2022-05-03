const Product = ({ product }) => {
    return (
        <div className="row mb-2 mb-sm-0 py-25 bgc-default-l4">
            <div className="col-8 col-sm-8">{product.name}</div>
            <div className="col-2 col-sm-2">{product.quantity}</div>
            <div className="col-2 col-sm-2 text-secondary-d2">${product.price}</div>
        </div>
    )
}

export default Product