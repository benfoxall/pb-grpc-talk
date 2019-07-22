
rm -f *.ts *.js

protoc -I=. *.proto \
  --js_out=import_style=commonjs,binary:. \
  --plugin=protoc-gen-ts=`which protoc-gen-ts` \
  --ts_out=. \
