class Component {
    constructor (public name: string) {}
}

// 定义迭代器的返回类型
interface IteratorResult<T> {
    done: boolean;
    value: T;
}

// 定义迭代器的方法
interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

// Frame实现迭代器
class Frame implements Iterator<Component>{
    private pointer = 0

    constructor(public name: string, public components : Component[]) {

    }

    public next(value?: any): IteratorResult<Component> {
        if(this.pointer< this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            }
        } else {
            return {
                done: true,
                value: null
            }
        }

    }
}
