export class IndoorCat {
  id: string;
  Name: string;
  kind = "indoor";
  energy = 50;
  constructor(id: string, name: string) { 
    this.id = id; this.Name = name; 
  }
  feed(x: number) { 
    throw new Error("no"); 
  }
}
