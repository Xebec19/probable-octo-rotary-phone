import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { UserDetailsService } from './global-services/user-details.service';
import resource from '../assets/links.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isHandset!: Observable<boolean>;
  sidenav: {
    mode: 'side' | 'over';
    opened: boolean;
    backDrop: boolean;
  } = { mode: 'side', opened: true, backDrop: false };
  links = resource;
  constructor(
    private userDetails: UserDetailsService,
    private breakpointObserver: BreakpointObserver,
    public auth: UserDetailsService
  ) {}
  ngOnInit() {
    this.userDetails.fetchToken();
    this.breakPointListenInit();
  }
  breakPointListenInit = async () => {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.opened = false;
          this.sidenav.backDrop = true;
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.opened = true;
          this.sidenav.backDrop = false;
        }
      });
  };
  title = 'admin-frontend';
  logout = (): void => {
    this.auth.logout();
  };
}
