import {html, render} from 'lit-html';
import { Example } from './protos/example_pb'

const data = new URLSearchParams(document.location.search).get('data') as any;
if(!data) throw "No data from URL"


const example = Example.deserializeBinary(data);


document.querySelector('pre').innerText = JSON.stringify(example.toObject(), null, 2);
