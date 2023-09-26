
const obj = {width:10,height:20}
type t = typeof obj
const area = obj.width *obj.height

let a = 4

interface Backpack<T>{
    add:(obj:T)=>void
    get:()=>T
}
// 申明一个类型为Backpack的静态变量backpack
  const backpack:Backpack<string> = {
    get(){
        console.log('get')
        return 'get'
    },
     add(t:string){
        console.log(t)
     }
 }
 const s = backpack.get()
backpack.add('add')
console.log(s)

type b = typeof backpack
