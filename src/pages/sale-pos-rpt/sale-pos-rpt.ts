import { SalePosPage } from './../sale-pos/sale-pos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';
import { map } from 'rxjs/operators';
/**
 * Generated class for the SalePosRptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sale-pos-rpt',
  templateUrl: 'sale-pos-rpt.html',
})
export class SalePosRptPage {
  fromDate;
  toDate;
  tonnage;
  crusher;
  getData = [];
  total;
  csTotal;
  crTotal;
  rTotal;
  headTotal="Total";
  Cash="Cash";
  Credit="Credit";

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider, private toastCtrl: ToastController,public loadingCtrl: LoadingController
  ) {
    this.fromDate = new Date(navParams.get('fromDate'));
    this.toDate = new Date(navParams.get('toDate'));
    this.tonnage = navParams.get('tonnage');
    this.crusher = navParams.get('crusher');
    this.getdata(this.fromDate.toLocaleDateString("en-US"), this.toDate.toLocaleDateString("en-US"), this.tonnage, this.crusher)
  }
  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  ionViewDidLeave(){
    this.loading.dismiss();
  }
  onSearch() {
    this.navCtrl.push(SalePosPage);
  }
  ionViewDidLoad() {
     console.log('ionViewDidLoad SalesPosRptPage');
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
  
  
    this.loading.present();  
    this.getData = [];
    this.service.getSalesPos(fromDate, toDate, tonnage, crusher).pipe(map(res => res)).subscribe(data => {
      var SubString = data.match(/\[(.*?)\]/);
      this.getData.push(SubString[0])
      this.getData = JSON.parse(this.getData[0]);
      this.rTotal = 0;
      this.csTotal = 0;
      this.crTotal = 0;      
      for (let i = 0; i < this.getData.length; i++) {
        let cstotal;
        let crtotal;
        if (this.getData[i]["NT"] != "") {
          this.total = parseFloat(this.getData[i]["NT"]).toFixed(3);
        }
        else {
          this.total = '0.00';
        }
        if (this.getData[i]["CS"] != "") {
          cstotal = parseFloat(this.getData[i]["CS"]).toFixed(3);
        }
        else {
          cstotal = '0.00';
        }
        if (this.getData[i]["CR"] != "") {
          crtotal = parseFloat(this.getData[i]["CR"]).toFixed(3);
        }
        else {
          crtotal = '0.00';
        }
        
        this.rTotal = +this.total + +this.rTotal;
        this.csTotal = +cstotal + +this.csTotal;
        this.crTotal = +crtotal + +this.crTotal;
      }

      if(this.tonnage=="Amount")
      {
        this.headTotal="₹ Total";
        this.Cash="₹ Cash";
        this.Credit="₹ Credit";
        this.rTotal = this.rTotal.toFixed(2);
        this.crTotal = this.crTotal.toFixed(2);
        this.csTotal = this.csTotal.toFixed(2);
      }
      else
      {
        this.headTotal="Total";
        this.Cash="Cash";
        this.Credit="Credit";
        this.rTotal = this.rTotal.toFixed(3);
        this.crTotal = this.crTotal.toFixed(3);
        this.csTotal = this.csTotal.toFixed(3);
      }
     
      this.loading.dismiss();
    }, error => {
      this.presentToast();
      this.loading.dismiss();
    });
  }
}