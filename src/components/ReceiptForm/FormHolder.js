import "./FormHolder.css"
import Form from './Form'
import Product from "./Product"

const FormHolder = ({ products, addToList, deleteHandler, editHandler, themeSelectorHandler }) => {
    return (
        <>
            <Form addToListHandler={addToList} themeSelector={themeSelectorHandler} />
            <section className="added-product">
                {products && products.map(product => <Product key={product.id} product={product} editProduct={editHandler} deleteProduct={deleteHandler} />)}
            </section>
        </>
    )
}

export default FormHolder