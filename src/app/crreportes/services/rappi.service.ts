import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ordenes, Sucursales } from '../../utils/reports';
import { forkJoin, map, Observable, concat, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RappiService {

  constructor( private http: HttpClient) { }

  getsucs(){
    return this.http.get<Sucursales[]>(`${environment.rappiApi}GRAL/GetSucursalesRappi?Sucursal=0`)
  }


  getTableData( ids: number, desde: number, hasta: number, cancelado: string) {
    
    return this.http.get<Ordenes>(`${environment.rappiApi}RAPPI/GetOrdenes?SUCURSAL=${ids}&FECHADESDE=${desde}&FECHAHASTA=${hasta}&CANCELADO=${cancelado}`)
  }

}