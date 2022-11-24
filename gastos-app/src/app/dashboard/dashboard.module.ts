import {NgModule} from '@angular/core';
import {DashboardComponent} from "./dashboard.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {dashboardRoutes} from "./dashboard.routes";
import {StoreModule} from "@ngrx/store";
import {ingresoEgresoReducer} from "../ingreso-egreso/ingreso-egreso.reducer";


const rutasHijas: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
  },
]

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    RouterModule.forChild(rutasHijas),
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer)
  ],
})
export class DashboardModule {
}
