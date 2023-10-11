// All enum members in 'E1' and 'E2' are constant.

enum E1 {
    X,
    Y,
    Z,
}

enum E2 {
    A = 1,
    B,
    C,
}

enum FileAccess {
    // constant members
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    // computed member
    G = "123".length,
}



enum ShapeKind {
    Circle,
    Square,
}


interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}
let c:Circle = {
    kind:ShapeKind.Circle,//这里已经默认了是值类型0，而非number类型
    radius:9
}
type PC = keyof Circle
type PS = typeof ShapeKind
const ps:PS = {
    Circle:0,
    Square:1
}