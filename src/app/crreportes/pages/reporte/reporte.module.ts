import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportePorOrdenComponent } from './reporte-por-orden/reporte-por-orden.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { NoDataComponentComponent } from './no-data-component/no-data-component.component';
import { ExpansionDataComponent } from './reporte-por-orden/expansion-data/expansion-data.component';
import { ReportePorSucComponent } from './reporte-por-suc/reporte-por-suc.component';
import { CustomdatepickerComponent } from 'src/app/utils/Ui-interface/customdatepicker/customdatepicker.component';



@NgModule({
  declarations: [NoDataComponentComponent,
    ReportePorOrdenComponent,
    
    ExpansionDataComponent,
    ReportePorSucComponent,
    CustomdatepickerComponent
  ],
  imports: [
  CommonModule,FormsModule,ReactiveFormsModule,MaterialModule
  ],
})
export class ReporteModule { }
export { MaterialModule };

