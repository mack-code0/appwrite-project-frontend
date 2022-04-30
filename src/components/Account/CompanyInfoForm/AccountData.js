import { useState, useEffect } from "react"
import { createInfo, getInfo } from "../../../util/contollers"
import "./Address.css"

const Address = ({ authModeHandler }) => {
    useEffect(()=>{
        getInfo()
    })

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")

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
        e.preventDefault()

        createInfo(address, name, city, country).then(response=>{
            console.log(response);
        }).catch(err=>{
            console.log(err);
        })
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