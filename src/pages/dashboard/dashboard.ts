import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CashPosPage } from './../cash-pos/cash-pos'
import { Storage } from '@ionic/storage';
import { RptItemSalesPage } from './../rpt-item-sales/rpt-item-sales';
import { RptShiftPage } from './../rpt-shift/rpt-shift';
import { SalesPosRptPage } from './../sales-pos-rpt/sales-pos-rpt';
import { LoginPage } from './../login/login';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public platform:Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  cashReport(){  
    this.navCtrl.push(CashPosPage);
  }
  salesReport() {
    this.navCtrl.push(RptItemSalesPage);
  }
  shiftReport() {
    this.navCtrl.push(RptShiftPage);
  }
  salePosReport() {
    this.navCtrl.push(SalesPosRptPage);
  }
  onLogout(){
    this.storage.set('Status', 'logout'); 
    this.navCtrl.push(LoginPage);
  }
  onExit(){
    this.platform.exitApp(); 
  }
}
