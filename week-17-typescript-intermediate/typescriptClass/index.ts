class Joueur {
  public readonly first: string;
  public readonly last: string;
  private score: number = 0; //better use '#' for private fields in typescript

  constructor(first: string, last: string) {
    this.first = first;
    this.last = last;
  }
}

//Parameter properties shorthand
class Joueur2 {
  #score: number = 0;
  //protected modifier
  protected season: string = "summer";

  constructor(public first: string, public last: string) {}

  //getter - setter
  get fullName(): string {
    return `$this.first} $this.last}`;
  }
  set score(newScore: number) {
    if (newScore < 0) throw new Error("score must be positive!");
    this.#score = newScore;
  }
}

const elton = new Joueur("Elton", "Steele");
const issa = new Joueur2("Issa", "Mare");

//classes and interface
interface Colorful {
  color: string;
}

interface Printable {
  print(): void;
}
class Bike implements Colorful, Printable {
  constructor(public color: string) {}
  print() {
    console.log(this.color);
  }
}

//abstract class
abstract class Employee {
  constructor(public first: string, public last: string) {}
  abstract getPay(): number;
  greet() {
    console.log("Employee stuff");
  }
}

class FullTimeEmployee extends Employee {
  constructor(first: string, last: string, private salary: number) {
    super(first, last);
  }
  getPay(): number {
    return this.salary;
  }
}

class PartTimeEmployee extends Employee {
  constructor(
    first: string,
    last: string,
    private hourlyRate: number,
    private hoursWorked: number
  ) {
    super(first, last);
  }
  getPay(): number {
    return this.hourlyRate * this.hoursWorked;
  }
}
