import 'reflect-metadata'
const METHOD_METADATA = 'method';
const PATH_METADATA = 'path';
function mapRoute(instance: Object) {
    const prototype = Object.getPrototypeOf(instance);

    // 筛选出类的 methodName
    const methodsNames = Object.getOwnPropertyNames(prototype)
  return methodsNames.map(methodName => {
      const fn = prototype[methodName];

      // 取出定义的 metadata
      const route = Reflect.getMetadata(PATH_METADATA, fn);
      const method = Reflect.getMetadata(METHOD_METADATA, fn);
    return {
        route,
        method,
        fn,
        methodName
    }
  })
}

const Controller = (path: string): ClassDecorator => {
    return target => {
        Reflect.defineMetadata(PATH_METADATA, path, target);
    }
}

const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
    return (target, key, descriptor) => {
        Reflect.defineMetadata(PATH_METADATA, path, descriptor);
        Reflect.defineMetadata(METHOD_METADATA, method, descriptor);
    }
}

const Get = createMappingDecorator('GET');
const Post = createMappingDecorator('POST');

@Controller('/test')
class SomeClass {
    @Get('/a')
    someGetMethod() {
        return 'hello world';
    }

    @Post('/b')
    somePostMethod() {}
}
Reflect.getMetadata(PATH_METADATA, SomeClass); // '/test'

const v = mapRoute(new SomeClass());
console.log(v)