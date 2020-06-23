// package: 
// file: example.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class Horse extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getLikescarrots(): boolean;
    setLikescarrots(value: boolean): void;

    getHeight(): number;
    setHeight(value: number): void;

    getAvatar(): Uint8Array | string;
    getAvatar_asU8(): Uint8Array;
    getAvatar_asB64(): string;
    setAvatar(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Horse.AsObject;
    static toObject(includeInstance: boolean, msg: Horse): Horse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Horse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Horse;
    static deserializeBinaryFromReader(message: Horse, reader: jspb.BinaryReader): Horse;
}

export namespace Horse {
    export type AsObject = {
        name: string,
        likescarrots: boolean,
        height: number,
        avatar: Uint8Array | string,
    }
}
