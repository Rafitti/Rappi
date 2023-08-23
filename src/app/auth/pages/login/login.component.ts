import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthuserService } from 'src/app/services/authuser.service';
import { CotoCryptoService } from 'src/app/services/coto-crypto.service';
import { ProfilesService } from 'src/app/services/profiles.service';
import { LogInResponse } from 'src/app/utils/indices';

export const LOCAL_STORAGE_TOKEN: string = "cotoTicket_token";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginOK: boolean= false;
  wakawaka:boolean= false;
  Errormsg: string | undefined;
  form: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private profilesService: ProfilesService,
    private encryptService: CotoCryptoService,
    public fb: FormBuilder,
    private authService: AuthuserService
  ) {
    this.form=this.fb.group({
      usuario: [''],
      password: ['']
    })
  }
  ngOnInit(): void{
    this.form=this.fb.group({
      usuario: [''],
      password: ['']
    })
    localStorage.removeItem(LOCAL_STORAGE_TOKEN)
    this.profilesService.killUser();
  }
  
  inciosesion() {
    if(this.form.value.usuario && this.form.value.password){
      this.loginOK = true;
      this.authService.Login(this.form.value.usuario, this.form.value.password).subscribe({
          next:(user: LogInResponse) => {
              setTimeout(()=>{this.router.navigate(["/reportes/reportexorden"])
            }, 500) 
          },
          error:(error: HttpErrorResponse) => {
           this.Errormsg=error.error.status.error;
            this.wakawaka = true;
            this.loginOK = false;   
          }
      });
    }
     
    }
    
    
  }





