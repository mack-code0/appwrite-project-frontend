import React, { useState, useEffect, useContext } from "react"
import ReactDOMServer from "react-dom/server"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "./App.css"
import Swal from 'sweetalert2'
// /////////////////////////
import { Context } from "./Context/Context"
import ReceiptHolder from './components/Receipt/ReceiptHolder'
import FormHolder from './components/ReceiptForm/FormHolder'
import CardPopup from "./components/Themes/Card/CardPopup"
import Account from "./components/Account/Account"
import Logo from "./components/Navbar/Navbar"
import Loader from "./components/Loader/Loader"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import CreatedReceipts from "./components/CreatedReceipts/CreatedReceipts"
import EditForm from "./components/ReceiptForm/EditForm/EditForm"

function App() {
  const [productList, setProductList] = useState("")
  const [openThemeSelector, setOpenThemeSelector] = useState(false)
  const [openAccount, setOpenAccount] = useState(false)
  const [openCreatedReceipts, setOpenCreatedReceipts] = useState(false)
  const [openLoginPage, setOpenLoginPage] = useState(false)
  const [viewReceipt, setViewReceipt] = useState({
    mode: false,
    number: 0
  })

  const { alert_h, isLoading_h, isLoggedIn_h } = useContext(Context)
  const [alertModal, setAlertModal] = alert_h
  const [isLoading, setIsLoading] = isLoading_h
  const [isLoggedIn] = isLoggedIn_h

  // state for reipient in receipt
  const [recipientInfo, setRecipientInfo] = useState({
    name: "Recipient Name",
    address: "Recipient Address",
    city: "",
    country: ""
  })

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [setIsLoading])


  useEffect(() => {
    if (alertModal.mode) {
      Swal.fire({
        title: alertModal.msg,
        icon: alertModal.icon,
        showConfirmButton: true,
        timer: 3000,
      }).then(() => {
        setAlertModal(false)
      })
    }
  }, [alertModal, setAlertModal])

  const addProduct = (product) => {
    setProductList((prev) => {
      return [{ ...product, id: Math.random() }, ...prev]
    })
  }

  const deleteProduct = (e) => {
    setProductList(productList.filter(prod => prod.id.toString() !== e.target.value.toString()))
  }

  const editProduct = async (e) => {
    const product = productList.find(prod => prod.id.toString() === e.target.value.toString())
    // setEditMode(!editMode);
    Swal.fire({
      title: 'Edit Product',
      html: ReactDOMServer.renderToString(<EditForm content={product} />),
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById('edit-mode-name').value
        const price = document.getElementById('edit-mode-price').value
        const quantity = document.getElementById('edit-mode-quantity').value

        Object.assign(product, { name: name, price: price, quantity: quantity })

        setProductList((prev) => {
          const prodIndex = prev.findIndex(prod => prod.id.toString() === product.id.toString())
          prev[prodIndex] = product
          return [...prev]
        })
      }
    })
  }

  const reset = () => {
    if (productList.length > 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          setProductList([])
          Swal.fire(
            'Deleted!',
            'Your Products has been deleted.',
            'success'
          )
        }
      })
    }
  }


  const themeSelector = () => {
    openLoaderHandler()
    setOpenThemeSelector(!openThemeSelector)
  }

  const openAccountHandler = () => {
    setOpenAccount(!openAccount)
  }

  const viewReceiptHandler = (num) => {
    if (productList.length <= 0) {
      return setAlertModal(() => {
        return { mode: true, msg: "Please Add Product", icon: "warning" }
      })
    }
    openLoaderHandler()
    setOpenThemeSelector(false)
    setOpenCreatedReceipts(false)
    setViewReceipt(() => ({ number: num, mode: true }))
  }

  const homepageHandler = () => {
    openLoaderHandler()
    setOpenCreatedReceipts(false)
    setViewReceipt(() => ({ mode: false, number: 0 }))
  }

  const openCreatedReceiptsHandler = () => {
    if (!openCreatedReceipts) {
      setViewReceipt(() => ({ mode: "", number: 0 }))
      setOpenAccount(false)
    } else {
      setViewReceipt(() => ({ mode: false, number: 0 }))
    }
    setOpenCreatedReceipts(!openCreatedReceipts)
  }

  const openLoaderHandler = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const resetStates = () => {
    setProductList("")
    setOpenThemeSelector(false)
    setOpenAccount(false)
    setViewReceipt(() => ({ mode: false, number: 0 }))
  }

  return (
    <main className="main-container mx-auto">
      <Loader loaderHandler={isLoading} />
      <Logo
        openLoginPage={openLoginPage}
        openSignupPageHandler={() => setOpenLoginPage(false)}
        openLoginPageHandler={() => setOpenLoginPage(true)}
        openCreatedReceipts={openCreatedReceiptsHandler}
        openAccount={openAccountHandler}
        homepage={homepageHandler}
        viewReceipt={viewReceipt}
        isAccountOpen={openAccount}
        resetStates={resetStates}
      />

      {
        isLoggedIn ?
          (openAccount ?
            <Account openThemeOptions={themeSelector} /> :
            <>
              {/* {openAccount && <Account openThemeOptions={themeSelector} />} */}
              {openCreatedReceipts && <CreatedReceipts />}
              {typeof viewReceipt.mode !== "string" &&
                (
                  viewReceipt.mode ?
                    <ReceiptHolder
                      products={productList}
                      receiptNo={viewReceipt.number}
                      recipientInfo={recipientInfo}
                      setRecipientInfo={setRecipientInfo}
                      openTheme={themeSelector}
                    /> :
                    <FormHolder
                      resetHandler={reset}
                      addToList={addProduct}
                      openTheme={themeSelector}
                      products={productList}
                      editHandler={editProduct}
                      deleteHandler={deleteProduct}
                    />
                )
              }
              {openThemeSelector && <CardPopup viewReceipt={viewReceiptHandler} handleClose={() => setOpenThemeSelector(false)} />}
            </>)
          :
          (openLoginPage ?
            <Login openSignupPage={() => setOpenLoginPage(false)} />
            :
            <Signup openLoginPageHandler={() => setOpenLoginPage(true)} />)
      }
    </main>
  )


}

export default App;
