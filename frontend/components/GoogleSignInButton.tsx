export default function GoogleSignInButton() {

  function externalNavigate(url:string){
    window.location.href = url
  }

  async function googleAuth() {
    const response = await fetch("http://localhost:5000/api/oauth/google/request", {
    method: "POST"})
    const data = await response.json()
    console.log("GOOGLE DATA", data)
    console.log("GOOGLE URL", data.url)
    externalNavigate(data.url)
  } 

  return (
    <button className="formButton" onClick={() => googleAuth() }>Google oAuth</button>
  )
}
