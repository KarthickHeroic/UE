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
  options: string[];
  filteredOptions: Observable<string[]>;
getVehicleDetails=[];
vehicleNumber=[];
getvehicleNumber;
driverName=[];


  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider) {

    this.getVDetails()
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuelEntryPage');
  }
  OnfuelEntry(value){
    console.log(value);
    console.log(value.value);
    console.log( this.getvehicleNumber);
    
  }
    ngOnInit() {
      
  }

  private _filter(value: string): string[] {
    this.getvehicleNumber=value;
    const filterValue = value.toLowerCase();
    let result= this.getVehicleDetails.filter(proj => proj.RegNo === value);
    this.driverName=[];
    result.forEach(data =>{
      this.driverName.push(data["DriverName"]);

    })
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  

  getVDetails() {
  //  this.options=[];
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
      this.options = this.vehicleNumber;    
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );        
    });
  }
}
