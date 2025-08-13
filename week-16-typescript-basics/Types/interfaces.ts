//Interface is only for objects
interface Coord {
  x: number;
  y: number;
}

//readonly and optional in interface
interface Person {
  readonly id: number;
  first: string;
  last: string;
  nickname?: string;
  sayHi: () => string; //or sayHi(): string
}

const thomas: Person = {
  first: "Thomas",
  last: "Hardy",
  nickname: "Tom",
  id: 23454,
  sayHi: () => "hello",
};

//Method parameters
interface MyProduct {
  name: string;
  price: number;
  applydiscount(discount: number): number;
}

const shoes: MyProduct = {
  name: "Blue Suede Shoes",
  price: 100,
  applydiscount(amount: number) {
    const newPrice = this.price * (1 - amount);
    this.price = newPrice;
    return this.price;
  },
};

//Reopening interfaces
interface Dog {
  name: string;
}
interface Dog {
  age: number;
}
interface Dog {
  breed: string;
  bark(): string;
}

const elton: Dog = {
  breed: "Australian Shepherd",
  name: "Elton",
  age: 0.5,
  bark() {
    return "woof woof";
  },
};

//Extending interfaces
interface ServiceDog extends Dog {
  job: "drug sniffer" | "bomb" | "guide dog";
}
const chewy: ServiceDog = {
  name: "Chewy",
  age: 4.5,
  breed: "lab",
  bark: () => "waaf waaf",
  job: "guide dog",
};

//interface multiple inheritance
interface Personne {
  name: string;
}
interface Employee {
  readonly id: number;
  email: string;
}
interface Engineer extends Personne, Employee {
  level: "Beginner" | "Intermediate" | "Senior";
  languages: string[];
}

const hamza: Engineer = {
  name: "Hamza",
  id: 2345676,
  email: "email@bt.bg",
  level: "Intermediate",
  languages: ["JS", "PYTHON"],
};

//Interface vs Type
//1.interface: only describes objects type; Types can describe any sort of type
//2.interfaces can be reopen; type can't
//3.interface uses 'extends'; type uses '&'(intersection)
