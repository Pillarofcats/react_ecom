import React, { useRef, useState } from "react"
import { tUserAccount } from "../../backend/types/types"

export default function UserAccount() {

  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const firstnameRef = useRef<HTMLInputElement>(null)
  const lastnameRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const [birthday, setBirthday] = useState<string | number | readonly string[] | undefined>("2018-07-22")
  const [changedBirthday, setChangedBirthday] = useState(false)

  function handleFormSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data:tUserAccount = {}

    if(usernameRef.current?.value) data.username = usernameRef.current.value
    if(emailRef.current?.value) data.email = emailRef.current.value
    if(firstnameRef.current?.value) data.firstname = firstnameRef.current.value
    if(lastnameRef.current?.value) data.lastname = lastnameRef.current.value
    if(addressRef.current?.value) data.address = addressRef.current.value
    if(phoneRef.current?.value) data.phone = phoneRef.current.value
    if(changedBirthday && birthday) data.birthday = birthday as string

    if(Object.keys(data).length === 0) return

    formSubmit(data)
  }

  async function formSubmit(data:tUserAccount) {
    console.log("data:", data)
  }

  function handleChangeBirthday(e:React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setChangedBirthday(true)
    setBirthday(e.target.value)
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-semibold">User Account</h1>

      <form onSubmit={ handleFormSubmit } className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input className="formInput" ref={ usernameRef } type="text" name="username" id="username" placeholder="username"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input className="formInput" ref={ emailRef } type="email" name="email" id="email"  placeholder="email"/>
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="firstname">First name</label>
          <input className="formInput" ref={ firstnameRef } type="text" name="firstname" id="firstname"  placeholder="firstname"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastname">Last name</label>
          <input className="formInput" ref={ lastnameRef } type="text" name="lastname" id="lastname"  placeholder="lastname"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="address">Address</label>
          <input className="formInput" ref={ addressRef } type="text" name="address" id="address"  placeholder="address"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone">Phone</label>
          <input className="formInput" ref={ phoneRef } type="tel" name="phone" id="phone"  placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
        </div>

        <div className="flex flex-col">
          <label  htmlFor="birthday">Birthday</label>
          <input className={`formInput ${ changedBirthday ? "text-black" : "text-gray-400" }`} onChange={ handleChangeBirthday } type="date" name="birthday" id="birthday" value={ birthday }/>
        </div>

        <button className="formButton" type="submit">Update account</button>
      </form>
    </div>
  )
}
