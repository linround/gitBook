type Dice = 1 | 2 | 3 | 4 | 5 | 6

// create function

function pipsAreValid(pips: number|false): Boolean {
    return (
        pips === 1 ||
        pips === 2 ||
        pips === 3 ||
        pips === 4 ||
        pips === 5 ||
        pips === 6
    )
}
// create
// @ts-ignore
function test(count:number) {
    if(pipsAreValid(count)){
        switch (count){
            case 6:
                console.log('ok')
                break
            case 70:
                console.log('error')
                break
        }
    }
}
