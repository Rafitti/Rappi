import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { CrreportesRoutingModule } from './crreportes-routing.module';
import { MaterialModule } from './material/material.module';
import { ReporteModule } from './pages/reporte/reporte.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    CrreportesRoutingModule,
    MaterialModule,FormsModule,ReactiveFormsModule
  ],
  providers:[MaterialModule,DatePipe]
})
export class CRReportesModule { }
