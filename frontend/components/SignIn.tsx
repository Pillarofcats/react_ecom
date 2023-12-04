import React, { useRef, useState } from "react";
// import GoogleSignInButton from "../components/GoogleSignInButton"
import { tServerMessage } from "../types/types";
import ServerResponse from "./ServerResponse.js";
import { tSignIn, tSetToggleSignIn } from "../types/types";
import { useAppDispatch } from "../redux/hooks/default.js";
import { setUserInfoOnSignIn } from "../redux/slices/userSlice.js";
import { redirect } from "react-router";

export default function SignIn({ setToggleSignIn }: tSetToggleSignIn) {
  const dispatch = useAppDispatch();

  const [serverMessage, setServerMessage] = useState<tServerMessage>([
    "err",
    "",
  ]);
  const [isServerMessage, setIsServerMessage] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!emailRef.current?.value || !passwordRef.current?.value) return;

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    formSubmit(data);
  }

  async function formSubmit(o: tSignIn) {
    try {
      const response = await fetch(
        "https://backend-production-e988.up.railway.app/api/users/signin",
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(o),
        }
      );

      const data = await response.json();

      if (data.message) {
        setServerMessage([data.status, data.message]);
        setIsServerMessage(true);
      }

      if (response.ok) {
        if (emailRef.current && passwordRef.current) {
          emailRef.current.value = "";
          passwordRef.current.value = "";
        }
        dispatch(setUserInfoOnSignIn(data.data));
        redirect("/sign-in");
      }
    } catch (error) {
      console.log("Failed to sign-in.");
    }
  }

  return (
    <div className="flex flex-col gap-5 p-10 border shadow-md rounded-sm overflow-hidden">
      <h1 className="text-center text-3xl font-semibold">Sign-in</h1>

      <form
        className="flex flex-col gap-5 px-3 py-3"
        onSubmit={handleFormSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="indent-1 border border-slate-800 rounded-sm"
            ref={emailRef}
            type="email"
            id="email"
            name="email"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Password</label>
          <input
            className="indent-1 border border-slate-800 rounded-sm"
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
          />
        </div>

        <ServerResponse
          isServerMessage={isServerMessage}
          setIsServerMessage={setIsServerMessage}
          serverMessage={serverMessage[1]}
          serverMessageStatus={serverMessage[0]}
        />

        <button
          className="formButton"
          type="submit">
          Submit
        </button>
      </form>

      {/* <GoogleSignInButton /> */}

      <p className="text-center">
        Don't have an account?
        <button
          className="font-semibold indent-1 text-sky-300 hover:text-sky-400 hover:cursor-pointer"
          onClick={() => setToggleSignIn((prev) => !prev)}>
          Sign-up
        </button>
      </p>
    </div>
  );
}
