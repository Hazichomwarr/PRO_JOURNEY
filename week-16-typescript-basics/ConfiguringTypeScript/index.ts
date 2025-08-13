interface Chicken {
  breed: string;
  eggsPerWeek: number;
  name: string;
}

const norma: Chicken = {
  breed: "Silkie",
  eggsPerWeek: 4,
  name: "Norma",
};

//tsc -w index.ts (or --watch)
//tsc (or watch mode tsc -w): compiles any .ts files that it comes across

//files: [] include exclude (always exclude node_modules)

//dist: common (outdir) typescript folder name for projects

//target: "es(of your choice)"

//strict: true (basically, you get stronger guarantees of program correctness)
//noImplicitAny: true (Enable error for expressions and declarations with an implied 'any' type)
//strictNullChecks: true ()
