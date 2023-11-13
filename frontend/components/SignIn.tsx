import React, { useRef } from "react"
import GoogleSignInButton from "../components/GoogleSignInButton"
import { tSignIn, tSetToggleSignIn } from "../types/types"
import { useAppDispatch } from "../redux/hooks/default.js"
import { setUserInfoOnSignIn } from "../redux/slices/userSlice.js"
import { redirect } from "react-router"

export default function SignIn({ setToggleSignIn }:tSetToggleSignIn) {
  const dispatch = useAppDispatch()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  function handleFormSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(!emailRef.current?.value || !passwordRef.current?.value) return

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    console.log('Sending')
    formSubmit(data)
    emailRef.current.value = ""
    passwordRef.current.value = ""
  }

  async function formSubmit(o:tSignIn) {

    try {
      const response = await fetch("http://localhost:5000/api/users/signin", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(o)
      })

      if(response.ok) {
        const data = await response.json()
        dispatch(setUserInfoOnSignIn(data))
        redirect("/sign-in")
      }
      
    }
    catch(error) {
      console.log("Failed to sign-in.")
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-semibold">Sign-in</h1>

      <form className="flex flex-col gap-5 px-3 py-3" onSubmit={handleFormSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input className="indent-1 border border-slate-800 rounded-sm" ref={emailRef} type="email" id="email" name="email" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Password</label>
          <input className="indent-1 border border-slate-800 rounded-sm" ref={passwordRef} type="password" id="password" name="password" />
        </div>
        
        <button className="formButton" type="submit">Submit</button>
      </form>

      <GoogleSignInButton />

      <p className="text-center">Don't have an account?
        <button className="font-semibold indent-1 text-sky-300 hover:text-sky-400 hover:cursor-pointer" onClick={() => setToggleSignIn(prev => !prev) }>Sign-up</button>
      </p>
    </div>
  )
}     