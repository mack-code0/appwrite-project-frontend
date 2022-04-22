import Card from "./Card"
import "./CardHolder.css"
const CardHolder = () => {
    return (
        <section className="themes">
            <div className="row">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </section>
    )
}

export default CardHolder