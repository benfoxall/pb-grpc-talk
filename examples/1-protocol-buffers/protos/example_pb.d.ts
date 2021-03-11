// package: 
// file: example.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class Weather extends jspb.Message { 
    getPlacename(): string;
    setPlacename(value: string): void;

    getCloudy(): boolean;
    setCloudy(value: boolean): void;

    getTemprature(): number;
    setTemprature(value: number): void;

    getWindSpeed(): number;
    setWindSpeed(value: number): void;

    getWindDirection(): number;
    setWindDirection(value: number): void;

    getPhoto(): Uint8Array | string;
    getPhoto_asU8(): Uint8Array;
    getPhoto_asB64(): string;
    setPhoto(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Weather.AsObject;
    static toObject(includeInstance: boolean, msg: Weather): Weather.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Weather, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Weather;
    static deserializeBinaryFromReader(message: Weather, reader: jspb.BinaryReader): Weather;
}

export namespace Weather {
    export type AsObject = {
        placename: string,
        cloudy: boolean,
        temprature: number,
        windSpeed: number,
        windDirection: number,
        photo: Uint8Array | string,
    }
}
