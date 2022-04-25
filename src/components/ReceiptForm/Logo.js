import Settings from "./setting.png"
import Back from "./back.png"
import Home from "./homepage.png"
const Logo = ({
    openAccount, isAccountOpen, viewReceipt, homepage, openLoginPage, authMode, openSignupPageHandler, openLoginPageHandler
}) => {
    return (
        <div className="logo d-flex align-items-center justify-content-between">
            <h3>GMR</h3>
            <div className="d-flex align-items-center">
                {
                    isAccountOpen ?
                        <img onClick={openAccount} width="35" src={isAccountOpen ? Back : Settings} alt="" />
                        : viewReceipt && <img onClick={homepage} width="35" src={Home} alt="" />
                }
                {
                    !authMode &&
                        openLoginPage ?
                        <button onClick={openSignupPageHandler}>Signup</button>
                        : <button onClick={openLoginPageHandler}>Login</button>
                }
            </div>
        </div>
    )
}
export default Logo