import { Link } from "react-router-dom"

export default function NavItemPageLinks() {
  
  return (
    <div className="flex flex-col md:flex-row md:h-8 self-center min-w-fit gap-5 pt-[3px]">
      <Link to={"/account"}>Account</Link>
      <Link to={"/sign-in"}>Sign-in</Link>
    </div>
  )
}