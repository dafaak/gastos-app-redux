import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map, Observable, Subscription} from "rxjs";
import {UsuarioModel} from "../models/usuario.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Store} from "@ngrx/store";
import *as authActions from "../auth/auth.actions";
import {FirebaseUserInterface} from "../interfaces/firebase-user.interface";
import * as ingresoEgresoActions from "../ingreso-egreso/ingreso-egreso.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription!: Subscription;
  private _user?: UsuarioModel;

  get user(): UsuarioModel | undefined {
    return this._user ? {...this._user} : undefined;
  }

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store,
  ) {
  }

  initAuthListener() {
    this.auth.authState.subscribe(
      fbUser => {
        if (fbUser) {
          this.userSubscription = this.firestore.doc(`${fbUser.uid}/usuario`)
            .valueChanges()
            .subscribe(
              (firestoreUser: any) => {
                console.log(firestoreUser);
                const tempUser = UsuarioModel.fromFirestore(firestoreUser);
                this._user = tempUser;
                this.store.dispatch(authActions.setUser({user: tempUser}))
              }
            )
        } else {
          this._user = undefined;
          if (this.userSubscription) {
            this.userSubscription.unsubscribe();
          }
          this.store.dispatch(ingresoEgresoActions.unsetIngresoEgreso());
          this.store.dispatch(authActions.unsetUser());
        }
      }
    )
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((
          {
            user
          }
        ) => {
          if (user != null) {
            const newUser = new UsuarioModel(user.uid, nombre, email);
            return this.firestore.doc(`${user.uid}/usuario`).set({...newUser});
          } else {
            return;
          }
        }
      );
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {

    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(
        fbUser => {
          return fbUser != null;

        }
      )
    )
  }
}
