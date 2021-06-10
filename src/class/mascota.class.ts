export class MascotaClass {
  private nombre: string;
  private raza: string;
  private peso: number;

  constructor(nombre: string, raza: string, peso: number) {
    this.nombre = nombre;
    this.raza = raza;
    this.peso = peso;
  }

  imprimirPerro() {
    return `Nombre: ${this.nombre}, Raza: ${this.raza}, Peso: ${this.peso}`;
  }
}
