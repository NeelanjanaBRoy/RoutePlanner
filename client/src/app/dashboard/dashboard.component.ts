import { Component, OnInit, EventEmitter, Input, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../login.service';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NgbDropdown],
})
export class DashboardComponent implements OnInit {
  private initials = '';
  private userName = '';
  private screenData: any;

  constructor() { }

  ngOnInit() {
    this.initials = 'x';
    this.userName = 'XYZ';
    this.screenData = [
      {
        headerURL: '/dashboard/routes',
        screen_name : 'Journeys'
      },
      {
        headerURL : '/dashboard/favourites',
        screen_name : 'Favourites'
      }
    ];

  }

  // public highlightTab(index) {
  //   this.selectedIndex = index;
  //   this.refresh = false;
  //   localStorage.setItem("tabIndex", index);
  // }

  // public highlightTabonRefresh() {
  //   this.refreshIndex = localStorage.getItem("tabIndex");
  //   this.refresh = true;
  // }

  // logout() {
  //   let at = localStorage.getItem('access_token');
  //   let adminId = localStorage.getItem('adminId');
  //   this.LoginService.logout(at, adminId).subscribe(response => {
  //     this.showstatusmessage(4, response['message']);
  //     localStorage.clear();
  //     this.router.navigate(['/login']);
  //   }, (err) => {
  //     if (err.status == 400 || err.status == 500) {
  //       if (typeof err.error.message != 'object' && err.error.message !== null) {
  //         console.log(err.error.message);
  //       }
  //     }
  //   });
  // }


}

