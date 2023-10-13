let xqw = (a: number) => 0;
let yqw = (b: number, s: string) => 0;
yqw= xqw; // OK 这里忽略了yqw额外的参数
xqw = yqw; // Error xqw中是没有参数的，所以不能传递多余的进入

let mm = {name:''}
let nn = {name:'',age:9}
mm=nn // 忽略了多余的
nn= mm // mm中不满足 nn的需要