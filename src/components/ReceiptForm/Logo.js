import Settings from "./setting.png"
import Back from "./back.png"
import Home from "./homepage.png"
import { logout } from "../../util/authentication"
import { useContext } from "react"
import { Context } from "../../Context/Context"

const Logo = ({
    openAccount,
    isAccountOpen,
    viewReceipt,
    homepage,
    openLoginPage,
    openSignupPageHandler,
    openLoginPageHandler
}) => {
    const { isLoggedIn_h } = useContext(Context)
    const [isLoggedIn, setIsLoggedIn] = isLoggedIn_h

    return (
        <div className="logo d-flex align-items-center justify-content-between">
            <h3>GMR</h3>
            {
                typeof isLoggedIn === "boolean" &&
                <div className="d-flex align-items-center">
                    {
                        isLoggedIn &&
                        <img onClick={openAccount} width="35" src={isAccountOpen ? Back : Settings} alt="" />
                    }

                    {isLoggedIn && (viewReceipt && !isAccountOpen && <img onClick={homepage} width="35" src={Home} alt="" />)}

                    {
                        !isLoggedIn ?
                            (
                                openLoginPage ?
                                    <button onClick={openSignupPageHandler}>Signup</button>
                                    : <button onClick={openLoginPageHandler}>Login</button>
                            )
                            : <button onClick={() => {
                                logout((code) => {
                                    if (code === 400) return
                                    setIsLoggedIn(false)
                                })
                            }
                            }>Logout</button>
                    }
                </div>
            }
        </div>
    )
}
export default Logo