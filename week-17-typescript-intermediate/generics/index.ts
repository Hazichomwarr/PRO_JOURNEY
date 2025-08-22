function identity<Type>(item: Type): Type {
  return item;
}

identity<number>(5);
identity<string>("hello");

function randomElement<T>(list: T[]): T {
  const randIdx = Math.floor(Math.random() * list.length);
  return list[randIdx];
}
randomElement<string>(["a", "c", "d", "e"]);
randomElement<number>([12, 45, 65, 76, 96, 100]);

randomElement([true, false]); //inferred generic type

//generic with multiple Types and adding Type constraints
function merge<T extends object, U extends object>(obj1: T, obj2: U) {
  return { ...obj1, ...obj2 };
}
const comboObj = merge({ name: "wolf" }, { numbers: [12, 24, 36, 48] });

//default Type parameters
function makeEmptyArr<T = number>(): T[] {
  return [];
}

const numbs = makeEmptyArr();
const strings = makeEmptyArr<string>();

//generic Classes
interface Song {
  title: string;
  artist: string;
}
interface Video {
  title: string;
  resolution: string;
  creator: string;
}

class Playlist<T> {
  public queue: T[] = [];
  add(el: T) {
    this.queue.push(el);
  }
}

const songs = new Playlist<Song>();
songs.add({ title: "halo", artist: "Beyonce" });

const videos = new Playlist<Video>();
videos.add({ title: "home", resolution: "HD", creator: "passenger" });
