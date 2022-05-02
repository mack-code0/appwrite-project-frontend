import React, { useState, useEffect, useContext } from "react"
import ReactDOMServer from "react-dom/server"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "./components/ReceiptForm/FormHolder.css"
import "./App.css"
import { Context } from "./Context/Context"
import Swal from 'sweetalert2'
// /////////////////////////
import ReceiptHolder from './components/Receipt/ReceiptHolder'
import FormHolder from './components/ReceiptForm/FormHolder'
import CardPopup from "./components/Themes/Card/CardPopup"
import Account from "./components/Account/Account"
import Logo from "./components/ReceiptForm/Logo"
import Loader from "./components/Loader/Loader"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import EditForm from "./components/ReceiptForm/EditForm/EditForm"

function App() {
  const [productList, setProductList] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)
  const [openThemeSelector, setOpenThemeSelector] = useState(false)
  const [openAccount, setOpenAccount] = useState(false)
  const [viewReceipt, setViewReceipt] = useState({
    mode: false,
    number: 0
  })
  const [openLoginPage, setOpenLoginPage] = useState(false)

  const { alert_h, isLoading_h, isLoggedIn_h } = useContext(Context)
  const [alertModal, setAlertModal] = alert_h
  const [isLoading, setIsLoading] = isLoading_h
  const [isLoggedIn] = isLoggedIn_h

  useEffect(() => {
    setIsLoading(true)
    console.log("object");
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



  const themeSelector = () => {
    openLoaderHandler()
    setOpenThemeSelector(!openThemeSelector)
  }

  const openAccountHandler = () => {
    openLoaderHandler()
    setOpenAccount(!openAccount)
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

  const viewReceiptHandler = (num) => {
    if (productList.length <= 0) {
      return setAlertModal(() => {
        return { mode: true, msg: "Please Add Product" }
      })
    }
    openLoaderHandler()
    setOpenThemeSelector(false)
    setViewReceipt(() => ({ number: num, mode: true }))
  }

  const homepageHandler = () => {
    openLoaderHandler()
    setViewReceipt(() => ({ mode: false, number: 0 }))
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
              {viewReceipt.mode ?
                <ReceiptHolder products={productList} receiptNo={viewReceipt.number} /> :
                <FormHolder resetHandler={reset} addToList={addProduct} themeSelectorHandler={themeSelector} products={productList} editHandler={editProduct} deleteHandler={deleteProduct} />
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
