// package: 
// file: example.proto

import * as jspb from "google-protobuf";

export class Example extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getChecked(): boolean;
  setChecked(value: boolean): void;

  clearValuesList(): void;
  getValuesList(): Array<string>;
  setValuesList(value: Array<string>): void;
  addValues(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Example.AsObject;
  static toObject(includeInstance: boolean, msg: Example): Example.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Example, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Example;
  static deserializeBinaryFromReader(message: Example, reader: jspb.BinaryReader): Example;
}

export namespace Example {
  export type AsObject = {
    name: string,
    checked: boolean,
    valuesList: Array<string>,
  }
}
