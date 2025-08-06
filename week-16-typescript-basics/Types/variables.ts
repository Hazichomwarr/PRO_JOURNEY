//String in Typescript
let movieTitle: string = "Amadeus";
movieTitle = "Arrival";
//movieTitle = 0 <- not feassible

//number and boolean in typescript
let numb: number = 9;
numb += 2;
//numb += "0" <- not feasible

let isTrue: boolean = true;
isTrue = false;
//istrue = [] <- not feasible

//Type Inference
let tvShow = "Olive Kitteridge";
tvShow = "The Other Two";
//tvShow = false; <- not feasible, infers that it is a string

//The any type
let thing: any = "hello";
thing = 1;
thing = false;
thing();
thing.toUpperCase();
