import { useState, useContext } from "react"
import { Context } from "../../Context/Context"
import { login } from "../../util/authentication"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { isLoggedIn_h, isLoading_h, alert_h } = useContext(Context)
    const [loggedIn, setIsLoggedIn] = isLoggedIn_h
    const [alertModal, setAlertModal] = alert_h
    const [isLoading, setIsLoading] = isLoading_h

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const submitLogin = e => {
        e.preventDefault()
        if (!email || !password) {
            return setAlertModal(() => ({ msg: "Invalid credentials", mode: true, icon: "error" }))
        }

        setIsLoading(true)

        login(email, password).then(bool => {
            if (!bool.mode) {
                if (bool.status === 429) {
                    return setAlertModal(() => ({ msg: "Too many requests, Please wait for some minutes", mode: true, icon: "warning" }))
                }
                setAlertModal(() => ({ msg: "Invalid credentials", mode: true, icon: "error" }))
            }
            setIsLoggedIn(bool.mode)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <section className="form">
            <form onSubmit={submitLogin} className="w-100 d-flex flex-column align-items-center">
                <div className="input-holder w-100">
                    <label>Email</label>
                    <input type="email" value={email} onChange={emailHandler} placeholder="Email" />
                </div>
                <div className="input-holder w-100">
                    <label>Password</label>
                    <input type="password" value={password} onChange={passwordHandler} placeholder="Password" />
                </div>
                <button type="submit">
                    Login
                </button>
            </form>
        </section>
    )
}


export default Login