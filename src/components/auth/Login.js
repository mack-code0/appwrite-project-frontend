import { useState, useContext } from "react"
import { Context } from "../../Context/Context"
import { login } from "../../util/authentication"

const Login = ({ authModeHandler }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isLoggedIn_h } = useContext(Context)
    const [loggedIn, setIsLoggedIn] = isLoggedIn_h

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const submitLogin = e => {
        e.preventDefault()

        if (!email || !password) {
            return alert("Invalid Inputs")
        }

        login(email, password).then(bool => {
            setIsLoggedIn(bool)
        })
    }

    return (
        <section className="form">
            <form onSubmit={submitLogin} className="w-100 d-flex flex-column align-items-center">


                <input type="email" value={email} onChange={emailHandler} placeholder="Email" />
                <input type="password" value={password} onChange={passwordHandler} placeholder="Password" />

                <button type="submit">
                    Login
                </button>
            </form>
        </section>
    )
}


export default Login