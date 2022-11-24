import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {IngresoEgresoService} from "../services/ingreso-egreso.service";
import {IngresoEgresoModel} from "../models/ingreso-egreso.model";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import {isLoading, stopLoading} from "../shared/ui.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  formIngresoEgreso: FormGroup;
  tipo = 'ingreso';
  cargando = false;
  isLoadingSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>,
  ) {
    this.formIngresoEgreso = this.fb.group({
        descripcion: ['', Validators.required],
        monto: ['', [Validators.required, Validators.min(0.01)]],
      }
    )
  }

  ngOnInit(): void {
    this.isLoadingSubs = this.store.select(({ui}) => {
        return ui.isLoading
      }
    ).subscribe(isLoading => {
        this.cargando = isLoading;
      }
    );
  }

  ngOnDestroy() {
    this.isLoadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {
    if (this.formIngresoEgreso.invalid) {
      return;
    }
    this.store.dispatch(isLoading());
    console.log(this.formIngresoEgreso.value, this.tipo);
    const {descripcion, monto} = this.formIngresoEgreso.value;
    const ingresoEgreso = new IngresoEgresoModel(descripcion, monto, this.tipo);
    delete ingresoEgreso.uid;
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(
        (ref) => {
          this.store.dispatch(stopLoading());
          Swal.fire({
              title: 'Info!',
              text: `${this.tipo.toUpperCase()} creado!`,
              icon: 'success',
              confirmButtonText: 'Ok'
            }
          );
          this.formIngresoEgreso.reset();
        }
      )
      .catch(
        err => {
          console.error(err);
          this.store.dispatch(stopLoading());
          Swal.fire({
              title: 'Oops!',
              text: `Error creando ${this.tipo}!`,
              icon: 'success',
              confirmButtonText: 'Ok'
            }
          );
        }
      )
  }
}
