import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RptGetSalesRptPage } from './../rpt-get-sales-rpt/rpt-get-sales-rpt';
import { LoginPage } from './../../pages/login/login';
import { ServicesProvider} from './../../providers/services/services';
/**
 * Generated class for the RptItemSalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rpt-item-sales',
  templateUrl: 'rpt-item-sales.html',
})
export class RptItemSalesPage {
  alertTitle;
  alertSubtitle;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController, public platform:Platform,public service: ServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RptItemSalesPage');
  }
  rpt = {}
  getReport(fromDate, toDate, site){
    this.navCtrl.push(RptGetSalesRptPage, {
      fromDate: fromDate,
      toDate: toDate,
      site:site
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
  onLogout(){
    this.service.storageSet();      
    this.navCtrl.push(LoginPage);     
  }
  getCashRpt(rpt) {

    if (rpt.value.fromDate != "")
    {
      if (rpt.value.toDate !="")
           {
            if (rpt.value.site !="")
            {
              this.getReport(rpt.value.fromDate, rpt.value.toDate, rpt.value.site);
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
        this.alertTitle="ToDate"
        this.alertSubtitle ="Please select ToDate!"
        this.presentAlert();
      }
  }
  else
  {
    this.alertTitle="FromDate"
    this.alertSubtitle ="Please select FromDate!"
    this.presentAlert();
  }
  }
}
