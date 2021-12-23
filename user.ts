var greeting: string = "Greeting";
var geek: string = new Date().toDateString();

console.log(greeting + " " + geek);

type gender = "Female" | "Male";
class User {
    userName: string;
    userAddress: string;
    point: number;
    gender: gender;

    constructor(address: string, name: string, isFemale: gender) {
        this.userAddress = address;
        this.userName = name;
        this.gender = isFemale;
    }

    getName(): string {
        return this.userName;
    }
    getAddress(): string {
        return this.userAddress;
    }
    getPoint(): number {
        return this.point;
    }
    setPoint(point: number) {
        this.point = point;
    }
}

const user: User = new User("Iceland", "Momo", "Male");
console.log(`${user.getAddress()} ${user.getName()}`);
user.setPoint(45.601);
console.log(`${user.getName()} has point of ${user.getPoint()} and this user is ${user.gender}`);

interface Point {
    x: number;
    y: number;
}

function logPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}

const point = { x: 54, y: 11 };
logPoint(point); // automatically shape structure 

class VirtualPoint {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // logs "13, 56"

function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddy", new Date());


function example() {
    let x: string | number | boolean;

    x = Math.random() < 0.5;

    console.log(x);

    if (Math.random() < 0.5) {
        x = "hello";
        console.log(x);

    } else {
        x = 100;
        console.log(x);
    }

    return x;
}
example();
