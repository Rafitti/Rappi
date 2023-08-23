import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component'
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../crreportes/material/material.module';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'in',
      pathMatch: 'full',
  },
  {
      path: "in",
      component: LoginComponent,
  },
]


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
   ,
   MaterialModule
  ]
})
export class AuthModule { }
