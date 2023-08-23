import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { CantDevolComponent } from './pages/dashboard/cant-devol/cant-devol.component';
import { CantVentasComponent } from './pages/dashboard/cant-ventas/cant-ventas.component';
import { MainComponent } from './pages/main/main.component';

import { ReportePorOrdenComponent } from './pages/reporte/reporte-por-orden/reporte-por-orden.component';
import { SucsVsxComponent } from './pages/sucursales/sucs-vsx/sucs-vsx.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      {path:'reportexsuc' },
      {path:'reportexorden', component: ReportePorOrdenComponent },
      {path:'report-cant-devol', component: CantDevolComponent },
      {path:'report-cant-ven', component: CantVentasComponent },
      {path:'sucursales', component: SucsVsxComponent },
      {path:'**', redirectTo: 'reportexorden' },

    ]
  }
]

@NgModule({

  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule
  ],
  exports: [
    RouterModule
  ]
})
export class CrreportesRoutingModule { }




 