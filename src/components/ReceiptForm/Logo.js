import Settings from "./setting.png"
import Back from "./back.png"
import Home from "./homepage.png"
const Logo = ({ openAccount, isAccountOpen, viewReceipt, homepage }) => {
    return (
        <div className="logo d-flex align-items-center justify-content-between">
            <h3>GMR</h3>
            <div className="d-flex align-items-center">
                {viewReceipt && !isAccountOpen && <img onClick={homepage} width="35" src={Home} alt="" />}
                <img onClick={openAccount} width="35" src={isAccountOpen ? Back : Settings} alt="" />
            </div>
        </div>
    )
}
export default Logo