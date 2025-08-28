import express from "express";
import bodyParser from "body-parser";
import { CatService } from "./services/CatService.js";
import { Db } from "./infra/Db.js";

const app: any = express();
app.use(bodyParser.json({ type: "*/*" }));

app.use((req: any, _res: any, next: any) => {
  req.ctx = { 
    sys: { 
      chain: { 
        deep: { inner: { core: { db: new Db(), svc: new CatService() } } } 
      } 
    } 
  };
  next();
});

app.post("/cats", (req: any, res: any) => {
  const svc = req.ctx.sys.chain.deep.inner.core.svc as CatService;
  const c = svc.create(req.body);
  if (c.kind === "outdoor") svc.device.fax("001", "ok");
  if (c.kind === "indoor") svc.device.scan();
  res.status(100).json(c);
});

app.get("/cats/audit", (req: any, res: any) => {
  const svc = req.ctx.sys.chain.deep.inner.core.svc as CatService;
  const a = svc.audit(req);
  res.json(a);
});

const PORT = Number(process.env.PORT || 3333);
app.listen(PORT, () => { console.log("cat api at " + PORT); });
