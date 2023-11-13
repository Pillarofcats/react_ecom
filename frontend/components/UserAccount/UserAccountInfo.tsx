import React, { useRef, useState } from "react"
import { tUserInfo } from "../../types/types"
import { useAppSelector, useAppDispatch } from "../../redux/hooks/default"
import { setUserInfoOnSignIn } from "../../redux/slices/userSlice"

export default function UserAccountInfo() {

  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const usernameRef = useRef<HTMLInputElement>(null)
  // const emailRef = useRef<HTMLInputElement>(null)
  const firstnameRef = useRef<HTMLInputElement>(null)
  const lastnameRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const birthdayRef = useRef<HTMLInputElement>(null)
  const [changedBirthday, setChangedBirthday] = useState(false)

  function handleFormSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(!user.user?.u_id) return

    const data:tUserInfo = {}

    data.u_id = user.user?.u_id

    if(usernameRef.current?.value) {
      data.username = usernameRef.current.value
      usernameRef.current.value = ""
    }
    // if(emailRef.current?.value) {
    //   data.email = emailRef.current.value
    //   emailRef.current.value = ""
    // }
    if(firstnameRef.current?.value) {
      data.firstname = firstnameRef.current.value
      firstnameRef.current.value = ""
    }
    if(lastnameRef.current?.value) {
      data.lastname = lastnameRef.current.value
      lastnameRef.current.value = ""
    }
    if(addressRef.current?.value) {
      data.address = addressRef.current.value 
      addressRef.current.value = ""
    }
    if(phoneRef.current?.value) {
      data.phone = phoneRef.current.value
      phoneRef.current.value = ""
    }
    if(birthdayRef.current?.value && changedBirthday) {
      data.birthday = birthdayRef.current.value
      setChangedBirthday(false)
    }

    setChangedBirthday(false)
    
    if(Object.keys(data).length === 1) return

    formSubmit(data)
  }

  async function formSubmit(data:tUserInfo) {
    //"https://backend-production-e988.up.railway.app/api/userinfo/updateuser"
    const response = await fetch("http://localhost:5000/api/userinfo/updateuser", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    const d = await response.json()
    dispatch(setUserInfoOnSignIn(d))
  }

  return (
      <div className="flex flex-col items-center p-2 flex-1 w-full md:w-[75%] lg:w-[fit]">
        <h1 className="text-center text-3xl font-semibold">User Account</h1>

        <form onSubmit={ handleFormSubmit } className="flex flex-col gap-5 w-[70%]">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input className="formInput" ref={ usernameRef } type="text" name="username" id="username" placeholder={user.user?.username}/>
          </div>

          {/* <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input className="formInput" ref={ emailRef } type="email" name="email" id="email"  placeholder={user.user?.email}/>
          </div> */}
          
          <div className="flex flex-col">
            <label htmlFor="firstname">First name</label>
            <input className="formInput" ref={ firstnameRef } type="text" name="firstname" id="firstname"  placeholder={user.user?.firstname}/>
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastname">Last name</label>
            <input className="formInput" ref={ lastnameRef } type="text" name="lastname" id="lastname"  placeholder={user.user?.lastname}/>
          </div>

          <div className="flex flex-col">
            <label htmlFor="address">Address</label>
            <input className="formInput" ref={ addressRef } type="text" name="address" id="address"  placeholder={user.user?.address}/>
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone">Phone</label>
            <input className="formInput" ref={ phoneRef } type="tel" name="phone" id="phone"  placeholder={user.user?.phone || "123-456-7890"} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
          </div>

          <div className="flex flex-col">
            <label  htmlFor="birthday">Birthday</label>
            <input className={`formInput ${ changedBirthday ? "text-black" : "text-gray-400" }`} onChange={() => setChangedBirthday(true)} ref={ birthdayRef } type="date" name="birthday" id="birthday" defaultValue={ user.user?.birthday }/>
          </div>

          <button className="formButton" type="submit">Update</button>
        </form>
      </div>
  )
}
