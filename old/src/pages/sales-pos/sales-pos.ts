import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { SalesPosRptPage } from '../sales-pos-rpt/sales-pos-rpt';
import { AlertController } from 'ionic-angular';
import { ServicesProvider} from './../../providers/services/services';

import { LoginPage } from './../../pages/login/login';
/**
 * Generated class for the SalesPosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-pos',
  templateUrl: 'sales-pos.html',
})
export class SalesPosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,public platform:Platform,
    public service: ServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesPosPage');
  }

  onLogout(){
    this.service.storageSet();      
    this.navCtrl.push(LoginPage);     
  }
  
  rpt = {}
  getReport(fromDate){
    this.navCtrl.push(SalesPosRptPage, {
      fromDate: fromDate     
    });
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

    if (rpt.value.fromDate != "")
    {
      this.getReport(rpt.value.fromDate);
    }else
    {
this. presentAlert();
    }
  
  }

}
