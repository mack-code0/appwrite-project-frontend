import Settings from "./setting.png"
import Back from "./back.png"
const Logo = ({ openAccount, isAccountOpen }) => {
    return (
        <div className="logo d-flex align-items-center justify-content-between">
            <h3>GMR</h3>
            <img onClick={openAccount} width="35" src={isAccountOpen ? Back : Settings} alt="" />
        </div>
    )
}
export default Logo