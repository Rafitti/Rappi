import { DatePipe, formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { RappiService } from '../../../services/rappi.service';
import { data_table_report, Datum, Ordenes, Sucursales } from 'src/app/utils/reports';
import { FormBuilder, FormControl,FormGroup } from "@angular/forms";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { MatPaginator,MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { forkJoin, map } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatCheckbox } from '@angular/material/checkbox';
import * as XLSX from 'xlsx';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { LOCAL_STORAGE_TOKEN } from 'src/app/services/authuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte-por-orden',
  templateUrl: './reporte-por-orden.component.html',
  styleUrls: ['./reporte-por-orden.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ReportePorOrdenComponent implements OnInit {

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    //allSelected =false;
    displayedColumns: string[] = [ "sucursal","orden","pedido","terminal","fecha_ticket","importe","estado_cancelacion","importe_cancelado"];
    //displayedColumns: string[] = [ "sucursal","orden","pedido"];
    value: string = '';
    checkbox1 = true;
    checkbox2 = true;
    checkbox3 = true;
    //logica del select all
    selectedeo!: FormControl;
    selectAll = new FormControl(false);

    data_table_report : data_table_report[] =[];
    currentData: Datum[]=[];
    data: number[] =[];

    desdeControl: FormControl = new FormControl(new Date());

    hastaControl: FormControl = new FormControl(new Date());

    legajo: FormControl= new FormControl();
    //paginator
    private paginator!: MatPaginator;
    private sort!: MatSort;
  
  
    @ViewChild(MatSort) set matSort(ms: MatSort) {
      this.sort = ms;
      this.setDataSourceAttributes();
    }
  
    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
      this.paginator = mp;
      this.setDataSourceAttributes();
    }
  
    setDataSourceAttributes() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    dataSource:MatTableDataSource<data_table_report>;

    //expandable
    isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
    expandedElement: any;

    //logica detras del select all
    @ViewChild('allSelected') private allSelected!: MatOption;
  
    uuu!: FormGroup;
    ratio!: number[];
  
    constructor(
      public datepipe: DatePipe,
      public RappiService: RappiService,
      private ref: ChangeDetectorRef,
      private fb: FormBuilder,
      private _snackBar: MatSnackBar,
      private router: Router
      // public XlsService : XLSXService,
      // private overlayService: OverlayService,
    ) 
    {
      
      this.dataSource = new MatTableDataSource<data_table_report>();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
    }
    
    ngOnInit(): void {
      this.data_table_report = [];
      this.RappiService.getsucs()
        .subscribe((datos:any) =>{
          this.currentData = datos.data;
      });

      this.uuu = this.fb.group({
        userType: new FormControl(''),
      });
      this.ref.detectChanges();
    
    }

    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Items Por Pagina: ';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 de ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      }
      }
  
      
    getConsulta(){
      this.changeSelection();
      const fechadesde: string = this.datepipe.transform(this.desdeControl.value,"yyyyMMdd") ?? '';
      const fechahasta: string = this.datepipe.transform(this.hastaControl.value,"yyyyMMdd") ?? '';
      
      const desdeformat: number = parseInt(fechadesde);
      const hastaformat: number = parseInt(fechahasta);

      
      if(this.value){
        //TODO añadir la logica de snack bar
        this.data_table_report = [];
        const snackBarRef = this.openSnackBar('Cargando Datos...');
        this.ratio.map((id) => {
          
          this.RappiService.getTableData(id, desdeformat, hastaformat, this.value)
            .subscribe((datos: Ordenes) => {
         
              this.data_table_report.push(...datos.data);      
              this.dataSource = new MatTableDataSource(this.data_table_report);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;      
            
              
            });
         
           
          
          });
          snackBarRef.afterDismissed().subscribe(() => {
              
            this.openSnackBar(`Cargados con exito!`);
          });
      }else{
        this.data_table_report = [];
        this.dataSource= new MatTableDataSource();
      }

      //console.log(this.data_table_report)
      //TODO snackbar pero de ok
    }
    
  filter(d: any){
    this.data=d.value;
    }

  
    changeSelection() {
      let v='';
      if (this.checkbox1 && this.checkbox2 && this.checkbox3) {
        v = '-1';
      } else {
        if (this.checkbox1) {
          v += '0,';
        }
        if (this.checkbox2) {
         v += '1,';
        }
        if (this.checkbox3) {
          v += '2,';
        }
        v = v.slice(0, -1); 
      }
      this.value= v;
    }


    //logica para seleccionar
    DesmarqueMarque(all:any) {
      if (this.allSelected.selected) {
        this.allSelected.deselect();
      }
   
      this.ratio=this.uuu.value['userType'];
      if (this.uuu.controls['userType'].value.length == this.currentData.length && all){
        this.allSelected.select();
       
      }
    }

    Marcados() {
      if (this.allSelected.selected) {
        this.uuu.controls['userType'].patchValue([
          ...this.currentData.map((item) => item.id_suc),0
        ]);
        this.ratio=this.uuu.value['userType'];
        this.ratio.pop()
      } else {
        this.uuu.controls['userType'].patchValue([]);
      }
    }

    color(a:number){
      if(a === 0){
        return 'devno'
      }
      else if(a === 1){
        return 'devtotal'
      }
      return 'devparcial'
    }


     /**
     * Exporta la grilla actual a un archivo Excel.
     */
     exportToExcel(): void {
      let index: number = 1;
      const final_data: any[] = this.data_table_report.map(data=> {
        
        return{
          
          suc: data.sucursal,
          pedido:data.pedido,
          terminal: data.terminal,
          transaccion: data.transaccion,
          
          Fecha_Ticket: formatDate(data.fecha_ticket, 'dd/MM/yyyy HH:mm:ss','en-US'),
          importe:data.importe,
          orden:data.orden
        }
      })
      const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(final_data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
      
      /* save to file */
      XLSX.writeFile(wb, `ReporteRappi ${this.datepipe.transform(this.desdeControl.value,"yyyyMMdd")}-${this.datepipe.transform(this.hastaControl.value,"yyyyMMdd")}.xlsx`);
  
  }

  openSnackBar(message: string): MatSnackBarRef<SimpleSnackBar> {
    return this._snackBar.open(message, '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',

    });
  }


}
