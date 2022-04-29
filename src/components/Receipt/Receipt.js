import Receipt1 from "./Receipt1/Receipt"
import Receipt2 from "./Receipt2/Receipt"

import SaveReceipt from "../../util/SaveReceipt"
import {genToken} from "../../util/authentication"
import "./Button.css"

const Receipt = ({ products, totalPrice }) => {
    const saveReceiptHandler = ()=>{
        SaveReceipt().then(image=>{
            return genToken(async token=>{
                try {
                    const res = await fetch("http://localhost:7000/image", {
                        method: "Post",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token.jwt
                        },
                        body: JSON.stringify({ image: image })
                    })
                    const res_1 = await res.json()
                    console.log(res_1)
                } catch (err) {
                    console.log(err)
                }
            })
        }).catch(err=>{
            console.log(err)
            console.log("An Error Occured")
        })
    }

    return (
        <div className="">
            <div className="mb-4">
                <button className="save-and-share py-2 px-3 mr-3">Save and Share</button>
                <button onClick={saveReceiptHandler} className="save py-2 px-3">Save</button>
            </div>
            {/* <ReceiptTest products={products} totalPrice={totalPrice} /> */}
            <Receipt2 />
        </div>
    )
}

export default Receipt