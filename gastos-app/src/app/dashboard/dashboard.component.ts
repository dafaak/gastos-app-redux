import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import {filter, Subscription} from "rxjs";
import {user} from "@angular/fire/auth";
import {IngresoEgresoService} from "../services/ingreso-egreso.service";
import {setIngresoEgreso} from "../ingreso-egreso/ingreso-egreso.actions";
import {IngresoEgresoModel} from "../models/ingreso-egreso.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription!: Subscription;
  ingresosEgresosSubsscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select((state) => {
      return state.user
    }).pipe(
      filter(auth => auth.user != null)
    )
      .subscribe(
        user => {
          // @ts-ignore
          this.ingresosEgresosSubsscription = this.ingresoEgresoService.initIngresosEgresosListener(user.user?.uid)
            .subscribe(
              ingresosEgresos => {
                this.store.dispatch(setIngresoEgreso(
                    {items: ingresosEgresos as IngresoEgresoModel[]}
                  )
                )
              }
            )
        }
      )
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.ingresosEgresosSubsscription.unsubscribe();
  }

}
