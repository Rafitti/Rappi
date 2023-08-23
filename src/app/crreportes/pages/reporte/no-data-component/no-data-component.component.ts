import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-data-component',
  templateUrl: './no-data-component.component.html',
  styleUrls: ['./no-data-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoDataComponentComponent implements OnInit {
  @Input()
  image!: string;
  @Input()
  icon: string = "";
  @Input()
  mainMessage: string = "No hay nada para ver";
  @Input()
  description: string = "No hay contenido para mostrar en esta pantalla";
  @Input()
  loadingAnimation: boolean = false;
  @Input()
  imageOpacity: number = 1;

  

  constructor() { }

  ngOnInit(): void {
  }

}
