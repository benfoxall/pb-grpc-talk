// package: 
// file: calculator.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class AddRequest extends jspb.Message { 
    clearNumbersList(): void;
    getNumbersList(): Array<number>;
    setNumbersList(value: Array<number>): void;
    addNumbers(value: number, index?: number): number;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddRequest): AddRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddRequest;
    static deserializeBinaryFromReader(message: AddRequest, reader: jspb.BinaryReader): AddRequest;
}

export namespace AddRequest {
    export type AsObject = {
        numbersList: Array<number>,
    }
}

export class AddResult extends jspb.Message { 
    getResult(): number;
    setResult(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddResult.AsObject;
    static toObject(includeInstance: boolean, msg: AddResult): AddResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddResult;
    static deserializeBinaryFromReader(message: AddResult, reader: jspb.BinaryReader): AddResult;
}

export namespace AddResult {
    export type AsObject = {
        result: number,
    }
}

export class GraphRequest extends jspb.Message { 
    getEquation(): string;
    setEquation(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GraphRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GraphRequest): GraphRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GraphRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GraphRequest;
    static deserializeBinaryFromReader(message: GraphRequest, reader: jspb.BinaryReader): GraphRequest;
}

export namespace GraphRequest {
    export type AsObject = {
        equation: string,
    }
}

export class GraphResult extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    clearPointsList(): void;
    getPointsList(): Array<number>;
    setPointsList(value: Array<number>): void;
    addPoints(value: number, index?: number): number;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GraphResult.AsObject;
    static toObject(includeInstance: boolean, msg: GraphResult): GraphResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GraphResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GraphResult;
    static deserializeBinaryFromReader(message: GraphResult, reader: jspb.BinaryReader): GraphResult;
}

export namespace GraphResult {
    export type AsObject = {
        success: boolean,
        pointsList: Array<number>,
    }
}
