//AGGREGATION LAB DB

//insert sample datas
db.students.insertMany([
  {
    _id: 1,
    name: "Alice",
    scores: [95, 82, 58, 70],
    subjects: [
      { name: "Math", grade: 95 },
      { name: "English", grade: 82 },
      { name: "History", grade: 58 },
      { name: "Science", grade: 70 },
    ],
    enrolled: ISODate("2024-09-01"),
  },
  {
    _id: 2,
    name: "Bob",
    scores: [40, 60, 85],
    subjects: [
      { name: "Math", grade: 40 },
      { name: "English", grade: 60 },
      { name: "History", grade: 85 },
    ],
    enrolled: ISODate("2024-08-15"),
  },
]);

db.orders.insertMany([
  {
    _id: 101,
    customerId: "c1",
    status: "completed",
    items: [
      { productId: "p1", price: 10, qty: 2 },
      { productId: "p2", price: 5, qty: 1 },
    ],
    created: ISODate("2024-09-21"),
  },
  {
    _id: 102,
    customerId: "c2",
    status: "pending",
    items: [{ productId: "p1", price: 10, qty: 1 }],
    created: ISODate("2024-09-22"),
  },
  {
    _id: 103,
    customerId: "c1",
    status: "completed",
    items: [{ productId: "p3", price: 20, qty: 1 }],
    created: ISODate("2024-09-22"),
  },
]);

//Project name and hide _id
db.students.aggregate([
  {
    $project: {
      name: 1,
      _id: 0,
    },
  },
]);

//Add computed 'firstScore' (first element of scores)
db.students.aggregate([
  {
    $project: {
      name: 1,
      firstScore: { $arrayElemAt: ["$scores", 0] },
      _id: 0,
    },
  },
]);

//Build an aggregation to return name, and yearEnrolled (string YYYY).
db.students.aggregate([
  {
    $project: {
      name: 1,
      yearEnrolled: { $dateToString: { format: "%Y", date: "$enrolled" } },
    },
  },
]);
