import { useState, useEffect, useContext } from "react"
import { Context } from "../../Context/Context"
import { getReceipts, deleteReceipt, viewReceipt } from "../../util/contollers"
import Swal from "sweetalert2"

const CreatedReceipts = () => {
  const [receipts, setReceipts] = useState([])

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
    getReceipts(e.target.value).then(response => {
      setReceipts(response.reverse())
    }).catch((err) => {
      setAlertModal(() => ({ mode: true, msg: "An error occured", icon: "error" }))
    })
  }

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6 text-center mb-5">
          <h2 className="heading-section">Receipts</h2>
        </div>
      </div>
      <div className="searchReceipt w-50">
        <input onChange={searchHandler} type="text" placeholder="Search" />
        <div>
          <select>
            <option>Date</option>
          </select>
        </div>
      </div>
      <section style={{ overflow: "scroll" }} className="ftco-section w-100">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="table-wrap">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Invoice ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipts.map(receipt => {
                      return (
                        <tr key={receipt.id}>
                          <th scope="row">{new Date(receipt.date * 1000).toLocaleDateString()}</th>
                          <td>{receipt.id}</td>
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
    </>
  )
}

export default CreatedReceipts