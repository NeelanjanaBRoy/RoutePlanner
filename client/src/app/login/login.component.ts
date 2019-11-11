import { Component, OnInit } from '@angular/core';
// import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // providers: [NgbCarouselConfig]
})
export class LoginComponent implements OnInit {
  public show: boolean;
  images = [
    {
      "id": 1,
      "url": "../../assets/img/login-carousel-image-1.jpg"
    },
    {
      "id": 2,
      "url": "../../assets/img/login-carousel-image-2.jpg"
    },
    {
      "id": 3,
      "url": "../../assets/img/login-carousel-image-3.jpg"
    },
    {
      "id": 4,
      "url": "../../assets/img/login-carousel-image-4.jpg"
    }
  ]

  public headerUrl = {
    "view": "/rtlsdashboard/view",
    "health": "/rtlsdashboard/summary",
    "configuration": "/rtlsdashboard/anchors",
    "preferences": "/rtlsdashboard/preferences"
  }

  constructor( private router: Router, private LoginService: LoginService) {
    // config: NgbCarouselConfig,
    // config.showNavigationArrows = false;
    // config.showNavigationIndicators = false;
    // config.interval = 3000;
    // config.wrap = true;
    this.show = false;
  }

  public email: string;
  public password: string;
  public loginInfo: any;
  public errorMsg: string;
  public errorColor: boolean = false;
  public data: any;
  public validateEmail: boolean = true;
  public validEmail: boolean = true;


  ngOnInit() {


    // let act = localStorage.getItem('access_token');
    // this.errorMsg = '';
    // if (act) {
    //   this.router.navigate(['/rtlsdashboard/view']);
    // } 
    // else {
    //   this.LoginService.currentloginInfo.subscribe(data => this.data = data);
    // }

  }


  checkUserLoggedIn(content) {
    let regexp = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    this.validEmail = regexp.test(this.email);
    if (this.validEmail == false) {
      this.errorMsg = ' Please enter a valid Email';
      this.errorColor = true;
    }
    else {
      const loginDetails = {
        email: this.email,
        password: this.password
      };
      this.LoginService.checkUserLoggedIn(loginDetails).subscribe(response => {
        this.data = response;
        if (this.data.data != undefined){
          if (this.data.data.is_logged_in == false) {
            this.goToDashboard();
          }
        }
        else {
          this.errorMsg = this.data.message;
          this.errorColor = true;
        }
      }, err => {
        this.errorMsg = err.error.message;
        this.errorColor = true;
      });
    }
  }


  goToDashboard() {
    const loginDetails = {
      email: this.email,
      password: this.password
    };
    // this.LoginService.sendLoginInfo(loginDetails).subscribe(response => {
    //   this.data = response;
    //     localStorage.setItem('adminId', this.data.data.user_id);
    //     localStorage.setItem('name', this.email.split('@')[0]);
    //   for (let i = 0; i < this.data.data.screenList.length; i++)
    //     this.data.data.screenList[i].headerURL = this.headerUrl[this.data.data.screenList[i].screen_name.toLowerCase()]
    //   localStorage.setItem('access_token', this.data.data.access_token);
    //   this.errorColor = false;
    //   this.LoginService.updateloginInfo(this.data);
      this.router.navigate(['/dashboard/routes']);
    // }, (err) => {
    //   if (err.status == 400 || err.status == 500) {
    //     if (typeof err.error.message != 'object' && err.error.message !== null) {
    //       this.errorMsg = err.error.message;
    //       this.errorColor = true;
    //     }
    //   }
    // });
  }

  public passwordToggle() {
    $(".toggle-password").toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  }

  public togglePassword() {
    this.show = !this.show;
  }

}








