import { Component, Pipe, PipeTransform } from '@angular/core';
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

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}
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
  jsonHead={};
  initVal:number;
  maxVal:number;
  setJson1 = {};setJson2 = {};setJson3 = {};setJson4 = {};setJson5 = {};setJson6 = {};
  setJson7 = {};setJson8 = {};setJson9 = {};setJson10 ={};setJson11 ={};setJson12 ={};
  setDataHead = [];
  total;
  rTotal;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController
  ) {

    this.fromDate = new Date(navParams.get('fromDate'));
    this.toDate = new Date(navParams.get('toDate'));
    this.tonnage = navParams.get('tonnage');
    this.crusher = navParams.get('crusher');
    this.getdata(this.fromDate.toLocaleDateString("en-US"), this.toDate.toLocaleDateString("en-US"), this.tonnage, this.crusher)
   //this.getdatadummy();
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
    //  data= data.replace(/(\r\n\t|\n|\r\t)/gm,"");
      var SubString = data.match(/\[(.*?)\]/);
      this.getData.push(SubString[0])
      this.getData = JSON.parse(this.getData[0]);    
      this.rTotal = 0;
      for (let i = 1; i < this.getData.length; i++) {
        if (this.getData[i]["C0"]!= "Net Total") {
          this.total = this.getData[i]["C3"];
        }
        else {
          this.total = '0.00';
        }
        this.rTotal = +this.total + +this.rTotal;
      }
      this.rTotal = this.rTotal.toFixed(2);
       loading.dismiss();

    }, err => {
      this.presentToast();

    });
  }
}
