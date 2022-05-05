import { useState, useEffect, useContext } from "react"
import { Context } from "../../Context/Context"
import { getReceipts, deleteReceipt, viewReceipt } from "../../util/contollers"
import Swal from "sweetalert2"
import Loader from "../Loader/Loader"

const CreatedReceipts = () => {
  const [receipts, setReceipts] = useState([])
  const [innerLoading, setInnerLoading] = useState(false)

  const { alert_h, isLoading_h } = useContext(Context)
  const [alertModal, setAlertModal] = alert_h
  const [isLoading, setIsLoading] = isLoading_h

  useEffect(() => {
    setIsLoading(true)
    getReceipts("").then(response => {
      setReceipts(response.reverse())
    }).catch((err) => {
      setAlertModal(() => ({ mode: true, msg: "An error occured", icon: "error" }))
    }).finally(() => setIsLoading(false))
  }, [setIsLoading, setAlertModal])

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

  const searchHandler = (e) => {
    setInnerLoading(true)
    getReceipts(e.target.value).then(response => {
      setReceipts(response.reverse())
    }).catch((err) => {
      setAlertModal(() => ({ mode: true, msg: "An error occured", icon: "error" }))
    }).finally(() => setInnerLoading(false))
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
                              <button className="btn btn-primary mr-2">Share</button>
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