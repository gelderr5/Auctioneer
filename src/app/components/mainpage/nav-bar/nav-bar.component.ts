import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  get username() {
    return this.authService.getUserName();
  }

  private logout() {
    this.authService.logout();
  }

  private isLogged() {
    return this.authService.isAuthenticated();
  }
}
