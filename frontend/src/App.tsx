//PAGES
import PageHome from "../pages/PageHome"
import PageUserAccount from "../pages/PageUserAccount"
import PageSignIn from "../pages/PageSignIn"
import PageCart from "../pages/PageCart"
import PageProduct from "../pages/PageProduct"
//COMPONENTS
// import Navbar from "../components/Navbar"
import RootLayout from "../components/RootLayout"
//LIBS
import { Routes, Route, Navigate } from "react-router-dom"

import useAuthUser from "../hooks/useAuthUser"

//<Navigate to="/products" />
export default function App() {

  useAuthUser()
  
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={ <div>Home</div> } />
        <Route path="/privacy" element={ <h1>PRIVACY</h1> } />
        <Route path="/tos" element={ <h1>TOS</h1> } />
        <Route path="/products" element={ <PageHome />} />
        <Route path="/products/:pid" element={<PageProduct />} />
        <Route path="/account" element={ <PageUserAccount /> } />
        <Route path="/sign-in" element={ <PageSignIn /> } />
        <Route path="/cart" element={ <PageCart /> } />
        <Route path="/*" element={ <Navigate to="/products" replace/> }  />
      </Route>
    </Routes>
  )
}
