import Settings from "./icons/setting.png"
import Back from "./icons/back.png"
import Home from "./icons/homepage.png"
import LogoutIcon from "./icons/logout.png"
import { logout } from "../../util/authentication"
import { useContext } from "react"
import { Context } from "../../Context/Context"
import Swal from "sweetalert2"

const Navbar = ({
    openAccount,
    isAccountOpen,
    viewReceipt,
    homepage,
    openLoginPage,
    openSignupPageHandler,
    openLoginPageHandler,
    resetStates
}) => {
    const { isLoggedIn_h, alert_h } = useContext(Context)
    const [isLoggedIn, setIsLoggedIn] = isLoggedIn_h
    const [alertModal, setAlertModal] = alert_h

    const logoutHandler = () => {
        Swal.fire({
            title: "Are you sure you want to logout?",
            icon: "question",
            showConfirmButton: true,
            confirmButtonText: "Yes",
            showCancelButton: true,
            cancelButtonText: "No",
            focusCancel: true
        }).then((response) => {
            if (response.isConfirmed) {
                logout((code) => {
                    if (code === 400) return
                    setIsLoggedIn(false)
                    resetStates()
                    setAlertModal(() => ({ mode: true, msg: "Logged out successfully", icon: "success" }))
                })
            }
        })
    }

    return (
        <div className="logo d-flex align-items-center justify-content-between">
            <h3>GMR</h3>
            {
                typeof isLoggedIn === "boolean" &&
                <div className="d-flex align-items-center">
                    {
                        isLoggedIn &&
                        <>
                            <img onClick={openAccount} width="35" src={isAccountOpen ? Back : Settings} alt="" />
                            {viewReceipt && !isAccountOpen && <img onClick={homepage} width="35" src={Home} alt="Homepage" />}
                        </>
                    }


                    {
                        !isLoggedIn ?
                            (
                                openLoginPage ?
                                    <button onClick={openSignupPageHandler}>Signup</button>
                                    : <button onClick={openLoginPageHandler}>Login</button>
                            )
                            : <img width="35" alt="Logout" src={LogoutIcon} onClick={logoutHandler} />
                    }
                </div>
            }
        </div>
    )
}
export default Navbar