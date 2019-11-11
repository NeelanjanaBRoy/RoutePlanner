import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService }  from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public LoginService: LoginService, private router: Router) { }
  
    canActivate(): boolean {
      if (!this.LoginService.isLoggedIn()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }


}
