import {createAction, props} from "@ngrx/store";
import {IngresoEgresoModel} from "../models/ingreso-egreso.model";

export const setIngresoEgreso = createAction(
  '[Ingreso Egreso] setIngresoEgreso',
  props<{ items: IngresoEgresoModel[] }>()
)
export const unsetIngresoEgreso = createAction('[Ingreso Egreso] unsetIngresoEgreso')
