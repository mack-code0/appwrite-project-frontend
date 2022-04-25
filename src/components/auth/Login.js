import { useState } from "react"
import appwritesdk from "../../util/appwritesdk"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const login = e => {
        e.preventDefault()

        if (!email || !password) {
            return alert("Invalid Inputs")
        }

        fetch("http://localhost:7000/login", {
            method: "Post",
            body: JSON.stringify({ email, password })
        }).then(res => res.json())
            .then(response => {
                console.log(response)
                setEmail("")
                setPassword("")
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <section className="form">
            <form onSubmit={login} className="w-100 d-flex flex-column align-items-center">


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