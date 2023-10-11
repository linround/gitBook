var x = 10;
var y = 2;
var v = x * y;
var B;
(function (B) {
    B[B["a"] = 0] = "a";
    B[B["b"] = 1] = "b";
    B[B["c"] = 2] = "c";
    B[B["d"] = x * y] = "d";
})(B || (B = {}));
// 使用 const 定义的枚举类型，在取值是会直接获取该值
var m = A.d;
console.log(m);
