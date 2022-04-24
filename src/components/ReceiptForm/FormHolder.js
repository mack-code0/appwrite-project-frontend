import Form from './Form'
import Product from "./Product"

const FormHolder = ({ products, addToList, deleteHandler, editHandler, themeSelectorHandler, resetHandler }) => {
    return (
        <>
            <Form reset={resetHandler} addToListHandler={addToList} themeSelector={themeSelectorHandler} />
            <section className="added-product">
                {products && products.map(product => <Product key={product.id} product={product} editProduct={editHandler} deleteProduct={deleteHandler} />)}
            </section>
        </>
    )
}

export default FormHolder