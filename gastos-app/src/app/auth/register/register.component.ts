import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {AppState} from "../../app.reducer";
import * as ui from "../../shared/ui.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  uiSubscription!: Subscription;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.formGroup = this.fb.group(
      {
        nombre: ['', [Validators.required]],
        correo: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]],

      }
    )
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select((state) => {
      return state.ui
    })
      .subscribe(ui => {
          this.cargando = ui.isLoading;
        }
      )
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {
    if (this.formGroup.invalid) {
      return;
    }
    const {nombre, correo, password} = this.formGroup.value;
    this.store.dispatch(ui.isLoading());
    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading(null);
    //   },
    // });
    this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {
          console.log({credenciales});
          // Swal.close();
          this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/']);
        }
      )
      .catch(error => {
          console.error(error);
          // Swal.close();
          this.store.dispatch(ui.stopLoading());
          Swal.fire({
              title: 'Error!',
              text: 'Oops! No pudimos crear tu cuenta!',
              icon: 'error',
              confirmButtonText: 'Cool'
            }
          );
        }
      )
  }
}
