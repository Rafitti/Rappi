import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from './services/authentication-guard.service';

const routes: Routes = [
  //aqui van las rutas
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'reportes',
    loadChildren: () => import('./crreportes/crreportes.module').then(m => m.CRReportesModule),
    canActivate: [ AuthenticationGuardService ],
  },
  {
    path:'**',
    redirectTo:'auth'
  }
]

@NgModule({

  imports: [
    RouterModule.forRoot( routes, { useHash : true } ),
    
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
