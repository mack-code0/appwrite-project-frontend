import { useContext, useState } from "react"
import Swal from "sweetalert2"
import { Context } from "../../Context/Context"

const Signup = ({ openLoginPageHandler }) => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const { isLoggedIn_h, isLoading_h, alert_h } = useContext(Context)
    const [alertModal, setAlertModal] = alert_h
    const [isLoading, setIsLoading] = isLoading_h

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const signup = e => {
        e.preventDefault()
        if (!email || !password || !name) {
            return setAlertModal(() => ({ msg: "Invalid credentials", mode: true, icon: "error" }))
        }

        setIsLoading(true)


        fetch("http://localhost:7000/signup", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(response => {
                if (response.error) {
                    if (response.status === 429) {
                        return setAlertModal(() => ({ msg: "Too many requests on this IP address, wait for some minutes", mode: true, icon: "warning" }))
                    }
                    throw new Error("An error occured")
                }

                setName("")
                setEmail("")
                setPassword("")

                openLoginPageHandler()
            }).catch(err => {
                setAlertModal(() => ({ msg: "An error occured, check your inputs.", mode: true, icon: "error" }))
            }).finally(() => setIsLoading(false))
    }

    return (
        <section className="form">
            <form onSubmit={signup} className="w-100 d-flex flex-column align-items-center">
                <div className="input-holder w-100">
                    <label>Email</label>
                    <input type="email" value={email} onChange={emailHandler} placeholder="Email" />
                </div>

                <div className="input-holder w-100">
                    <label>Full Name</label>
                    <input type="text" value={name} onChange={nameHandler} placeholder="Full Name" />
                </div>

                <div className="input-holder w-100">
                    <label>Password</label>
                    <input type="password" value={password} onChange={passwordHandler} placeholder="Password" />
                </div>

                <button type="submit">
                    Sign Up
                </button>
            </form>
        </section>
    )
}


export default Signup