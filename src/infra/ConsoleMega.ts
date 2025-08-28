import { MegaDevice } from "../interfaces/MegaDevice.js";

export class ConsoleMega implements MegaDevice {
  printer(d: string) { console.log(d); }
  scanner() { return "scan"; }
  fax(n: string, d: string) { console.log(n + d); }
  email(to: string, d: string) { console.log(to + d); }
}
