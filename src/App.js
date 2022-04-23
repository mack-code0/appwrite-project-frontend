import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import Receipt from './components/Receipt/Receipt'
import html2canvas from 'html2canvas'
import { Appwrite } from 'appwrite'
import FormHolder from './components/ReceiptForm/FormHolder'
import Popup from "./components/ReceiptForm/PopUp/EditPopUp"
import CardPopup from "./components/Themes/Popup/CardPopup"
import Account from "./components/Account/Account"
import Logo from "./components/ReceiptForm/Logo"
import Loader from "./components/Loader/Loader"


function App() {
  const [productList, setProductList] = useState("")
  const [productToEdit, setProductToEdit] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const [openThemeSelector, setOpenThemeSelector] = useState(false)
  const [openAccount, setOpenAccount] = useState(false)
  const [openLoader, setOpenLoader] = useState(false)
  const [viewReceipt, setViewReceipt] = useState(false)


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
    if(productList.length <= 0){
      return alert("Add Product")
    }
    openLoaderHandler()
    setOpenThemeSelector(false)
    setViewReceipt(true)
  }

  const openLoaderHandler = ()=>{
    setOpenLoader(true)

    setTimeout(() => {
      setOpenLoader(false)
    }, 1000)
  }

  return (
    <main className="w-50 mx-auto">
      <Loader loaderHandler={openLoader} />
      <Logo openAccount={openAccountHandler} isAccountOpen={openAccount} />
      {
        openAccount ?
          <Account openThemeOptions={themeSelector} /> :
          <>
            {viewReceipt ?
              <Receipt products={productList} /> :
              <FormHolder resetHandler={reset} addToList={addProduct} themeSelectorHandler={themeSelector} products={productList} editHandler={editProduct} deleteHandler={deleteProduct} />
            }
            {isOpen && <Popup editProductHandler={submitEditedProduct} contentHandler={productToEdit} handleClose={() => setIsOpen(false)} />}
            {openThemeSelector && <CardPopup viewReceipt={viewReceiptHandler} handleClose={() => setOpenThemeSelector(false)} />}
            {/* <button onClick={handleDownloadImage}>Download Receipt</button>
            <Receipt products={productList} totalPrice={totalPrice} /> */}
          </>
      }
    </main>
  )


}

export default App;
