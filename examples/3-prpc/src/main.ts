import host from "./host";
import join from "./join"

const params = new URLSearchParams(document.location.search)

// ?join=foo
if(params.has("join"))
  join(params.get("join"))

// ?host=foo
else if(params.has("host")) 
  host(params.get("host"))
