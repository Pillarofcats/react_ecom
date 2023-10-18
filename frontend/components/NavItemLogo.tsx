import { Link } from "react-router-dom"

export default function NavItemLogo() {

  return (
    <Link className="flex gap-2 h-8 self-center min-w-fit" to={`/products?page=1&type=all`}>
      <img className="rounded-lg h-8" src="/logo.png" alt="logo" />
      <h1 className="self-center text-xl font-bold tracking-wider">TRIBUY</h1>
    </Link>
  )
}