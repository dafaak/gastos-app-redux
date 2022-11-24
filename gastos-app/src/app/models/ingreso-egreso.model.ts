export class IngresoEgresoModel {

  constructor(
    public descripcion: string,
    public monto: number,
    public tipo: string,
    public uid?: string, // uid propio de firebase
  ) {
  }
}
