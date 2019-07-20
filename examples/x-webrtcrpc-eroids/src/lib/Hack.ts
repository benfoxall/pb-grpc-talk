
import {DemoService} from './pb/gen/ts/peer-rpc_pb_service'
import { MathsRequest, MathsResponse, RPCWrapper } from './pb/gen/ts/peer-rpc_pb';

type Service = {
  readonly requestType: any;
  readonly responseType: any;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// type ServiceImpl = Omit<typeof DemoService, "serviceName" | "prototype">;

type ServiceImpl = Omit<typeof DemoService, "serviceName" | "prototype">;

// type xxx = Exclude<typeof DemoService>;


type ServiceImpl2 = {
  readonly [P in keyof ServiceImpl]: 
    (
      request: InstanceType<ServiceImpl[P]["requestType"]>,
      response: InstanceType<ServiceImpl[P]["responseType"]>
    ) => void | Promise<void>
}

/*
readonly requestType: typeof peer_rpc_pb.RPCWrapper;
readonly responseType: typeof peer_rpc_pb.RPCWrapper;
*/


const implementation: ServiceImpl2 = {
  Add: (request, response) => {
    const total = request.getNumber1() + request.getNumber2();
    
    response.setAnswer(total);
  },

  OtherThing: (request, response) => {
  }
}

class HackBackend {
  constructor(room: string, impl) {

  }
}


const test = new HackBackend("234", implementation);