interface O {
    u():string
}
class K {
    name():string{
        return ''
    }
}
class H extends K{
    h():string{
        return ''
    }
}

class P implements K,O{
    name(): string {
        return '';
    }
    u(): string {
        return  ''
    }

}