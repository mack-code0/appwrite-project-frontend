import Receipt1 from "./Receipt1/Receipt"
import Receipt2 from "./Receipt2/Receipt"

import SaveReceipt from "../../util/SaveReceipt"
import { genToken } from "../../util/authentication"
import "./Button.css"

const Receipt = ({ products, totalPrice }) => {
    const saveReceiptHandler = () => {
        SaveReceipt().then(async image => {

            try {
                let token = localStorage?.getItem("getauthtoken")
                if (!token) {
                    genToken(response => {
                        if (response.error) throw new Error("An error occured")
                        token = response.jwt
                    })
                }
                const res = await fetch("http://localhost:7000/image", {
                    method: "Post",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify({ image: image })
                })
                const res_1 = await res.json()
                console.log(res_1)
            } catch (err) {
                alert("An error occured")
            }
        }).catch(err => {
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
            <Receipt1 />
        </div>
    )
}

export default Receipt