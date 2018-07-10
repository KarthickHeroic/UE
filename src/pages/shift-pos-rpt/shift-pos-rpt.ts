import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';
import { map } from 'rxjs/operators';
/**
 * Generated class for the ShiftPosRptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shift-pos-rpt',
  templateUrl: 'shift-pos-rpt.html',
})
export class ShiftPosRptPage {
  fromDate;
  shift;
  site;
  total;
  rTotal;
  getData = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider, private toastCtrl: ToastController) {
    this.fromDate = new Date(navParams.get('fromDate'));
    this.shift = navParams.get('shift');
    this.site = navParams.get('site');
    this.getdata(this.fromDate.toLocaleDateString("en-US"), this.shift, this.site)
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RptGetShiftRptPage');
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Server Error',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  getdata(fromDate, Shift, site) {
    this.getData = [];

    this.service.getShiftPos(fromDate, Shift, site).pipe(map(res => res)).subscribe(data => {
      var SubString = data.match(/\[(.*?)\]/);
      this.getData.push(SubString[0])
      this.getData = JSON.parse(this.getData[0]);
      this.rTotal = 0;
      for (let i = 0; i < this.getData.length; i++) {
        this.total = parseFloat(this.getData[i]["Amount"]);
        this.rTotal = this.total + this.rTotal;
      }
      this.rTotal = this.rTotal.toFixed(2);

    },
      err => {
        this.presentToast()
      });

  }

}
