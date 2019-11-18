import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  constructor(private httpClient: HttpClient) { }

  public getRoutes(routeDetails){
    let finalUrl = "https://api.tfl.gov.uk/journey/journeyresults/"+routeDetails.source+"/to/"+routeDetails.destination;
    return this.httpClient.get(finalUrl).pipe(tap(response => {
      return response;
    }));
  }
}
