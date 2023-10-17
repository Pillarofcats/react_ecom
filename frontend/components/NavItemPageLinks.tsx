import { Link } from "react-router-dom"

export default function NavItemPageLinks() {
  return (
    <ul className="flex items-center gap-5">
      <li>{ <Link to={"/account"} >Account</Link> }</li>
      <li>{ <Link to={"/sign-in"} >Sign-in</Link> }</li>
    </ul>
  )
}