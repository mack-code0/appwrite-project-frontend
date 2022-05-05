const CreatedReceipts = () => {
  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section">Table #09</h2>
          </div>
        </div>
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
                  <tr>
                    <th scope="row">1001</th>
                    <td>Mark Otto</td>
                    <td className="d-flex">
                      <button className="btn btn-success">Edit</button>
                      <button className="btn btn-success">Delete</button>
                      <button className="btn btn-success">Share</button>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">1001</th>
                    <td>Mark Otto</td>
                    <td className="d-flex">
                      <button className="btn btn-success">Edit</button>
                      <button className="btn btn-success">Delete</button>
                      <button className="btn btn-success">Share</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreatedReceipts