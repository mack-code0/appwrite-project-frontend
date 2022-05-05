import "./Loader.css"
const Loader = ({ loaderHandler, innerLoading }) => {
    return (
        <div style={innerLoading && { background: "none", backdropFilter: "none" }} className={`${loaderHandler ? "" : "d-none "}w-100 h-100 loader`}>
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