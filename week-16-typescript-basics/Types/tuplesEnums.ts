const color: [number, number, number] = [0, 0, 0];

type HTTPResponse = [number, string];
const goodRes: HTTPResponse = [200, "OK"];
goodRes.push(23); //<- will work; tuple limitation

//Won't use tuple very often

//Enums: it's a way of getting a group od names that we can constantly refer back to (and also get a nice autocomplete)
enum ArrowKeys {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

//the 'const' before the enum to not polute the js
const enum OrderStatus {
  PENDING,
  SHIPPED,
  DELIVERED,
  RETURNED,
}
const order = {
  ordernumber: 209347,
  status: OrderStatus.PENDING,
};
