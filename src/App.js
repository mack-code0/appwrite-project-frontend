import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "./components/ReceiptForm/FormHolder.css"
import "./App.css"
import Receipt from './components/Receipt/Receipt'
// import html2canvas from 'html2canvas'
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
  const [isOpen, setIsOpen] = useState(false);
  const [openThemeSelector, setOpenThemeSelector] = useState(false)
  const [openAccount, setOpenAccount] = useState(false)
  const [openLoader, setOpenLoader] = useState(false)
  const [viewReceipt, setViewReceipt] = useState(true)
  const [openLoginPage, setOpenLoginPage] = useState(false)
  const [isAuth, setIsAuth] = useState("")


  useEffect(() => {
    openLoaderHandler()
    isLoggedIn(cb=>setIsAuth(cb))
  }, [isAuth])

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
    setIsOpen(!isOpen);
  }

  const submitEditedProduct = (product) => {
    setProductList((prev) => {
      const prodIndex = productList.findIndex(prod => prod.id.toString() === product.id.toString())
      prev[prodIndex] = product
      return prev
    })
    setIsOpen(false)
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
      return alert("Add Product")
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
    setOpenLoader(true)

    setTimeout(() => {
      setOpenLoader(false)
    }, 1000)
  }

  return (
    <main className="main-container mx-auto">
      <Loader loaderHandler={openLoader} />
      <Logo
        logoutHandler={setIsAuth}
        authenticated={isAuth}
        openLoginPage={openLoginPage}
        openSignupPageHandler={() => setOpenLoginPage(false)}
        openLoginPageHandler={() => setOpenLoginPage(true)}
        openAccount={openAccountHandler}
        homepage={homepageHandler}
        viewReceipt={viewReceipt}
        isAccountOpen={openAccount}
      />
      {
        isAuth ?
          (openAccount ?
            <Account openThemeOptions={themeSelector} /> :
            <>
              {viewReceipt ?
                <Receipt products={productList} /> :
                <FormHolder resetHandler={reset} addToList={addProduct} themeSelectorHandler={themeSelector} products={productList} editHandler={editProduct} deleteHandler={deleteProduct} />
              }
              {isOpen && <Popup editProductHandler={submitEditedProduct} contentHandler={productToEdit} handleClose={() => setIsOpen(false)} />}
              {openThemeSelector && <CardPopup viewReceipt={viewReceiptHandler} handleClose={() => setOpenThemeSelector(false)} />}
            </>)
          :
          (openLoginPage ?
            <Login authModeHandler={setIsAuth} openSignupPage={() => setOpenLoginPage(false)} />
            :
            <Signup openLoginPageHandler={() => setOpenLoginPage(true)} />)
      }
    </main>
  )


}

export default App;
