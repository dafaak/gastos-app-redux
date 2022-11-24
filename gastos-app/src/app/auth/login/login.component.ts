import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2'
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import * as ui from "../../shared/ui.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  cargando = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.loginForm = fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    )
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select(state => {
        return state.ui
      }
    )
      .subscribe(
        ui => {
          this.cargando = ui.isLoading;
        }
      )
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());
    const {email, password} = this.loginForm.value;
    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading(null);
    //   },
    // });
    this.authService.login(email, password)
      .then(
        resLogin => {
          console.log({resLogin});
          // Swal.close();
          this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/']);
        }
      )
      .catch(error => {
          console.error({error});
          // Swal.close();
          this.store.dispatch(ui.stopLoading());
          Swal.fire({
              title: 'Error!',
              text: 'Oops, algo salió mal!',
              icon: 'error',
              confirmButtonText: 'Ok'
            }
          );
        }
      )
  }

}
