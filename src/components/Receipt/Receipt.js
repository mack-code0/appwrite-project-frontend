import ReceiptTest from "./ReceiptTest"
import "./Button.css"
import SaveReceipt from "../../util/SaveReceipt"

const Receipt = ({ products, totalPrice }) => {
    const saveReceiptHandler = ()=>{
        SaveReceipt().then(e=>{
            console.log(e)
        }).catch(err=>{
            console.log("An Error Occured")
        })
    }

    return (
        <div className="">
            <div className="mb-4">
                <button className="save-and-share py-2 px-3 mr-3">Save and Share</button>
                <button onClick={saveReceiptHandler} className="save py-2 px-3">Save</button>
            </div>
            <ReceiptTest products={products} totalPrice={totalPrice} />
        </div>
    )
}

export default Receipt