import CardHolder from "./CardHolder"
import "./CardPopup.css"

const CardPopup = ({handleClose, viewReceipt}) => {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={handleClose}>x</span>
                <CardHolder viewReceipt={viewReceipt} />
            </div>
        </div>
    )
}

export default CardPopup