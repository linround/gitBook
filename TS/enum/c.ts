const enum EDirection {
    Up,
    Down,
    Left,
    Right,
}

const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
} as const;
function walk(dir: EDirection) {}
type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) {}

walk(EDirection.Left);
run(ODirection.Right);