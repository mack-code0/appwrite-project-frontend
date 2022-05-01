import { useState, useEffect, useContext } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "./components/ReceiptForm/FormHolder.css"
import "./App.css"
import { Context } from "./Context/Context"
import Swal from 'sweetalert2'
// /////////////////////////
import ReceiptHolder from './components/Receipt/ReceiptHolder'
import FormHolder from './components/ReceiptForm/FormHolder'
import Popup from "./components/ReceiptForm/PopUp/EditPopUp"
import CardPopup from "./components/Themes/Popup/CardPopup"
import Account from "./components/Account/Account"
import Logo from "./components/ReceiptForm/Logo"
import Loader from "./components/Loader/Loader"
import Signup from "./components/auth/Signup"
import { isLoggedIn } from "./util/authentication"
import Login from "./components/auth/Login"

function App() {
  const [productList, setProductList] = useState("")
  const [productToEdit, setProductToEdit] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)
  const [editMode, setEditMode] = useState(false);
  const [openThemeSelector, setOpenThemeSelector] = useState(false)
  const [openAccount, setOpenAccount] = useState(false)
  const [viewReceipt, setViewReceipt] = useState(false)
  const [openLoginPage, setOpenLoginPage] = useState(false)

  const { alert_h, isLoading_h, isLoggedIn_h } = useContext(Context)
  const [alertModal, setAlertModal] = alert_h
  const [isLoading, setIsLoading] = isLoading_h
  const [isLoggedIn] = isLoggedIn_h

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
        icon: 'error',
        showConfirmButton: true,
        timer: 3000,
      }).then(() => {
        setAlertModal(false)
      })
    }
  }, [alertModal, setAlertModal])

  const addProduct = (product) => {
    setTotalPrice((prev) => {
      return prev + +product.price
    })

    setProductList((prev) => {
      return [...prev, { ...product, id: Math.random() }]
    })
  }

  const deleteProduct = (e) => {
    setProductList(productList.filter(prod => prod.id.toString() !== e.target.value.toString()))
  }

  const editProduct = (e) => {
    setProductToEdit(productList.find(prod => prod.id.toString() === e.target.value.toString()))
    setEditMode(!editMode);
  }

  const submitEditedProduct = (product) => {
    setProductList((prev) => {
      const prodIndex = productList.findIndex(prod => prod.id.toString() === product.id.toString())
      prev[prodIndex] = product
      return prev
    })
    setEditMode(false)
  }

  const themeSelector = () => {
    openLoaderHandler()
    setOpenThemeSelector(!openThemeSelector)
  }

  const openAccountHandler = () => {
    openLoaderHandler()
    setOpenAccount(!openAccount)
  }

  const reset = () => {
    if (productList.length > 0 && window.confirm("Are you sure you want to cancel?") === true) {
      setProductList([])
    }
  }

  const viewReceiptHandler = () => {
    if (productList.length <= 0) {
      return setAlertModal(() => {
        return { mode: true, msg: "Please Add Product" }
      })
    }
    openLoaderHandler()
    setOpenThemeSelector(false)
    setViewReceipt(true)
  }

  const homepageHandler = () => {
    openLoaderHandler()
    setViewReceipt(false)
  }

  const openLoaderHandler = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <main className="main-container mx-auto">
      <Loader loaderHandler={isLoading} />
      <Logo
        openLoginPage={openLoginPage}
        openSignupPageHandler={() => setOpenLoginPage(false)}
        openLoginPageHandler={() => setOpenLoginPage(true)}
        openAccount={openAccountHandler}
        homepage={homepageHandler}
        viewReceipt={viewReceipt}
        isAccountOpen={openAccount}
      />

      {
        isLoggedIn ?
          (openAccount ?
            <Account openThemeOptions={themeSelector} /> :
            <>
              {viewReceipt ?
                <ReceiptHolder products={productList} /> :
                <FormHolder resetHandler={reset} addToList={addProduct} themeSelectorHandler={themeSelector} products={productList} editHandler={editProduct} deleteHandler={deleteProduct} />
              }
              {editMode && <Popup editProductHandler={submitEditedProduct} contentHandler={productToEdit} handleClose={() => setEditMode(false)} />}
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
