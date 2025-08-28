export interface MegaDevice {
  printer(doc: string): void;
  scanner(): string;
  fax(n: string, d: string): void;
  email(to: string, d: string): void;
}
