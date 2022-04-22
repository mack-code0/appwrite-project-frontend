import "./Loader.css"
const Loader = ({ loaderHandler }) => {
    return (
        <div className={`${loaderHandler ? "":"d-none "}w-100 h-100 loader`}>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader