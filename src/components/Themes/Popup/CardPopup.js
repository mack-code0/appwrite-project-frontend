import CardHolder from "./CardHolder"
import "./CardPopup.css"

const CardPopup = ({handleClose}) => {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={handleClose}>x</span>
                <CardHolder />
            </div>
        </div>
    )
}

export default CardPopup