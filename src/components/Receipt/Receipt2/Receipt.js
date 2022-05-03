import Product from "./Product"
import "./Receipt.css"
const Receipt = ({ products, totalPrice }) => {
    return (
        <div id="printImage">

            <div className="toolbar hidden-print">
                <hr></hr>
            </div>
            <div className="invoice overflow-auto">
                <div style={{ minWidth: "600px" }}>
                    <header>
                        <div className="row">
                            <div className="col"></div>
                            <div className="col company-details">
                                <h2 className="name">
                                    <span>
                                        Arboshiki
                                    </span>
                                </h2>
                                <div>455 Foggy Heights, AZ 85004, US</div>
                                <div>(123) 456-789</div>
                                <div>company@example.com</div>
                            </div>
                        </div>
                    </header>
                    <main>
                        <div className="row contacts">
                            <div className="col invoice-to">
                                <div className="text-gray-light">INVOICE TO:</div>
                                <h2 className="to">John Doe</h2>
                                <div className="address">796 Silver Harbour, TX 79273, US</div>
                            </div>
                            <div className="col invoice-details">
                                <h1 className="invoice-id">INVOICE 3-2-1</h1>
                                <div className="date">Date of Invoice: {new Date(Date.now()).toLocaleDateString()}</div>
                            </div>
                        </div>
                        <table border="0" cellSpacing="0" cellPadding="0">
                            <thead>
                                <tr>
                                    <th style={{width: "30px"}}>QTY</th>
                                    <th className="text-left">DESCRIPTION</th>
                                    <th className="text-right">TOTAL</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(product => <Product key={product.id} product={product} />)}
                            </tbody>

                            <tfoot>
                                <tr>
                                    <td colSpan="2">GRAND TOTAL</td>
                                    <td>${totalPrice}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </main>
                </div>
            </div>
        </div>
    )
}


export default Receipt