export default function cookieAuth(){
  const regex = new RegExp(`(^| )3b_uid=([^;]+)`)
  const match = document.cookie.match(regex)
  if (!match) return false
  return true
}