import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RptGetShiftRptPage } from './../rpt-get-shift-rpt/rpt-get-shift-rpt';
import { LoginPage } from './../../pages/login/login';
import { ServicesProvider} from './../../providers/services/services';
/**
 * Generated class for the RptShiftPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rpt-shift',
  templateUrl: 'rpt-shift.html',
})
export class RptShiftPage {
  alertTitle;
  alertSubtitle;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public platform:Platform,public service: ServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RptShiftPage');
  }

  rpt = {}
  getReport(fromDate, shift, site){
    this.navCtrl.push(RptGetShiftRptPage, {
      fromDate: fromDate,
      shift: shift,
      site:site
    });
  }
  onLogout(){
    this.service.storageSet();      
    this.navCtrl.push(LoginPage);     
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: this.alertTitle,
      subTitle: this.alertSubtitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  getShiftRpt(rpt) {
 
    if (rpt.value.fromDate != "")
    {
      if (rpt.value.Shift !="")
           {
            if (rpt.value.site !="")
            {
              this.getReport(rpt.value.fromDate, rpt.value.Shift, rpt.value.site);
            }
            else
            {
              this.alertTitle="Site"
              this.alertSubtitle ="Please select site!"
              this.presentAlert();
            }
      }  
      else
      {
        this.alertTitle="Shift"
        this.alertSubtitle ="Please select Shift!"
        this.presentAlert();
      }
  }
  else
  {
    this.alertTitle="FromDate"
    this.alertSubtitle ="Please select FromDate!"
    this.presentAlert();
  }
    console.log(rpt)     
  }

}
