import Card from "./Card"
import "./CardHolder.css"
const CardHolder = ({ viewReceipt }) => {
    return (
        <section className="themes">
            <div className="row">
                <Card viewReceipt={() => viewReceipt(1)} receiptNo={1} />
                <Card viewReceipt={() => viewReceipt(2)} receiptNo={2} />
                <Card />
                <Card />
                <Card />
            </div>
        </section>
    )
}

export default CardHolder