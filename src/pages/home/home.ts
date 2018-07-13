import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CashPosPage } from '../cash-pos/cash-pos';
import { SalePosPage } from '../sale-pos/sale-pos';
import { ShiftPosPage } from '../shift-pos/shift-pos';
import { SaleItemPage } from '../sale-item/sale-item';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  
  cashReport(){  
    this.navCtrl.push(CashPosPage);
  }
  salesReport() {
    this.navCtrl.push(SaleItemPage);
  }
  shiftReport() {
    this.navCtrl.push(ShiftPosPage);
  }
  salePosReport() {
    this.navCtrl.push(SalePosPage);
  }

}
