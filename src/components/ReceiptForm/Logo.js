import Settings from "./setting.png"
import Back from "./back.png"
import Home from "./homepage.png"
import { logout } from "../../util/authentication"

const Logo = ({
    openAccount,
    isAccountOpen,
    viewReceipt,
    homepage,
    openLoginPage,
    authenticated,
    logoutHandler,
    openSignupPageHandler,
    openLoginPageHandler
}) => {
    return (
        <div className="logo d-flex align-items-center justify-content-between">
            <h3>GMR</h3>
            {
                typeof authenticated === "boolean" &&
                <div className="d-flex align-items-center">
                    {
                        authenticated &&
                        <img onClick={openAccount} width="35" src={isAccountOpen ? Back : Settings} alt="" />
                    }

                    {authenticated && viewReceipt && <img onClick={homepage} width="35" src={Home} alt="" />}

                    {
                        !authenticated ?
                            (
                                openLoginPage ?
                                    <button onClick={openSignupPageHandler}>Signup</button>
                                    : <button onClick={openLoginPageHandler}>Login</button>
                            )
                            : <button onClick={() => {
                                logout((code) => {
                                    if (code === 400) return
                                    logoutHandler(false);
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