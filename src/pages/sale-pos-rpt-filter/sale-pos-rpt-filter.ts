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

  updateJson(initVal,maxVal){
    let j =0;
    for (let i = initVal; i < maxVal; i++) { 
     
      this.jsonHead["SN"+j.toString()]=this.getData[i]["SN"];
      this.setJson1[j]= this.getData[i]["CS"];
      this.setJson2[j]= this.getData[i]["CR"];
      this.setJson3[j]= this.getData[i]["NT"];
      this.setJson4[j]= this.getData[i]["MCS"];
      this.setJson5[j]= this.getData[i]["MCR"];
      this.setJson6[j]= this.getData[i]["MNT"];
      this.setJson7[j]= this.getData[i]["PCS"];
      this.setJson8[j]= this.getData[i]["PCR"];
      this.setJson9[j]= this.getData[i]["PNT"];
      this.setJson10[j]= this.getData[i]["OCS"];
      this.setJson11[j]= this.getData[i]["OCR"];
      this.setJson12[j]= this.getData[i]["ONT"] ;
      j++;
    }

    this.setJson1["3"]= "Total Cash";
      this.setJson2["3"]="Total Credit";
      this.setJson3["3"]="NET Total";
      this.setJson4["3"]="MSAND Cash";
      this.setJson5["3"]="MSAND Credit";
      this.setJson6["3"]="NET Credit";
      this.setJson7["3"]="PSAND Cash";
      this.setJson8["3"]="PSAND Credit";
      this.setJson9["3"]="NET Credit";
      this.setJson10["3"]="Other Cash";
      this.setJson11["3"]="Other Credit";
      this.setJson12["3"]="NET Total";

    this.setData.push(this.jsonHead);
    this.setData.push(this.setJson1);
    this.setData.push(this.setJson2);
    this.setData.push(this.setJson3);
    this.setData.push(this.setJson4);
    this.setData.push(this.setJson5);
    this.setData.push(this.setJson6);
    this.setData.push(this.setJson7);
    this.setData.push(this.setJson8);
    this.setData.push(this.setJson9);
    this.setData.push(this.setJson10);
    this.setData.push(this.setJson11);
    this.setData.push(this.setJson12);
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
      console.log(this.getData);
       
      // if (crusher == "Crusher") {
      //   this.updateJson(0,3);
      // }
      // else if (this.crusher == "Yard") {       
      //   this.updateJson(3,6);
      // }
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
