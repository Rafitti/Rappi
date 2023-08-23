import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthuserService } from './authuser.service';

import { ProfilesService } from './profiles.service';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class AuthenticationGuardService  implements CanActivate{
  private _activateSource: Subject<boolean> = new Subject<boolean>();
    
    constructor(
      private authenticationService: AuthuserService,
      private profileServices: ProfilesService,
      private router:Router
    ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.profileServices.user.legajo == "") {
      this.authenticationService.ReloadToken().subscribe({
          next: (userStation) => {
              this._activateSource.next(true);
          },
          error: (error: HttpErrorResponse) => {
              this.router.navigate(['auth/in']);
          },
      });
    } else {
        setTimeout(() => {
            this._activateSource.next(true);
        }, 100);
    }

    return this._activateSource.asObservable();
  }
    
}

