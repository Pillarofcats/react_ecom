import React, { useRef } from "react"
import { tSignIn, tSetToggleSignIn } from "../../backend/types/types.js"


export default function SignIn({ setToggleSignIn }:tSetToggleSignIn) {

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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(o)
      })

      const data = await response.json()
      console.log("Login", data)
    }
    catch(error) {
      console.log(error)
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

      <p className="text-center">Don't have an account? 
        <a className="text-orange-300 hover:text-orange-400 hover:cursor-pointer" onClick={() => setToggleSignIn(prev => !prev) }> Sign-up</a>
      </p>
    </div>
  )
}     