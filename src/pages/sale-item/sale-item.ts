import { SaleItemRptPage } from './../sale-item-rpt/sale-item-rpt';
import { Component,  ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';
import { DatePickerDirective } from 'ion-datepicker';

/**
 * Generated class for the SaleItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sale-item',
  templateUrl: 'sale-item.html',
})

export class SaleItemPage {
  @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
  public fromDate: Date = new Date();  
  
  public toDate: Date = new Date();
  public initDate: Date = new Date();  
  alertTitle;
  alertSubtitle;
  // fromDateval = new Date().toISOString()
  // toDateval = new Date().toISOString();
  // fromDate;
  // toDate;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public service: ServicesProvider) {
  this.fromDate.setDate(this.fromDate.getDate()-1);
  this.toDate.setDate(this.toDate.getDate()-1);
  }
  public closeDatepicker(){
    this.datepicker.modal.dismiss();
}


  ionViewDidLoad() {       
    console.log('ionViewDidLoad RptItemSalesPage');
  }
  rpt = {}
  getReport(fromDate, toDate, site) {
    this.navCtrl.push(SaleItemRptPage, {
      fromDate: fromDate,
      toDate: toDate,
      site: site
    });
  }

  dateFromChanged(date){
this.fromDate=date;
  }
  dateToChanged(date){
    this.toDate=date;
      }
    


  presentAlert() {
    let alert = this.alertCtrl.create({
      title: this.alertTitle,
      subTitle: this.alertSubtitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  getCashRpt(rpt) {

    if (rpt.value.fromDate != "") {
      if (rpt.value.toDate != "") {
        if (rpt.value.site != "") {   
          this.getReport( this.fromDate, this.toDate, rpt.value.site,);
        }
        else {
          this.alertTitle = "Site"
          this.alertSubtitle = "Please select site!"
          this.presentAlert();
        }
      }
      else {
        this.alertTitle = "ToDate"
        this.alertSubtitle = "Please select ToDate!"
        this.presentAlert();
      }
    }
    else {
      this.alertTitle = "FromDate"
      this.alertSubtitle = "Please select FromDate!"
      this.presentAlert();
    }
  }
}
