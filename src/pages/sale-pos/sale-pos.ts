import { SalePosRptFilterPage } from './../sale-pos-rpt-filter/sale-pos-rpt-filter';
import { SalePosRptPage } from './../sale-pos-rpt/sale-pos-rpt';
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';
import { DatePickerDirective } from 'ion-datepicker';
/**
 * Generated class for the SalePosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sale-pos',
  templateUrl: 'sale-pos.html',
})
export class SalePosPage {
  @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
  public fromDate: Date = new Date();    
  public toDate: Date = new Date();
  public initDate: Date = new Date();  
  fromDateval = new Date().toISOString();
  toDateval = new Date().toISOString();
  Tonnage ="Tonnage";
  All ="All";
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, 
    public service: ServicesProvider) {
      this.fromDate.setDate(this.fromDate.getDate()-1);
      this.toDate.setDate(this.toDate.getDate()-1);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SalesPosPage');
  }
  dateFromChanged(date){
    this.fromDate=date;
      }
      dateToChanged(date){
        this.toDate=date;
          }


  getReport(fromDate, toDate, tonnage, crusher) {
if(crusher=="All"){
  this.navCtrl.push(SalePosRptPage, {
    fromDate: fromDate,
    toDate: toDate,
    tonnage: tonnage,
    crusher: 'ALL'
  });
}
else
{
  this.navCtrl.push(SalePosRptFilterPage, {
    fromDate: fromDate,
    toDate: toDate,
    tonnage: tonnage,
    crusher: crusher
  });
}


  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: "Date",
      subTitle: "Please select Date!",
      buttons: ['Dismiss']
    });
    alert.present();
  }

  getSalesPosRpt(rpt) {

    if (rpt.value.fromDate != "") {
      this.getReport(this.fromDate, this.toDate, rpt.value.tonnage, rpt.value.crusher);
    } else {
      this.presentAlert();
    }

  }
}
