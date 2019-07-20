
import {Calculator} from './pb/gen/ts/calculator_pb_service'

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

class HackServer<S> {
  constructor(service: S, impl: Implementation<S>) {}

  listen(room: string) {}
}

class HackClient<S> {

  constructor(service: S, room: string) {

  }

  call<T extends keyof Methods<S>>(name: T,  setter: (p: Methods<S>[T]['request']) => void | Promise<void>): Promise<Methods<S>[T]['response']> {

    console.log("calling", name);

    return Promise.reject(null);
  }
}


const client = new HackClient(Calculator, "1234");

client
  .call("Add", (request) => {
    request.setNumber1(12)
    request.setNumber1(22)
  })
  .then(r => {
    r.getAnswer()
  })

const server = new HackServer(Calculator, {
  Add: (request, response) => {
    response.setAnswer(
      request.getNumber1() + 
      request.getNumber2()
    )
  }
});

server.listen("234")
