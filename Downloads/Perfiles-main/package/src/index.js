import React, { useState, useEffect } from "react"
import "./assets/scss/style.scss"
import ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"
import axios from "axios"
import { createBrowserHistory } from "history"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Components from "./views/components/components"
import RegisterComponents from "./views/register-components/register-components"
import LoginComponents from "./views/login-components/login-components"
import Admin from "./views/admin/admin"
import Curriculum from "./views/curriculum-components/curriculum-component"

const root = ReactDOM.createRoot(document.getElementById("root"))

var hist = createBrowserHistory()

const ToHome = () => {
  window.location.href = "/"
}

function App() {
  const [loged, isLoged] = useState(null)
  const [userData, setUserData] = useState({})

  async function validation() {
    if (document.cookie.includes("secretX=")) {
      try {
        await axios
          .get(`http://localhost:9000/api/usuarios/current`, { withCredentials: true })
          .then((response) => {
            setUserData(response.data)
            isLoged(true)
          })
          .catch((err) => {
            console.error(err)
            document.cookie = "secretX=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
            window.location.reload()
            isLoged(false)
          })
      } catch (error) {
        console.error(error)
        document.cookie = "secretX=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        window.location.reload()
        isLoged(false)
      }
    } else {
      isLoged(false)
    }
  }
  useEffect(() => {
    validation()
  }, [])

  if (loged === null) {
    return (
      <div className='centrado'>
        <div className='lds-roller'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter history={hist}>
      <Routes>
        <Route path='/' element={<Components userData={userData} />} />
        <Route path='/register' element={loged === true ? <ToHome /> : <RegisterComponents />} />
        <Route path='/login' element={loged === true ? <ToHome /> : <LoginComponents />} />
        <Route path='/admin' element={loged === true ? <Admin userData={userData} /> : <ToHome />} />
        <Route path='/curriculum' element={loged === true ? <Curriculum userData={userData} functionIni={validation}/> : <ToHome />} />
      </Routes>
    </BrowserRouter>
  )
}

root.render(<App />)

// If you want to sta
//easuring performance in your app, pass a function
//to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
