import { useState } from "react"
import appwritesdk from "../../util/appwritesdk"

const Signup = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

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
            return alert("Invalid Inputs")
        }

        const newUser = appwritesdk.create("unique()", email, password, name)
        newUser.then(function (response) {
            console.log(response);
        }, function (error) {
            if (error.code === 409) {
                return alert("Account already exists")
            }
            alert("An error occured")
        })

        setName("")
        setEmail("")
        setPassword("")
    }

    return (
        <section className="form">
            <form onSubmit={signup} className="w-100 d-flex flex-column align-items-center">


                <input type="email" value={email} onChange={emailHandler} placeholder="Email" />
                <input type="text" value={name} onChange={nameHandler} placeholder="Full Name" />
                <input type="password" value={password} onChange={passwordHandler} placeholder="Password" />

                <button type="submit">
                    Sign Up
                </button>
            </form>
        </section>
    )
}


export default Signup