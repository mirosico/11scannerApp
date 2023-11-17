import {Component, ViewEncapsulation} from '@angular/core';
import {MenuItem} from "primeng/api";
import {TokenStorageService} from "../core/services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuItems: MenuItem[] = [];
  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isLoggedIn = !!this.tokenStorageService.getToken() && !!this.tokenStorageService.getUser();
      this.updateMenuItems();
    });
    this.updateMenuItems();
  }

  updateMenuItems() {
    this.menuItems = [
      {
        label: 'Home',
        routerLink: ['/home'],
        icon: 'pi pi-fw pi-home',
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Scan',
        routerLink: ['/scan'],
        icon: 'pi pi-fw pi-search',
        visible: this.isLoggedIn,
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Scan Results',
        icon: 'pi pi-fw pi-chart-line',
        routerLink: ['/scan-results'],
        visible: this.isLoggedIn
      },
      {
        label: 'Login',
        routerLink: ['/login'],
        icon: 'pi pi-fw pi-login',
        visible: !this.isLoggedIn,
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Register',
        routerLink: ['/register'],
        icon: 'pi pi-fw pi-user-plus',
        visible: !this.isLoggedIn,
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        visible: this.isLoggedIn,
        command: () => this.logout(),
        routerLinkActiveOptions: {exact: true},
        styleClass: 'logout'
      },
    ];
  }

  logout(): void {
    this.tokenStorageService.signOut();
  }
}
