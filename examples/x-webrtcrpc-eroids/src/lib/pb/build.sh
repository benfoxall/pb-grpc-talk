
TS_PROTOC=`which protoc-gen-ts`

INPUT=*.proto
OUT=gen

mkdir -p $OUT/ts
mkdir -p $OUT/grpc-web

# --plugin="protoc-gen-ts=${TS_PROTOC}" \
# --grpc-web_out=import_style=typescript,mode=grpcwebtext:. \

protoc -I=. $INPUT \
  --plugin="protoc-gen-ts=${TS_PROTOC}" \
  --js_out=import_style=commonjs,binary:$OUT/ts \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${OUT}/grpc-web \
  --ts_out=service=true:${OUT}/ts \
