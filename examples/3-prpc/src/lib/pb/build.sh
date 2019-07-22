
# So weird - ts-protoc-gen & grpc_tools_node_protoc_ts output same bin
TS_PROTOC=../../../../../node_modules/ts-protoc-gen/bin/protoc-gen-ts

INPUT=*.proto
OUT=gen

rm -rf $OUT/**/*.js
rm -rf $OUT/**/*.ts

mkdir -p $OUT/ts
# mkdir -p $OUT/grpc-web

# --plugin="protoc-gen-ts=${TS_PROTOC}" \
# --grpc-web_out=import_style=typescript,mode=grpcwebtext:. \

protoc -I=. $INPUT \
  --plugin="protoc-gen-ts=${TS_PROTOC}" \
  --js_out=import_style=commonjs,binary:$OUT/ts \
  --ts_out=service=true:${OUT}/ts \

# --grpc-web_out=import_style=typescript,mode=grpcwebtext:${OUT}/grpc-web \
