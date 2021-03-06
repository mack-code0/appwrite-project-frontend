import AccountData from "./CompanyInfoForm/AccountData"
import DefaultCard from "./DefaultCard"

const Account = ({ openThemeOptions }) => {
    return (
        <div style={{ margin: "0 30px" }} className="row">
            <div className="col-4">
                <div className="list-group" id="list-tab" role="tablist">
                    <a className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list"
                        href="#list-home" role="tab" aria-controls="home">Account</a>
                    <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list"
                        href="#list-profile" role="tab" aria-controls="profile">Default Theme</a>
                    <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list"
                        href="#list-history" role="tab" aria-controls="history">History</a>
                </div>
            </div>
            <div className="col-8">
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                        <AccountData />
                    </div>
                    <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                        <DefaultCard changeTheme={openThemeOptions} />
                    </div>
                    <div className="tab-pane fade" id="list-history" role="tabpanel" aria-labelledby="list-home-list">Home</div>
                </div>
            </div>
        </div>
    )
}

export default Account