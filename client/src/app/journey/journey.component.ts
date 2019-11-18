import { Component, OnInit } from '@angular/core';
import { JourneyService } from '../journey.service';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit { 
  public source: any;
  public destination: any;
  public routeDetails: any;
  public data: any;
  public destinationDisambiguation:any;
  public sourceDisambiguation: any;

  constructor(public journeyService: JourneyService) { }

  ngOnInit() {
  }

  getJourneys(){
    this.routeDetails = {
      source: this.source,
      destination: this.destination
    }
    this.journeyService.getRoutes(this.routeDetails).subscribe(response => {
      this.data = response;
      console.log(this.data);
      this.routeDetails = this.data.journeys;
      this.destinationDisambiguation = '';
      this.sourceDisambiguation = '';
      
    }, (err) => {
        // console.log(err.error);
        if (err.error.toLocationDisambiguation.disambiguationOptions){
          this.destinationDisambiguation = err.error.toLocationDisambiguation.disambiguationOptions;
        }
        if (err.error.fromLocationDisambiguation.disambiguationOptions){
          this.sourceDisambiguation = err.error.fromLocationDisambiguation.disambiguationOptions;
        }
        console.log("Multiple sources:", this.sourceDisambiguation);
        console.log("Multiple destinations:",this.destinationDisambiguation);
    });

  }

  onDestinationChange(value){
    console.log(" Value is : ", value.srcElement.defaultValue);
    this.destination = value.srcElement.defaultValue;
  }

  onSourceChange(value){
    console.log(" Value is : ", value.srcElement.defaultValue );
    this.source = value.srcElement.defaultValue;
  }


}
