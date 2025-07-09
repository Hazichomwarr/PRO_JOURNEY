//Challenge 1: Group items by category:
const items = [
  { category: "fruit", name: "apple" },
  { category: "veg", name: "carrot" },
  { category: "fruit", name: "banana" },
];

// ✅ Output:
/// {
///   fruit: ["apple", "banana"],
///   veg: ["carrot"]
/// }
const output1 = items.reduce((acc, item) => {
  return {
    ...acc,
    [item.category]: [...(acc[item.category] || []), item.name],
  };
}, {});
// console.log("items grouped by cat:", output);

// challenge 2: flatten object keys
const user = {
  name: "John",
  address: {
    city: "NY",
    zip: 10001,
  },
};

// ✅ Output:
/// [ "name", "address.city", "address.zip" ]
function getPaths(obj, prefix = "") {
  let keys = [];
  for (let key in obj) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      keys = keys.concat(getPaths(obj[key], path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}
// console.log(getPaths(user));

// Challenge 3: Invert Key/Value
const map = {
  a: "1",
  b: "2",
};

// ✅ Output:
/// { "1": "a", "2": "b" }
// const invertedObj = {};
// for (const [key, value] of Object.entries(map)) {
//   invertedObj[value] = key;
// }

const invertedObj = Object.entries(map).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});
// console.log(invertedObj);

//Challenge: Rename Object keys:
const person = {
  fname: "Alice",
  lname: "Doe",
};

// ✅ Rename: fname → firstName, lname → lastName
/// Output: { firstName: "Alice", lastName: "Doe" }

// First attempt: with for-in-loop
const newObj = {};
for (let key in person) {
  let val = person[key];
  key = key === "fname" ? "firstName" : "lastName";
  newObj[key] = val;
}

// Second attempt: with reduce method
const renamedKeys = Object.entries(person).reduce((acc, [key, val]) => {
  key = key === "fname" ? "firstName" : "lastName";
  acc[key] = val;
  return acc;
}, {});

//best version (scalable):
const renamedMap = {
  fname: "firstName",
  lname: "lastName",
};
const renamed = Object.entries(person).reduce((acc, [key, val]) => {
  const newKey = renamedMap[key] || key;
  acc[newKey] = val;
  return acc;
}, {});
// console.log(renamed);

// Challenge: Sort array of objects by key
const people = [
  { name: "Bob", age: 32 },
  { name: "Alice", age: 25 },
  { name: "Ali", age: 20 },
];

// ✅ Output: sorted by age ascending
/// [ { name: "Ali", age: 20 }, {name: "Alice", age: 25}, {name: "Bob", age: 32} ]

people.sort((a, b) => a.age - b.age);
//console.log(people);

//Challenge: Merge two objects (deep):
const base = { settings: { darkMode: false } };
const update = { settings: { darkMode: true } };

// ✅ Output: { settings: { darkMode: true } }
