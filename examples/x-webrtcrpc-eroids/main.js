import host from "./lib/host.js"
import join from "./lib/join.js"

const params = new URLSearchParams(document.location.search)

if(params.has("join"))
  join(params.get("join"))

else if(params.has("host")) 
  host(params.get("host"))


