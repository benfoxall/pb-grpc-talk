
OUT='dist'
rm -f $OUT/**/*.ts $OUT/**/*.js


# grpc_tools_node_protoc -

# -js_out=import_style=commonjs,binary:../node/static_codegen/ 


# --grpc_out=../node/static_codegen 

# --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` helloworld.proto


mkdir -p $OUT/ts
mkdir -p $OUT/grpc
mkdir -p $OUT/grpc-web

protoc -I=. *.proto \
  --plugin=protoc-gen-ts=`which protoc-gen-ts` \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
  --js_out=import_style=commonjs,binary:$OUT/ts \
  --grpc_out=${OUT}/ts \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${OUT}/ts

  # --ts_out=service=true:${OUT}/ts \
