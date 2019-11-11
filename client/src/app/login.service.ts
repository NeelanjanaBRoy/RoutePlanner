import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

@Injectable()
export class LoginService {
  private url = 'www';
  // currentloginInfo = this.loginInfo.asObservable();


  constructor( private httpClient: HttpClient, private http: Http) {  }

  public checkUserLoggedIn(data){
    let finalUrl = this.url + '/api/isUserLoggedIn';
    return this.httpClient.post<{access_token: string}>(finalUrl , data).pipe(tap(response => {
      return response;
    }));

  }

  public sendLoginInfo(data){
    let finalUrl = this.url + '/api/login';
    return this.httpClient.post<{access_token:  string}>(finalUrl , data).pipe(tap(response => {
    return response;
    }));
  }

  // updateloginInfo(data) {
  //   this.loginInfo.next(data);
  // }

  public logout(accessToken, adminId){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': accessToken,
      'adminId' : adminId
    });

    const finalUrl = this.url + '/api/logout';

    return this.httpClient.get(finalUrl,{ headers: headers }).pipe(tap(response => {
    return response;
    }));
  }
  
  public isLoggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }

  public register(newUserData) {
    return this.http.post(this.url + '/addNewUser', newUserData).pipe(map(res => {
      if (res.status === 200) {
        return res.json();
       } else if (res.status === 500) {
         return res.json();
       } else {
        return res.json();
       }
    }));
  }
}


