
TS_PROTOC=`which protoc-gen-ts`

protoc -I=. peer-rpc.proto \
  --plugin="protoc-gen-ts=${TS_PROTOC}" \
  --js_out=import_style=commonjs,binary:. \
  --ts_out=. \
