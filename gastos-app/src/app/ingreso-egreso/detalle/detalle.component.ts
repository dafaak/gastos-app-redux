import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {IngresoEgresoModel} from "../../models/ingreso-egreso.model";
import {Subscription} from "rxjs";
import {IngresoEgresoService} from "../../services/ingreso-egreso.service";
import Swal from "sweetalert2";
import {AppStateWithIngreso} from "../ingreso-egreso.reducer";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgresoModel[] = [];
  ingresosSubs!: Subscription;

  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService,
  ) {
  }

  ngOnInit(): void {
    this.ingresosSubs = this.store.select(state => {
      return state.ingresosEgresos;
    })
      .subscribe(
        ({items}) => {
          this.ingresosEgresos = items;
        }
      )
  }

  ngOnDestroy() {
    this.ingresosSubs.unsubscribe();
  }

  borrar(uid: string) {
    console.log(uid);
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(
        res => {
          Swal.fire({
              title: 'Info!',
              text: `Item borrado.`,
              icon: 'success',
              confirmButtonText: 'Ok'
            }
          );
        }
      )
      .catch(
        err => {
          console.error(err);
          Swal.fire({
              title: 'Error!',
              text: `Oops, algo salió mal.`,
              icon: 'error',
              confirmButtonText: 'Ok'
            }
          );
        }
      )
  }


}
