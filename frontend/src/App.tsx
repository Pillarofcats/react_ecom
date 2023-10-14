//PAGES
import PageHome from "../pages/PageHome"
import PageUserAccount from "../pages/PageUserAccount"
import PageSignIn from "../pages/PageSignIn"
import PageCart from "../pages/PageCart"
import PageProduct from "../pages/PageProduct"
//COMPONENTS
import Navbar from "../components/Navbar"
//LIBS
import { Routes, Route } from "react-router-dom"

export default function App() {
  
  return (
    <>
      <Navbar />
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <Routes>
          <Route path="/" element={ <PageHome />} />
          <Route path="/account" element={ <PageUserAccount /> } />
          <Route path="/sign-in" element={ <PageSignIn /> } />
          <Route path="/cart" element={ <PageCart /> } />
          <Route path="/products/:pid" element={<PageProduct />} />
          <Route path="/*" element={ <PageHome /> }  />
        </Routes>
      </div>
    </>
  )
}
