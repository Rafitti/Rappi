import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  symbal: string;
  symbel: string;
}

const ELEMENT_DATA: PeriodicElement[] = [

  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', symbal: 'F', symbel: 'F'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', symbal: 'F', symbel: 'F'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', symbal: 'F', symbel: 'F'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', symbal: 'F', symbel: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', symbal: 'Ne', symbel: 'Ne'}
];


@Component({
  selector: 'app-expansion-data',
  templateUrl: './expansion-data.component.html',
  styleUrls: ['./expansion-data.component.scss']
})
export class ExpansionDataComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'symbal', 'symbel'];
  dataSource = ELEMENT_DATA;
  constructor() { }

 
  @Input()
  orden!: number;
  @Output()loaded = new EventEmitter();

  expanded = false;
  loading = false;
  data: any;

  onExpanded() {
    if (!this.data && !this.loading) {

          this.loading = false;
        this.expanded = true;
        this.loaded.emit();
    
    }
  }
}

