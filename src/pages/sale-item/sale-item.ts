import { SaleItemRptPage } from './../sale-item-rpt/sale-item-rpt';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';

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
  alertTitle;
  alertSubtitle;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public service: ServicesProvider) {
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
          this.getReport(rpt.value.fromDate, rpt.value.toDate, rpt.value.site);
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
