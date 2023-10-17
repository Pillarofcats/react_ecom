//COMPONENTS
import SignUp from "../components/SignUp"
import SignIn from "../components/SignIn"
//LIBS
import { useState } from "react"
import useRemoveURLParams from "../hooks/useRemoveURLParams"

export default function PageSignIn() {
  const [toggleSignIn, setToggleSignIn] = useState(true)

  useRemoveURLParams()

  return (
    <div className="flex flex-col items-center justify-center flex-1">
    { 
      toggleSignIn ? 
        <SignIn setToggleSignIn={ setToggleSignIn } />
        :
        <SignUp setToggleSignIn={ setToggleSignIn }/> 
    }
    </div>
  )
}
