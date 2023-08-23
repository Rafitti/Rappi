import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-por-suc',
  templateUrl: './reporte-por-suc.component.html',
  styleUrls: ['./reporte-por-suc.component.scss']
})
export class ReportePorSucComponent implements OnInit {

  constructor() { }
  DiasqueQuiero:number = 5;
  ngOnInit(): void {
  }

}
