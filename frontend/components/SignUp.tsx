import React, { useRef, useEffect } from "react"
import { tSignUp, tSetToggleSignIn } from "../types/types"

export default function SignUp({ setToggleSignIn }:tSetToggleSignIn) {

  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  function handleFormSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(!usernameRef.current?.value ||!emailRef.current?.value || !passwordRef.current?.value) return

    const data = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    console.log('Sending')
    formSubmit(data)
    usernameRef.current.value = ""
    emailRef.current.value = ""
    passwordRef.current.value = ""
  }

  async function formSubmit(o:tSignUp) {
    
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(o)
      })

      if(response.ok) {
        timeoutRef.current = setTimeout(() => {
          setToggleSignIn((prev) => !prev)
        }, 1200)
      }
    
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    clearTimeout(timeoutRef.current as NodeJS.Timeout)
  }, [])

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-semibold">Sign-up</h1>

      <form className="flex flex-col gap-5 px-3 py-3" onSubmit={handleFormSubmit}>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input className="indent-1 border border-slate-800 rounded-sm" ref={usernameRef} type="text" id="username" name="username" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="registerEmail">Email</label>
          <input className="indent-1 border border-slate-800 rounded-sm" ref={emailRef} type="email" id="registerEmail" name="registerEmail" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="registerPassword">Password</label>
          <input className="indent-1 border border-slate-800 rounded-sm" ref={passwordRef} type="password" id="registerPassword" name="registerPassword" />
        </div>
        
        <button className="formButton" type="submit">Submit</button>
      </form>

      <p className="text-center">Already have an account? 
        <button className="font-semibold indent-1 text-sky-300 hover:text-sky-400 hover:cursor-pointer" onClick={() => setToggleSignIn(prev => !prev) }> Sign-in</button>
      </p>
    </div>
  )
}