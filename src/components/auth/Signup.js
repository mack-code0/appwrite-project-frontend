import { useState } from "react"

const Signup = ({ openLoginPageHandler }) => {
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

        fetch("http://localhost:7000/signup", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(response => {
                console.log(response);
                setName("")
                setEmail("")
                setPassword("")

                openLoginPageHandler()
            }).catch(err => {
                console.log(err);
            })
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