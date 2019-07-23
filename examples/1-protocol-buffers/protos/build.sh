TS_PROTOC=../../../node_modules/grpc_tools_node_protoc_ts/bin/protoc-gen-ts

rm -f *.ts *.js

protoc -I=. *.proto \
  --js_out=import_style=commonjs,binary:. \
  --plugin=protoc-gen-ts=$TS_PROTOC \
  --ts_out=. \
