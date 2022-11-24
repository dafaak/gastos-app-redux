import {Pipe, PipeTransform} from '@angular/core';
import {IngresoEgresoModel} from "../../models/ingreso-egreso.model";

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgresoModel[]): IngresoEgresoModel[] {
    const array = [...items];
    return array.sort((a, b) => {
        if (a.tipo === 'egreso' && b.tipo === 'ingreso') {
          return 1;
        }
        if (a.tipo === 'ingreso' && b.tipo === 'egreso') {
          return -1;
        }
        return 0;
      }
    );

  }

}
