import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';
import { map } from 'rxjs/operators';
/**
 * Generated class for the SalePosRptFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sale-pos-rpt-filter',
  templateUrl: 'sale-pos-rpt-filter.html',
})
export class SalePosRptFilterPage {
    fromDate;
  toDate;
  tonnage;
  crusher;
  getData = [];
  setData = [];
  total;
  rTotal;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController
  ) {

    this.fromDate = new Date(navParams.get('fromDate'));
    this.toDate = new Date(navParams.get('toDate'));
    this.tonnage = navParams.get('tonnage');
    this.crusher = navParams.get('crusher');
    this.getdata(this.fromDate.toLocaleDateString("en-US"), this.toDate.toLocaleDateString("en-US"), this.tonnage, this.crusher)
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad SalesPosRptPage');
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Server Error',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  getdata(fromDate, toDate, tonnage, crusher) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.getData = [];

    this.service.getSalesPos(fromDate, toDate, tonnage, crusher).pipe(map(res => res)).subscribe(data => {
      var SubString = data.match(/\[(.*?)\]/);
      this.getData.push(SubString[0])
      this.getData = JSON.parse(this.getData[0]);
       console.log(this.getData);  
      if (crusher == "Crusher") {
        for (let i = 0; i < 3; i++) {  
          this.setData.push(this.getData[i]);
        }

        console.log(this.setData)

        //  jsonObj = { "MaterialName": MaterialName, "Mode": Mode, "Mode2": Mode2, "TotalMode": "TL/Sub Total", "NL": NL, "NL2": NL2, "TotalNL": TotalNL, "NetWt": NetWt, "NetWt2": NetWt2, "TotalNetWt": TotalNetWt }

      }
      else if (this.crusher == "Yard") {
       

      }
      




      // this.rTotal = 0;
      // for (let i = 0; i < this.getData.length; i++) {
      //   if (this.getData[i]["NT"] != "") {
      //     this.total = parseFloat(this.getData[i]["NT"]);
      //   }
      //   else {
      //     this.total = '0.00';
      //   }
      //   this.rTotal = +this.total + +this.rTotal;
      // }
      // this.rTotal = this.rTotal.toFixed(2);
      loading.dismiss();
    }, err => {
      this.presentToast();

    });
  }
}
