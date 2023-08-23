import { Component, OnInit } from '@angular/core';
import { NavigationItem, SidebarItem, SidebarService } from 'src/app/services/sidebar.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_TOKEN } from 'src/app/services/authuser.service';

import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  sidebarItems: SidebarItem[] = [];
  navbarIsOpen: boolean = true;
  isMobile: boolean= true;
  isLoggedOut: boolean =true;

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private profilesService: ProfilesService
  ) { }

  ngOnInit(): void {

    this.sidebarItems = this.sidebarService.getNavbarItems();
    if(!localStorage.getItem(LOCAL_STORAGE_TOKEN)){
      this.profilesService.killUser();
      this.router.navigate(["./auth/auth.module"])
    }
    
  }
  
  logout() {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN)
    this.profilesService.killUser();
    this.router.navigate(["./auth/auth.module"])
  }

}
