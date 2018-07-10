import { SalePosRptPage } from './../sale-pos-rpt/sale-pos-rpt';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, 
    public service: ServicesProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SalesPosPage');
  }



  getReport(fromDate) {
    this.navCtrl.push(SalePosRptPage, {
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

    if (rpt.value.fromDate != "") {
      this.getReport(rpt.value.fromDate);
    } else {
      this.presentAlert();
    }

  }
}