import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


/**
 * Item de la barra de navegación
 */
export interface SidebarItem {
  description: string;
  icon: string;
  route?: string;
  navigationItems: NavigationItem[];
}

/**
* Item de navegación dentro de un item de la barra de navegación. Es el item que contiene la ruta
*/
export interface NavigationItem {
  description: string;
  icon: string;
  route: string;
  //checked: boolean;
}

@Injectable()
export class SidebarService {

  private toggleSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  toggleEvent: Observable<boolean> = this.toggleSource.asObservable();

  navbarItems: SidebarItem[] = [{
    'description': 'Reportes',
    'icon': 'analytics',
    'navigationItems' : [
      
      {
        'description' :'Reporte Por Sucursales',
        'icon': 'content_paste_search',
        'route': './reportexorden'
      }
  ]},{
  //   'description': 'Informes',
  //   'icon': 'dashboard',
  //   'navigationItems' : [{
  //       'description' :'Infromes Devoluciones',
  //       'icon': 'ssid_chart',
  //       'route': './report-cant-devol'
  //     },
  //     {
  //       'description' :'Informe de Ventas',
  //       'icon': 'show_chart',
  //       'route': './report-cant-ven'
  //     }
  // ]},{
    'description': 'Misc',
    'icon': 'blur_on',

    'navigationItems' : [
      {
        'description' :'Version 1.0',
        'icon': 'domain',
        'route': ''
       }
    ]
  }
];

  constructor() {
  }

    /**
     * Abre o cierra la barra de navegación
     */
    toggle() {
      this.toggleSource.next(!this.toggleSource.value);
  }
   /**
     * Devuelve los items de navegación del usuario actual
     * @returns `NavbarItem[]`
     */
   getNavbarItems(): SidebarItem[] {
    // return this.navbarItems;
    return this.navbarItems;
}
}
