import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfilesService } from './profiles.service';
import { CotoCryptoService } from './coto-crypto.service';
import { LogInResponse, UserIn } from '../utils/indices';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export const LOCAL_STORAGE_TOKEN: string = "cotoTicket_token";

@Injectable()
export class AuthuserService {

    constructor(
        private http: HttpClient,
        private ProfilesService: ProfilesService,
        private CotoCryptoService: CotoCryptoService,
  ) { }

        Login(username: string, password: string): Observable<LogInResponse>{
            const Userin : UserIn = {
                username, 
                password
            }

            return this.CotoCryptoService.getCotoCryptic(password).pipe(
                tap(encryptedPassword => {
                    Userin.password = encryptedPassword;
                }),
                switchMap(encryptedPassword => this.http.post<LogInResponse>(`${environment.rappiApi}ACCOUNT/Login`, Userin)),
                tap((signInResponse: LogInResponse) => {
                    localStorage.setItem(LOCAL_STORAGE_TOKEN, signInResponse.data.token ?? "");
                    this.ProfilesService.setupUser(signInResponse.data);
                }),
                
            )
        }

        ReloadToken(){ 
            const TokenIn : string | null = localStorage.getItem(LOCAL_STORAGE_TOKEN);
            
            const headers: HttpHeaders = new HttpHeaders()
                .append('Cache-Control' , 'no-store')
                .append('Content-Type', 'application/json; charset=utf-8')
                .append('Type', 'web')
                .append('Authorization', `Bearer ${TokenIn}`);

                return this.http.get<LogInResponse>(`${environment.rappiApi}ACCOUNT/AuthToken`, {
                    'headers': headers,
                }).pipe(
                    tap((signInResponse: LogInResponse) => {
                        localStorage.setItem(LOCAL_STORAGE_TOKEN, signInResponse.data.token ?? "");
                        this.ProfilesService.setupUser(signInResponse.data);
                    }),
                );
            }
}

