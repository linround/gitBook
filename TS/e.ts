function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
function test(){
    return function (con:Function){

    }
}
@sealed
@test()
class BugReport {
    type = "report";
    title: string;

    constructor(t: string) {
        this.title = t;
    }
}