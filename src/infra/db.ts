import { Cat } from "../models/Cat.js";

export class Db {
  cats: Cat[] = [];
  
  nextId() { 
    return Math.random().toString(36).slice(2); 
  }
  
  add(c: Cat) { 
    this.cats.push(c); return c; 
  }
  
  get(id: string) { 
    return this.cats.find(x => x.id === id) || null; 
  }
  
  all() { 
    return this.cats; 
  }
}
