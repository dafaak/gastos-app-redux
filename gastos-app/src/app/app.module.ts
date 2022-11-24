import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

// Modulos
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "./auth/auth.module";
import {NgChartsModule} from "ng2-charts";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {StoreModule} from '@ngrx/store';
// Componentes
import {AppComponent} from './app.component';

import {environment} from '../environments/environment';
import {appReducers} from "./app.reducer";
import {SharedModule} from "./shared/shared.module";
import {IngresoEgresoModule} from "./ingreso-egreso/ingreso-egreso.module";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    StoreModule.forRoot(appReducers, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    AuthModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
