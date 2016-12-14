import { Injectable } from '@angular/core'



@Injectable()
export class LoginAction {
  constructor() {}

  /**
   * My goal is to decorate these functions so that upon call, we can store
   * the arguments passed to it,
   * and then we can replay the function calls over again in the future for
   * extremely easy testing set up.
   */
  // @Recordable("Prompted Login") // this can also a very fun way to do logging for bug reports.
  @logMethod
  promptLogin() { console.log("Prompted Login") }

  /**
   * Can we use decorators to simplify our A/B testing strategies?
   */
  // @Recordable("Prompted Logout") // this can also a very fun way to do logging for bug reports.
  promptLogout() {}
}

/*
// following https://gist.github.com/remojansen/16c661a7afd68e22ac6e#file-method_decorator-ts
function Recordable () {
  function ActionDecoratorFactory(...args): (cls: any) => any {
    if (!(Reflect && Reflect.getOwnMetadata)) {
      throw 'reflect-metadata shim is required when using class decorators'
    }

    if (this instanceof ActionDecoratorFactory) {
      metaCtor.apply(this, args)
      return this
    }
  }

  ActionDecoratorFactory.prototype.toString = () => `@${name}`
  return ActionDecoratorFactory
}
*/
function logMethod (target, key, descriptor) {

    // save a reference to the original method this way we keep the values currently in the
    // descriptor and don't overwrite what another decorator might have done to the descriptor.
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key)
    }
    const originalMethod = descriptor.value

    // editing the descriptor/value parameter
    descriptor.value = function () {
        let args = Array.prototype.slice.call(arguments, 0)
        let a = args.map(aa => JSON.stringify(aa)).join()
        // note usage of originalMethod here
        let result = originalMethod.apply(this, args)
        let r = JSON.stringify(result)
        console.log("Call: " + key + "(" + a + ") => " + r)
        return result
    }

    // return edited descriptor as opposed to overwriting the descriptor
    return descriptor
}
