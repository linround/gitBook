// 属性联合
type Combined = { a: number } & { b: string };
// 例如
const t:Combined = {
    a:0,
    b:'9'
}


type Conflicting = { a: number } & { a: string };
const o: Conflicting = {
    a:'',
    a:9
}
