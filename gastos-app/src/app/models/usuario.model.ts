import {FirebaseUserInterface} from "../interfaces/firebase-user.interface";

export class UsuarioModel {

  static fromFirestore(firebaseUser: FirebaseUserInterface) {
    return new UsuarioModel(firebaseUser.uid, firebaseUser.nombre, firebaseUser.email);
  }

  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ) {
  }
}
