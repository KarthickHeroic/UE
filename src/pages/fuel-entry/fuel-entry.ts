import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { ServicesProvider } from './../../providers/services/services';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

/**
 * Generated class for the FuelEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fuel-entry',
  templateUrl: 'fuel-entry.html',
})
export class FuelEntryPage implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
getVehicleDetails=[];
vehicleNumber=[];
driverName=[];


  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider) {

    this.getVDetails()
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuelEntryPage');
  }
  OnfuelEntry(value){
console.log(value);
  }

    ngOnInit() {
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getDriver(){
    this.driverName = [];

   let result= this.getVehicleDetails.filter(proj => proj.RegNo === "TN21AX4273");
   result.forEach(data =>{
    console.log(data["DriverName"]);
   })
  
  }
  

  getVDetails() {
    this.getVehicleDetails = [];  
    this.service.getVehicle().map(res => res).subscribe(data => {
      var SubString = data.match(/\[(.*?)\]/);
      this.getVehicleDetails.push(SubString[0])
      this.getVehicleDetails = JSON.parse(this.getVehicleDetails[0]);
      this.getVehicleDetails.forEach(data =>{ 
        if (this.vehicleNumber.indexOf(data["RegNo"]) == -1) {
          this.vehicleNumber.push(data["RegNo"])
        }     
      });
    });
  }



}
