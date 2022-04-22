import CardHolder from "../Themes/Popup/CardHolder"

const Account = () => {
    return (
        <div style={{margin: "0 30px"}} className="row">
            <div className="col-4">
                <div className="list-group" id="list-tab" role="tablist">
                    <a className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list"
                        href="#list-home" role="tab" aria-controls="home">Home</a>
                    <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list"
                        href="#list-profile" role="tab" aria-controls="profile">Themes</a>
                    <a className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list"
                        href="#list-messages" role="tab" aria-controls="messages">Messages</a>
                    <a className="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list"
                        href="#list-settings" role="tab" aria-controls="settings">Settings</a>
                </div>
            </div>
            <div className="col-8">
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">Home</div>
                    <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                        <CardHolder />
                    </div>
                    <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">Messages</div>
                    <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">Settings</div>
                </div>
            </div>
        </div>
    )
}

export default Account