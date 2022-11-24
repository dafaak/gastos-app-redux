import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IngresoEgresoModel} from "../models/ingreso-egreso.model";
import {AuthService} from "./auth.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) {
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {
    return this.firestore.doc(`${this.authService.user?.uid}/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgreso})
  }

  initIngresosEgresosListener(uid: string) {
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges() // para obtener el uid
      .pipe(
        map(snapshot => {
            return snapshot.map(doc => {
                // aqui se obtienen los datos del ingreso egreso
                return {
                  uid: doc.payload.doc.id,
                  ...doc.payload.doc.data() as any
                }
              }
            )
          }
        )
      )
  }

  borrarIngresoEgreso(uid: string) {
    return this.firestore.doc(`${this.authService.user?.uid}/ingresos-egresos/items/${uid}`).delete()
  }
}
