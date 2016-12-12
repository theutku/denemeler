interface IAnimal {
    a: string;
    b: string;
    d: number;
    feedChildren();
    die();
    makenoise(): string;
}

interface IAlive {
    eat();
}

interface IChildren {
    feedMe();
}

class Animal implements IAnimal, IAlive {
    b: string;
    a: string;
    d: number = 5;
    private dasd;
    protected childCount: number;
    feedChildren() {
        this.children.forEach((child) => {
            child.feedMe();
        })
    }



    die() {
        this.dasd = 5;
    }

    eat() { this.dasd = "12"; }

    makenoise(): string { return ""; }

    constructor(public children: Array<IChildren>) {
        this.childCount = children.length;
    }
}

class Mushroom implements IAnimal {
    b: string;
    a: string;
    d: number;

    die() { }

    makenoise(): string { return ""; }
}

class Tiger extends Animal {
    c: string

    die(param1, s, d, g) {
        alert();
        super.die();
        this.children.push(new BabyTiger());
        this.childCount + 1;
    }

    static CreateNewTiger(): BabyTiger {
        return new BabyTiger();
    }

    constructor(child: IChildren) {
        super([child])
    }
}

class BabyTiger extends Tiger implements IChildren {

    feedMe() {

    }

    constructor() {
        super(null);
    }
}

var animalArray = new Array<IAnimal>();

var ccc = new Tiger(new BabyTiger());
animalArray.push(ccc);
animalArray.push(new Tiger(new BabyTiger()));
animalArray.push(new Tiger(null));
new BabyTiger();


Math.cos(5);

animalArray.forEach((d) => {
    d.feedChildren();
})

var ddd = new BabyTiger();
ccc.a = "5";

var ref = ccc.die.apply({}, [1, 2, 3, 4]);

ccc.die()