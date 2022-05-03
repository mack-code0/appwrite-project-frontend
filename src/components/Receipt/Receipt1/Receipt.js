import "./Receipt.css"
import Product from "./Product"

const Receipt = ({ products, totalPrice }) => {

    return (
        <>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

            <div id="printImage" className="page-content container">
                <div className="page-header text-blue-d2">
                    <h1 className="page-title text-secondary-d1">
                        Invoice
                        <small className="page-info">
                            <i className="fa fa-angle-double-right text-80"></i>
                            ID: #111-222
                        </small>
                    </h1>
                </div>

                <div className="container px-0">
                    <div className="row mt-4">
                        <div className="col-12 col-lg-12">

                            <div className="text-center">
                                <h3 className="text-blue">Herbert Macaulay Company and Co from Nigeria</h3>
                            </div>

                            <hr className="row brc-default-l1 mx-n1 mb-4" />

                            <div className="row">
                                <div className="col-sm-6">
                                    <div>
                                        <span className="text-sm text-grey-m2 align-middle">To:</span>
                                        <span className="text-600 text-110 text-blue align-middle">Alex Doe</span>
                                    </div>
                                    <div className="text-grey-m2">
                                        <div className="my-1">
                                            Street, City
                                        </div>
                                        <div className="my-1">
                                            State, Country
                                        </div>
                                    </div>
                                </div>

                                <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                                    <hr className="d-sm-none" />
                                    <div className="text-grey-m2">
                                        <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                            Invoice
                                        </div>

                                        <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">ID:</span> #111-222</div>

                                        <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">Issue Date:</span> Oct 12, 2019</div>

                                    </div>
                                </div>

                            </div>

                            <div className="mt-4">
                                <div className="row text-600 text-white bgc-default-tp1 py-25">
                                    <div className="col-8 col-sm-8">Description</div>
                                    <div className="col-2 col-sm-2">Qty</div>
                                    <div className="col-2 col-sm-2">Price</div>
                                </div>

                                <div className="text-95 text-secondary-d3">
                                    {products.map(product => <Product key={product.id} product={product} />)}
                                </div>

                                <div className="row border-b-2 brc-default-l2"></div>

                                <div className="row mt-3">
                                    <div className="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
                                    </div>

                                    <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">

                                        <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                                            <div className="col-7 text-right">
                                                Total Amount
                                            </div>
                                            <div className="col-5">
                                                <span className="text-150 text-success-d3 opacity-2">${totalPrice}</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Receipt