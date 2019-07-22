
import {Calculator} from './pb/gen/ts/calculator_pb_service'
import { PeerRPCServer, PeerRPCClient } from './peerRPC';
import { MoveEvent } from './pb/gen/ts/demo_pb';

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: 
      Base[Key] extends Condition ? Key : never
};
type AllowedNames<Base, Condition> = 
      FilterFlags<Base, Condition>[keyof Base];

type SubType<Base, Condition> = 
      Pick<Base, AllowedNames<Base, Condition>>;


type Service = {
  readonly requestType: any;
  readonly responseType: any;
}

type Implementation<S> = {
  readonly [P in keyof S]?: 
    S[P] extends Service ? (
      request: InstanceType<S[P]["requestType"]>,
      response: InstanceType<S[P]["responseType"]>
    ) => void | Promise<void> : never;
}

/** Gives the methods of a service */
type Methods<S> = {
  [P in keyof SubType<S, Service>]: {
    request: S[P] extends Service ? InstanceType<S[P]["requestType"]> : never;
    response: S[P] extends Service ? InstanceType<S[P]["responseType"]> : never;
  }
}

// type testing = Methods<typeof DemoService>

export class PeerServiceServer<S> extends PeerRPCServer {
  constructor(room: string, service: S, impl: Implementation<S>) {
    super(room, (meta, payload) => {

      

      const name = meta.fnName
      const handle = impl[name];

      if(handle) {
        // console.log("handline", meta)
        // handle
        const Request = service[name].requestType
        const Response = service[name].responseType

        const request = Request.deserializeBinary(payload)
        const response = new Response()


        return Promise.resolve(handle(request, response))
          .then(() => response.serializeBinary())


      }


      return new Uint8Array([]);
    })
  }
}


export class PeerServiceClient<S> extends PeerRPCClient {

  constructor(room: string, private readonly service: S) {
    super(room);
  }

  async issue<T extends keyof Methods<S>>(name: T,  setter: (p: Methods<S>[T]['request']) => void | Promise<void>): Promise<Methods<S>[T]['response']> {

    // const m = new MoveEvent()
    // m.serializeBinary()

    // MoveEvent.deserializeBinary

    // @ts-ignore
    const Request = this.service[name].requestType

    const request = new Request();

    await setter(request);
    
    const responseData = await super.call(name as string, request.serializeBinary());

    // @ts-ignore
    return new this.service[name].responseType.deserializeBinary(responseData);
  }

}

