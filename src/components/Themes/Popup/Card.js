import Receipt1 from "./receipt1.jpg"
const Card = ({ viewReceipt, receiptNo = 1 }) => {
    var receieptHolder;

    switch (receiptNo) {
        case 1:
            receieptHolder = Receipt1
            break;
        case 2:
            receieptHolder = Receipt1
            break;
        case 3:
            receieptHolder = Receipt1
            break;
        case 4:
            receieptHolder = Receipt1
            break;
        default:
            receieptHolder = Receipt1
            break;
    }
    return (
        <div className="col-sm-6">
            <div className="card">
                <img src={receieptHolder} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <button className="btn-sm" onClick={viewReceipt}>Select</button>
                    <button className="btn-sm">View</button>
                </div>
            </div>
        </div>
    )
}
export default Card