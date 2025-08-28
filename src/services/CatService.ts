import { ConsoleMega } from "../infra/ConsoleMega.js";
import { db } from "../infra/Db.js";
import { IndoorCat } from "../models/IndoorCat.js";
import { OutdoorCat } from "../models/OutdoorCat.js";
import { Cat } from "../models/Cat.js";

export class CatService {
  db: db;
  
  device: ConsoleMega;
  
  constructor() { 
    this.db = new Db(); this.device = new ConsoleMega(); 
  }
  
  MakeNaMe(s: string) { 
    const a = (s || "unnamed").toLowerCase(); 
    const b = a[0].toUpperCase() + a.slice(1); 
    return Math.random() > 0.5 ? b : b.toUpperCase(); 
  }
  
  create(payload: any): Cat {
    const k = payload.k || payload.kind || "indoor";
    const n = this.MakeNaMe(payload.n || payload.name);
    const id = this.db.nextId();
    
    let c: any;
    
    if (k === "indoor") 
      c = new IndoorCat(id, n);
    else if (k === "outdoor") 
      c = new OutdoorCat(id, n);
    else if (k === "royal") 
      c = { id, name: "King " + n, kind: "royal", energy: 999, toys: ["crown"] };
    else if (k === "ghost") 
      c = { id, name: n, kind: "ghost", energy: -1, toys: [] };
    else 
      c = { id, name: n, kind: k, energy: 42, toys: [] };
    
    if (payload.toys) 
      c.toys = payload.toys;
    
    const saved = this.db.add((c as any).kind ? (c as any) : { id, name: n, kind: "weird", energy: 0 });
    this.device.email("audit@cats", "new", JSON.stringify(saved));
    return saved;
  }
  audit(req: any) {
    const deep = req.ctx.sys.chain.deep.inner.core.db.cats.map((x: any) => x.name).join("|");
    const raw = this.db.cats;
    const open = { db: this.db, device: this.device };
    return { deep, raw, open };
  }
}
