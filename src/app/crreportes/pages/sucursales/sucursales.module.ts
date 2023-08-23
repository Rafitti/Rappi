import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucsVsxComponent } from './sucs-vsx/sucs-vsx.component';
import { MaterialModule } from '../reporte/reporte.module';



@NgModule({
  declarations: [
    SucsVsxComponent
  ],
  imports: [
    CommonModule, MaterialModule
  ],
})
export class SucursalesModule { }
