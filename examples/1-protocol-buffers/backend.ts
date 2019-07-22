import { Example } from './protos/example_pb'

const example = new Example()

example.setName("Some stuff here…………")

const data = example.serializeBinary()

// Print to console
const buffer = Buffer.from(data)
console.log('\x1Bc');
console.log("Buffer: ", buffer)
console.log("URL   : http://localhost:1234?data=" + buffer.toString("base64"))