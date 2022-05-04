import Receipt1 from "./Receipt1/Receipt"
import Receipt2 from "./Receipt2/Receipt"

import CreateImage from "../../util/CreateImage"
import { genToken } from "../../util/authentication"
import "./Button.css"
import { Context } from "../../Context/Context"
import { useContext, useEffect, useState } from "react"
import ReactDOMServer from "react-dom/server"
import Swal from "sweetalert2"
import EditRecipient from "./EditRecipient/EditRecipient"
import { getInfo } from "../../util/contollers"

const Receipt = ({ products, receiptNo, openTheme, recipientInfo, setRecipientInfo }) => {
    const { alert_h, isLoading_h, isLoggedIn_h } = useContext(Context)
    const [alertModal, setAlertModal] = alert_h
    const [isLoading, setIsLoading] = isLoading_h


    const [companyInfo, setCompanyInfo] = useState({
        name: "",
        address: "",
        city: "",
        country: ""
    })

    useEffect(() => {
        getInfo().then((response) => {
            if (response.error) { return setAlertModal(() => ({ msg: "Please update your info", mode: true, icon: "info" })) }
            const { name, address, city, country } = response.data
            setCompanyInfo(() => ({ name, address, city, country }))
        })
    }, [setAlertModal])

    const saveReceiptHandler = async () => {
        setIsLoading(true)
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
                body: JSON.stringify({ image: image, name: recipientInfo.name })
            })
            const response = await res.json()

            if (response.error) {
                if (response.status === 429) {
                    return setAlertModal(() => ({
                        msg: "Too many requests! Wait for some minutes.",
                        mode: true,
                        icon: "warning"
                    }))
                }

                throw new Error("An error occured")
            }

        } catch (err) {
            setAlertModal(() => ({
                msg: "An error occured",
                mode: true,
                icon: "error"
            }))
        }
        setIsLoading(false)
    }

    const editProduct = async (e) => {
        Swal.fire({
            title: 'Recipient Info',
            html: ReactDOMServer.renderToString(<EditRecipient content={{ ...recipientInfo }} />),
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('edit-mode-name').value
                const address = document.getElementById('edit-mode-address').value
                const city = document.getElementById('edit-mode-city').value
                const country = document.getElementById('edit-mode-country').value

                setRecipientInfo((prev) => {
                    return ({ name, address, city, country })
                })
            }
        })
    }


    let totalPrice = 0
    products.forEach(product => {
        totalPrice += +product.price
    });

    let ReceiptHolder;
    switch (receiptNo) {
        case 1:
            ReceiptHolder = Receipt1
            break;

        case 2:
            ReceiptHolder = Receipt2
            break;

        default:
            ReceiptHolder = Receipt2
            break;
    }

    return (
        <div className="">
            <div className="mb-4">
                <button onClick={editProduct} className="save-and-share py-2 px-3">Edit Recipient</button>
                <button onClick={saveReceiptHandler} className="save py-2 px-3 mx-3">Save</button>
                <button onClick={openTheme} className="save py-2 px-3">Change Theme</button>
            </div>
            {/* <ReceiptTest products={products} totalPrice={totalPrice} /> */}
            <ReceiptHolder products={products} totalPrice={totalPrice} recipient={recipientInfo} companyInfo={companyInfo} />
        </div>
    )
}

export default Receipt