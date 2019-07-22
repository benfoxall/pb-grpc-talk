OUT='generated'
mkdir -p $OUT
rm -f $OUT/*.ts $OUT/*.js

# grpc-web first (clashes with ts_out)
protoc -I=. *.proto \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${OUT}

protoc -I=. *.proto \
  --plugin=protoc-gen-ts=`which protoc-gen-ts` \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
  --js_out=import_style=commonjs,binary:$OUT \
  --grpc_out=${OUT} \
  --ts_out=service=true:${OUT} \
