export interface Sucursales {
  data:   Datum[];
  status: Status;
}

export interface Datum {
  id_suc:      number;
  descripcion: string;
}

export interface Ordenes {
  data:   data_table_report[];
  status: Status[];
  
}
1 

export interface data_table_report {
  ids:                 number;
  sucursal:           number;
  orden:              number;
  pedido:             number;
  terminal:           number;
  transaccion:        string;
  fecha_ticket:       string;
  importe:            number;
  importe_cancelado:  number;
  estado_cancelacion: number;
  finsert:            Date;
}

export interface Status {
  code:  string;
  ok:    boolean;
  error: string;
}

