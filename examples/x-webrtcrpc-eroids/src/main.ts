import host from "./host.js";
import join from "./join.js"

const params = new URLSearchParams(document.location.search)

// ?join=foo
if(params.has("join"))
  join(params.get("join"))

// ?host=foo
else if(params.has("host")) 
  host(params.get("host"))
