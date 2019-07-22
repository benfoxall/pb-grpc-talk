# [fit] Any Questions?

---

# Hi,
# [fit] I'm Ben

# (It's nice to be back)

^ I helped start this Meetup,  which gives me a really unique perspecive giving a talk here.  And from that perspective, one thing I feel really strongly is…

---

# [fit] Seren 
# [fit] & Marcus

# You're doing such a great job 🥰

^ I got a message a couple of months ago asking if I was up for this date, and it almost brought a tear to my eye

---

# 2016 Wrap Up

---

# An Update on the World Of Ben

---

# 2017

# 🎨 Random stuff
# 💸 Investment banking

# 2018

# 🤖 Robot cars
# 🇳🇿New Zealand

[replace with calendar]

---

![left](images/ryan.jpg)

# Burger with Ryan

---

# New Zealand

![](images/nz-00.jpg)

---

![](images/nz-0.jpg)

---

![](images/nz-1.jpg)

---

![left](images/nz-2.jpg)
![right](images/nz-3.jpg)

---

![](images/nz-4.jpg)

---

![](images/nz-5.jpg)


---

![](images/nz-map.png)

---


![](images/nz-6.jpg)

---

![](images/nz-7.jpg)

---

# Australia

---

# Vietnam

---

# Oxford

---

# Oxbotica

^ new project, new office

---

[what I'm working on]


---

# Find out more
## → oxbotica.com

---

![fit original](images/oxb-1.png)

<!-- ---

![fit original](images/oxb-2.png) -->

---

![fit original](images/oxb-3.png)

---

![fit original](images/oxb-4.png)

---

# ~~Hello~~
# Talk Intro

---

# Protocol Buffers & gRPC

# - Not New or Trendy

^ https://trends.google.com/trends/explore?date=all&q=protocol%20buffers


![inline](images/popularity.png)

---

![](sketch/overview.png)

---

![](sketch/overview+rest.png)

---

![](sketch/overview+target.png)

---

# ~~Talk Intro~~

# 

---

# [fit] Protocol 
# [fit] Buffers
# and JSON

[.background-color: #ffcc00]

<!---

# getting to
# [fit] Protocol Buffers

# from
# [fit] JSON
-->

---

# JSON → Protocol Buffers

---

![](sketch/json-1-init.png)

---

## Store things better-er

# [fit] 1234567890

```
# JSON
000000  31 32 33 34 35 36 37 38 39 30                    1234567890

# Var Int
000000  d2 85 d8 cc 04                                   Ò.ØÌ.
```


[observablehq.com/@benfoxall/var-int-encoding](https://observablehq.com/@benfoxall/var-int-encoding)

---

## Store things better-er

# [fit] true

```
# JSON encoded
000000  74 72 75 65                                      true

# Var Int (1)
000000  01                                               .
```

---
<!--
## Store things better-er

# [fit] 123e4567-e89b-12d3-a456-426655440000

```
# JSON encoded
000000  31 32 33 65 34 35 36 37 2d 65 38 39 62 2d 31 32  123e4567-e89b-12
000010  64 33 2d 61 34 35 36 2d 34 32 36 36 35 35 34 34  d3-a456-42665544
000020  30 30 30 30                                      0000

# Raw bytes
000000  12 3E 45 67 E8 9B 12 D3 A4 56 42 66 55 44 00 00 
000010  B
```

^ TODO - it might be better to to data-uri here

---

-->

![](sketch/json-2-efficient-storage.png)

---

![](sketch/json-3-mistake.png)

---

![](sketch/json-3-mistake.png)

---


![](sketch/json-4-type.png)

---

![](sketch/json-5-type-gen.png)

---

![](sketch/json-6-bonus.png)

---

# [fit] 🎉 We've 🎉 
# [fit] 🎉 Invented 🎉 
# [fit] 🎉 Protocol Buffers 🎉 

---

# 1. Write a `message.proto` 📝
# 2. Generate `message_pb.js` 🤖
# 3. Use `Message` in your code ✨

---

# ⚡️ Demo

[TODO]

---

# The Good stuff
## [fit] Efficient*

---

# The Good stuff
## [fit] Strongly typed
## [fit] messaging

^ The objects that we've dealt with have been simple, but imagine a huge complex changing object

---

# The Good stuff
## [fit] Strongly typed messaging
## [fit] between languages

```bash
protoc *.proto
  --js-out=… 
  --python-out=…
  --c-out=…
```

---

# The Good stuff
## [fit] Strongly typed messaging
## [fit] between languages
## [fit] idiomatically

---

# The Good stuff
## [fit] Avoids Translation

---

# The Good stuff
## [fit] Transport Agnostic

---

# …

---

# …Though…

---

# …Though…
# [fit] it's a massive faff

---

# …Though…
# [fit] TS interfaces
# [fit] will get you far

---

# …Though…
# [fit] JSON is kind
# [fit] of awesome

```ts
// JS Object
const data = [{name: 'item-1', stuff: [5, 3, 2]……}]

// JSON String
const data = JSON.parse("[{name: 'item-1', stuff: [5, 3, 2]……}]")
```

---

# MISSING

WHY IS IT GOOD TO BE USING THIS IN THE BROWSER

---

# [fit] gRPC
# and REST

[.background-color: #ffcc00]

---

# Architectural Models

REST - Resource Oriented
gRPC - Service Oriented

---

# REST - Resource Oriented
## Identifier

```
GET /posts/42/comments/15
```

↑ Relates to a resource

---

# gRPC - Service Oriented
## Identifier

```
CommentService/LoadComment
```

↑ Relates to a service method

---

# Interactions

* Request / Response (REST & gRPC)
* Request / Responses (gRPC)
* Requests / Response (gRPC)
* Requests / Responses (gRPC)

[.build-lists: true]

---

# Transport

REST - HTTP1/HTTP1.1/HTTP2/…
gRPC - HTTP2

---

# Why Only HTTP2

![inline](images/http2.jpg)

slideshare.net/Enbac29/http2-standard-for-video-streaming

^ you wouldn't want a waterfall when calling functions

---

# [fit] Browser Support 

---

# [fit] Browser Support - REST

# [fit] 100%

---

# [fit] Browser Support – gRPC

# [fit] 0%

---

# gRPC-web [^1]


[^1]: [github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md)

---

# Using gRPC-web today

1. Use grpc-web-proxy
2. Use Envoy Proxy
3. Wait for tomorrow

> In the future, we expect gRPC-Web to be supported in language-specific Web frameworks, such as Python, Java, and Node.

---

# The
# Totally
# Cool
# Awesome
# Thing

----

# gRPC interfaces are typed

```bash
# calculator.proto
service Calculator {
  rpc Add (NumberList) returns (Number);
}


# use grpc plugin
protoc calculator.proto
  --plugin=protoc-gen-grpc=grpc-plugin \
  --grpc_out=.
  

# generated ./calculator_grpc_pb.js
```

---

# Demo

```
service Zoom {

    rpc echo(EchoMessage) returns (EchoMessage);

    rpc systemInfo (Noop) returns (stream SystemInfo);
    
    rpc screenShot (Noop) returns (Image);

    rpc setColorScheme (ColorSchemeRequest) returns (Noop);

}
```

---

## Why it's good to bring this to the web

* Components ↔︎ Microservices
* Make IPC a thing – WebAssembly, Workers, etc.
* Avoid siloing

---

## Why it feels weird

* The web *is* REST
* JS has been a single language on a platform
* Obfuscation sucks
* We're used to things being fuzzy
* Accessibility 

^ Hypermedia as the engine of application state

<!--

"A REST API should never have “typed” resources"
https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven

-->

---

# Quick summary

* Protocol Buffers
* gRPC


---

[BACKEND]

---

[NO-BACKEND]

---

# .proto → service → gRPC

# .proto → service → webRTC-RPC

---

[peer] => [peer]

[peerT] => [peerT]

[peerT<S>] => [peerT<S>]

---

# Demo

Zoom Service (Web edition)

---
