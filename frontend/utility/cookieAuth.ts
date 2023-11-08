export default function cookieAuth(){
  const regex = new RegExp(`(^| )3b_uid=([^;]+)`)
  const match = document.cookie.match(regex)
  console.log("Cookies before", document.cookie)
  if (!match) return false
  console.log("found cookie")
  return true
}