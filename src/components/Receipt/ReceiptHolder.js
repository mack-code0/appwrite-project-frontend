import Receipt1 from "./Receipt1/Receipt"
import Receipt2 from "./Receipt2/Receipt"

import CreateImage from "../../util/CreateImage"
import { genToken } from "../../util/authentication"
import "./Button.css"

const Receipt = ({ products, receiptNo, openTheme }) => {
    const saveReceiptHandler = async () => {
        try {
            const image = await CreateImage()
            await genToken()
            const token = localStorage.getItem("gmrauthtoken")
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
            console.log(err);
        }
    }

    let ReceiptHolder;
    switch (receiptNo) {
        case 1:
            ReceiptHolder = Receipt1
            console.log("1");
            break;

        case 2:
            ReceiptHolder = Receipt2
            console.log("2");
            break;

        default:
            ReceiptHolder = Receipt2
            console.log(receiptNo)
            break;
    }

    let totalPrice = 0
    products.forEach(product => {
        totalPrice += +product.price
    });

    return (
        <div className="">
            <div className="mb-4">
                <button className="save-and-share py-2 px-3">Save and Share</button>
                <button onClick={saveReceiptHandler} className="save py-2 px-3 mx-3">Save</button>
                <button onClick={openTheme} className="save py-2 px-3">Change Theme</button>
            </div>
            {/* <ReceiptTest products={products} totalPrice={totalPrice} /> */}
            <ReceiptHolder products={products} totalPrice={totalPrice} />
        </div>
    )
}

export default Receipt