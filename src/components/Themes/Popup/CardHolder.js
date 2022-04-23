import Card from "./Card"
import "./CardHolder.css"
const CardHolder = ({ viewReceipt }) => {
    return (
        <section className="themes">
            <div className="row">
                <Card viewReceipt={viewReceipt} />
                <Card />
                <Card />
                <Card />
            </div>
        </section>
    )
}

export default CardHolder