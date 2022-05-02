import "../Themes/Card/CardHolder.css"

const DefaultCard = ({ changeTheme }) => {
    return (
        <div className="w-100">
            <div className="card">
                <img src="https://www.mizpee.com/wp-content/uploads/2021/05/Receipt-Templates-696x464.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <button onClick={changeTheme}>Change</button>
                </div>
            </div>
        </div>
    )
}

export default DefaultCard