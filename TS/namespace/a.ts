export namespace MName {
    export interface A {
        name:string
    }
    class T {}
    const t = 't'
    export class B implements A{
        name = ''
        test(){
            return this.name
        }

    }
}
export const a:MName.A = {
    name:'a'
}