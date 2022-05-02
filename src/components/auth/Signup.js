import { useContext, useState } from "react"
import Swal from "sweetalert2"
import { Context } from "../../Context/Context"

const Signup = ({ openLoginPageHandler }) => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const { isLoggedIn_h, isLoading_h } = useContext(Context)
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
            return Swal.fire({
                title: "Invalid inputs",
                icon: 'error',
                showConfirmButton: true,
                timer: 3000,
            })
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
                    throw new Error("An error occured")
                }
                setName("")
                setEmail("")
                setPassword("")

                openLoginPageHandler()
            }).catch(err => {
                Swal.fire({
                    title: "An error Occured, Check your inputs",
                    icon: 'error',
                    showConfirmButton: true,
                    timer: 3000,
                })
            }).finally(() => setIsLoading(false))
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