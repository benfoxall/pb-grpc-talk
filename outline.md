An alternative to JSON & REST

We'll explore protobuffers & gRPC as an option for serving content to your front-end code.  We'll dive into some of the technical features and tooling, as well as chatting through higher-level ideas that will help us choose a backend approach to best fit a project.

If I find time to put together some hacks before this talk - then we'll check out those as well!

---

# This is not new

Protocol buffers and grpc have been around for some time,  though it seems more part of a backend microservice architecture. What I'm wanting to talk about today is how we could bring some of this to the frontend.

---


```json
{
  "uuid": "abcde-f1234-09876-234-1234",
  "timestamp": 12345552,
  "author": "ben",
  "message": "⚡️",
  "items": [12, 34, 12, 45, 123, 421],
  "bool: true
}
```


So, JSON! This was "discovered" around 2001, by the JavaScript explorer Douglas Crockford.  So, on this project - they were trying to work out how to transfer data from a backend, and they were like "how about we use the javascript object notation?", and someone else was like "but what do we call it?"



[JSON] - the origin of json.
[json example] - this is what it looks like
[server -> json -> server] - and this is how we use it, we send it from one place to another, maybe it's server to server, maybe it's server to browser.
…let's say that we want to improve the performance of this in two ways (1) space efficiency (we might be sending a lot, or sending over a restricted bandwidth) (2) type safety - what happens if we make a mistake on the code here and start sending massage by accident.

Step 1 - we encode the things that aren't text, better.
Step 2 - we add a shared typing (let's call it "message.type")
Step 3 - we can remove the keys because of this shared type

What we have here is something cool - it's way more efficient over the wire, has a much more rigid structure, and we could even do tricks that allow us to read this more efficiently from a buffer (you wouldn't have to read the whole object).

So, this is what protobuffers are!  You write a .proto file that defines your object type.  You then run this tool that generates code that can ouput and parse the message data.

[how the code feels]
When you're using the stub - it feels like a regular class. You can inspect the methods of it, get/set stuff.  You can extend it if you're wanting 

[demo - create an object in node,  read it into the browser]

 
# Overview:

- JSON!
- …Let's have make JSON better
- Introducing Protocol Buffers
	- end-to-end example of replacing json
		- .proto source files
		- protoc generator
		- importing stub classes
		- generting a buffer
	- more stuff about PBs
		- stubs for different languages
			- node js guy example
		- more about the .proto format
			- optional/repeated
			- forward compatibility – adding "= x"
		- more about the serialised format
			- explain every byte of our message
- General use cases
	- more efficient things
	- more structured things
	- inter language comms
		- nodejs thing

- REST!
- …Let's make REST better
	- Let's use our protobuffers to share an object definition
	- though how do you know what response you get to each call
	- Getting rid of the layer between them – "how about we get rid of this completly"
    - (or), now that we know what the response is - we can make our stubs amazing.  … We've just invented RPC
    - since we've ignored the api layer, we can implement new things like streaming requests/responses
– How about we use the RPC model instead?




Extra things I want to get in:
- Why is the web obsessed with rest
	- because the web was designed as being a resource
	- because we're used to json
		- optimal parsing
		- 


- flat buffers
	- similiar to protocol buffers, but faster read & lookup



```ts
const calculator = new Calculator();

const two = await calculator.add(1,1)

const eight = 

```


- Introducing gRPC!
	- end-to-end example of replacing rest
	- updating out .proto
		- 
- RPC - remote procedure call


	- Streaming reads
	- Streaming writes
	- 






# Links

* http://seriot.ch/parsing_json.php – parsing json sucks
* 