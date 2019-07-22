Getting set up

```bash

brew install protobuf

curl -L https://github.com/grpc/grpc-web/releases/download/1.0.5/protoc-gen-grpc-web-1.0.5-darwin-x86_64 > /usr/local/bin/protoc-gen-grpc-web
chmod +x /usr/local/bin/protoc-gen-grpc-web

npm install -g ts-protoc-gen



npm install -g grpc-tools


curl -L https://github.com/improbable-eng/grpc-web/releases/download/v0.9.6/grpcwebproxy-v0.9.6-osx-x86_64.zip > grpcwebproxy.zip

unzip grpcwebproxy.zip

mv dist/grpcwebproxy-v0.9.6-osx-x86_64 /usr/local/bin/grpcwebproxy






grpcwebproxy \
    --backend_addr=localhost:9090 \
    --run_tls_server=false
    
```