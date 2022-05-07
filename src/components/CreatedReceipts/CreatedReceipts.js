import { useState, useEffect, useContext } from "react"
import { Context } from "../../Context/Context"
import { getReceipts, deleteReceipt, viewReceipt } from "../../util/contollers"
import Swal from "sweetalert2"
import Loader from "../Loader/Loader"

const CreatedReceipts = () => {
  const [receipts, setReceipts] = useState([])
  const [innerLoading, setInnerLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()

  const { alert_h, isLoading_h } = useContext(Context)
  const [alertModal, setAlertModal] = alert_h
  const [isLoading, setIsLoading] = isLoading_h

  useEffect(() => {
    setInnerLoading(true)
    getReceipts("", currentPage).then(response => {
      setReceipts(response.files.reverse())
      setTotalPages(response.total)
    }).catch((err) => {
      setAlertModal(() => ({ mode: true, msg: "An error occured", icon: "error" }))
    }).finally(() => setInnerLoading(false))
  }, [setIsLoading, setAlertModal, currentPage])

  const deleteHandler = (id) => {
    setIsLoading(true)
    deleteReceipt(id).then(response => {
      setReceipts((prev) => {
        return prev.filter(el => el.id.toString() !== id.toString())
      })
      setAlertModal(() => ({ mode: true, msg: "Receipt deleted!", icon: "info" }))
    }).catch(err => {
      setAlertModal(() => ({ mode: true, msg: "An error occured", icon: "error" }))
    }).finally(() => setIsLoading(false))
  }

  const viewHandler = (id) => {
    setIsLoading(true)
    viewReceipt(id).then(imageUrl => {
      return Swal.fire({
        imageUrl: imageUrl + "&mode=admin",
        imageWidth: "100%",
      })
    }).finally(() => {
      setIsLoading(false)
    })

  }

  const paginationHandler = (e) => {
    let clicked;
    if (e.target.innerHTML === "&gt;") {
      clicked = currentPage + 1
    } else if (e.target.innerHTML === "&lt;") {
      clicked = currentPage - 1
    } else {
      clicked = + e.target.innerHTML
    }
    setCurrentPage(clicked)
  }

  const searchHandler = (e) => {
    setInnerLoading(true)
    getReceipts(e.target.value, 1).then(response => {
      setReceipts(response.files.reverse())
      setTotalPages(response.total)
    }).catch((err) => {
      setAlertModal(() => ({ mode: true, msg: "An error occured", icon: "error" }))
    }).finally(() => setInnerLoading(false))
  }

  const pages = []
  for (var i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      pages.push(
        <li key={i} className="page-item active">
          <span className="page-link">{i} <span className="sr-only">(current)</span></span>
        </li>
      )
      continue
    }
    pages.push(<li key={i} className="page-item"><span onClick={paginationHandler} className="page-link">{i}</span></li>)
  }


  const sendEmail = () => {
    Swal.fire({
      html: ``
    })
  }

  return (
    <>
      <div className="text-center mb-3">
        <h3 className="heading-section">Receipts</h3>
      </div>
      <div className="searchReceipt w-100 d-flex justify-content-center mb-3">
        <input className="w-50" onChange={searchHandler} type="text" placeholder="Search" />
      </div>
      {innerLoading && <Loader loaderHandler={innerLoading} innerLoading={true} />}
      {receipts.length <= 0 ?
        <h1 style={{ opacity: 0.5 }} className="text-center"> No Receipts </h1> :
        <section style={{ overflow: "scroll" }} className="ftco-section w-100">
          <div className="container">

            <nav aria-label="...">
              <ul className="pagination">
                {
                  currentPage > 1 &&
                  <li className="page-item">
                    <span className="page-link" onClick={(e) => paginationHandler(e)}>&lt;</span>
                  </li>
                }
                {
                  pages.map(page => page)
                }
                {
                  !((currentPage + 1) > totalPages) &&
                  <li className="page-item">
                    <span className="page-link" onClick={(e) => paginationHandler(e)}>&gt;</span>
                  </li>
                }

              </ul>
            </nav>

            <div className="row">
              <div className="col-md-12">
                <div className="table-wrap">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Receipient</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receipts.map(receipt => {
                        return (
                          <tr key={receipt.id}>
                            <th scope="row">{new Date(receipt.date * 1000).toLocaleDateString()}</th>
                            <td>{receipt.name}</td>
                            <td className="d-flex">
                              <button onClick={() => viewHandler(receipt.id)} className="btn btn-success mr-2">View</button>
                              <button onClick={() => sendEmail()} className="btn btn-primary mr-2">Share</button>
                              <button onClick={() => deleteHandler(receipt.id)} className="btn btn-danger">Delete</button>
                            </td>
                          </tr>)
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </section>
      }
    </>
  )
}

export default CreatedReceipts