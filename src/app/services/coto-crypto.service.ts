import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CotoCryptoService {

  constructor() { }
   /**
     * Toma un texto plano y devuelve un texto encriptado como un `string` en base64.
     * @param plainText el texto a encriptar (plaintext)
     * @returns el texto en base64 encriptado con RSA (cyphertext)
     */
    getCotoCryptic(data: string): Observable<string>{
      var keySize = 256;
      var salt = CryptoJS.lib.WordArray.random(16);
      var key = CryptoJS.PBKDF2(environment.secret, salt, {
        keySize: keySize/32,
        iterations: 1000
    });
    var iv = CryptoJS.lib.WordArray.random(128/8); 
    var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });

    var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
    return of(result);
    }
}
