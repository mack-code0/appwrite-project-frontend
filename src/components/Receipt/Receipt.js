import ReceiptTest from "./ReceiptTest"
import "./Button.css"
import SaveReceipt from "../../util/SaveReceipt"

const Receipt = ({ products, totalPrice }) => {
    const saveReceiptHandler = ()=>{
        SaveReceipt().then(image=>{
            fetch("http://localhost:7000/image", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2MjVkY2U4YmJhMTQ5NjliNGEyNyIsInNlc3Npb25JZCI6IjYyNjUxMDM2OTMxYjU1NWExMWRhIiwiZXhwIjoxNjUwNzkzNzQ1fQ.1WbFo3GmWI1Nge9IE0F4mh_iDX9Blhe0SSR-XrX9gjE"
                },
                body: JSON.stringify({image: image})
            })
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
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