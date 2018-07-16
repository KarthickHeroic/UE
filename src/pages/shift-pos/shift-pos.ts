import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ShiftPosRptPage } from '../shift-pos-rpt/shift-pos-rpt';
import { ServicesProvider } from './../../providers/services/services';
import { DatePickerDirective } from 'ion-datepicker';

/**
 * Generated class for the ShiftPosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shift-pos',
  templateUrl: 'shift-pos.html',
})
export class ShiftPosPage {
  @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
  public fromDate: Date = new Date();  
  alertTitle;
  alertSubtitle;
  fromDateval = new Date().toISOString();
  All= "All"
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public service: ServicesProvider) {
    this.fromDate.setDate(this.fromDate.getDate()-1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RptShiftPage');
  }

  rpt = {}
  getReport(fromDate, shift, site) {
    this.navCtrl.push(ShiftPosRptPage, {
      fromDate: fromDate,
      shift: shift,
      site: site
    });
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: this.alertTitle,
      subTitle: this.alertSubtitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  dateFromChanged(date){
    this.fromDate=date;
      }
  getShiftRpt(rpt) {

    if (rpt.value.fromDate != "") {
      if (rpt.value.Shift != "") {
        if (rpt.value.site != "") {
          this.getReport(this.fromDate, rpt.value.Shift, rpt.value.site);
        }
        else {
          this.alertTitle = "Site"
          this.alertSubtitle = "Please select site!"
          this.presentAlert();
        }
      }
      else {
        this.alertTitle = "Shift"
        this.alertSubtitle = "Please select Shift!"
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
