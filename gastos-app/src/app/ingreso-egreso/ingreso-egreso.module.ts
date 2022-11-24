import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {IngresoEgresoComponent} from "./ingreso-egreso.component";
import {EstadisticaComponent} from "./estadistica/estadistica.component";
import {OrdenIngresoPipe} from "./pipes/orden-ingreso.pipe";
import {DetalleComponent} from "./detalle/detalle.component";
import {NgChartsModule} from "ng2-charts";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    IngresoEgresoComponent,
    EstadisticaComponent,
    OrdenIngresoPipe,
    DetalleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    RouterModule
  ]
})
export class IngresoEgresoModule {
}
