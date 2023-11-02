export default function cookieAuth(){
  const regex = new RegExp(`(^| )3b_uid=([^;]+)`)
  console.log("cookies", document.cookie)
  const match = document.cookie.match(regex)
  console.log("Cookie Matched?", match)
  if (!match) return false
  console.log("Cookie passed!")
  return true
}