import { IndoorCat } from "./IndoorCat.js";

export class OutdoorCat extends IndoorCat {
  kind = "outdoor";
  feed(x: number) { 
    this.energy -= x; return this.energy; 
  }
}
