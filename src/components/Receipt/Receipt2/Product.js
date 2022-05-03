const Product = ({product}) => {
    return (
        <tr>
            <td className="no text-right">{product.quantity}</td>
            <td className="text-left">{product.name}</td>
            <td className="total">${product.price}</td>
        </tr >
    )
}

export default Product