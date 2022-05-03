import { useState, useEffect, useContext } from "react"
import { Context } from "../../../Context/Context"
import { createInfo, getInfo } from "../../../util/contollers"
import "./Address.css"

const Address = ({ authModeHandler }) => {

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")

    const { alert_h, isLoading_h, isLoggedIn_h } = useContext(Context)
    const [alertModal, setAlertModal] = alert_h
    const [isLoading, setIsLoading] = isLoading_h

    // Check if the info has been added
    // If the info has been added, then when submitting the form the data would be submitted to the edit handler
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getInfo().then((response) => {
            if (response.error) { return setAlertModal(() => ({ msg: "Please update your info", mode: true, icon: "info" })) }
            setEditMode(true)
            setName(response.data.name)
            setAddress(response.data.address)
            setCity(response.data.city)
            setCountry(response.data.country)
        })
        setIsLoading(false)
    }, [setIsLoading, setAlertModal])


    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const addressHandler = (e) => {
        setAddress(e.target.value)
    }

    const cityHandler = (e) => {
        setCity(e.target.value)
    }

    const countryHandler = (e) => {
        setCountry(e.target.value)
    }

    const submit = (e) => {
        setIsLoading(true)
        e.preventDefault()
        createInfo(address, name, city, country, editMode).then(response => {
            if (response.error) throw new Error("An error occured")
            setAlertModal(() => ({ mode: true, msg: "Info updated successfully", icon: "success" }))
        }).catch(err => {
            setAlertModal(() => ({ mode: true, msg: "An error occured, Pease try again", icon: "error" }))
        }).finally(() => setIsLoading(false))
    }

    return (
        <section style={{ padding: 0 }} className="form">
            <form onSubmit={submit} className="w-100 d-flex flex-column align-items-center">
                <div className="input-holder w-100">
                    <label>Account Name</label>
                    <input type="text" value={name} onChange={nameHandler} placeholder="Account Name" />
                </div>
                <div className="input-holder w-100">
                    <label>Address</label>
                    <input type="text" value={address} onChange={addressHandler} placeholder="Address" />
                </div>
                <div className="multiple-input d-flex w-100">
                    <div className="input-holder">
                        <label>City</label>
                        <input type="text" value={city} onChange={cityHandler} placeholder="City" />
                    </div>
                    <div className="input-holder">
                        <label>Country</label>
                        <input type="text" value={country} onChange={countryHandler} placeholder="Country" />
                    </div>
                </div>

                <button type="submit">
                    Update
                </button>
            </form>
        </section>
    )
}


export default Address