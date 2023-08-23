import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarService } from './services/sidebar.service';
import { MaterialModule } from './crreportes/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { AuthuserService } from './services/authuser.service';
import { AuthenticationGuardService } from './services/authentication-guard.service';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    
  ],
  providers: [{provide:  LocationStrategy, useClass:HashLocationStrategy},SidebarService,        {
    provide: MAT_DATE_LOCALE,
    useValue: 'es-AR'
  },AuthModule,  AuthuserService,AuthenticationGuardService ],
  bootstrap: [AppComponent],
  exports:[

  ]

})
export class AppModule { }
