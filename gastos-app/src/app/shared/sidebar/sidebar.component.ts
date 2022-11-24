import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {filter, Subscription} from "rxjs";
import {UsuarioModel} from "../../models/usuario.model";
import {isUndefined} from "@ngrx/store/src/meta-reducers/utils";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private nombreUsuario = '';
  user: UsuarioModel | undefined;
  userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select(state => {
        return state.user
      }
    )
      .pipe(
        filter(({user}) => user != undefined
        )
      )
      .subscribe(
        ({user}) => {
          console.log('El user side:', user);
          // @ts-ignore
          this.nombreUsuario = user.nombre;
          // @ts-ignore
          this.user = {...user};
        }
      );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  logout() {
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading(null);
      },
    });
    this.authService.logout()
      .then(
        resLogout => {
          Swal.close();
          this.router.navigate(['/login']);
        }
      )
      .catch(
        error => {
          Swal.fire({
            title: 'Error',
            text: 'Oops, algo salió mal!',
            confirmButtonText: 'Ok'
          });
          console.error(error);
        }
      )
  }
}
