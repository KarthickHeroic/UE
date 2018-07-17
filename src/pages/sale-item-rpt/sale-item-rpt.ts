import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
/**
 * Generated class for the SaleItemRptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sale-item-rpt',
  templateUrl: 'sale-item-rpt.html',
})
export class SaleItemRptPage {
  fromDate;
  toDate;
  site;
  getData = [];
  setData = [];
  csTotal;
  crTotal;  
  Total;
  nlTotal;
  csNL;
  crNL;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider, public http: HttpClient, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.fromDate = new Date(navParams.get('fromDate'));
    this.toDate = new Date(navParams.get('toDate'));
    this.site = navParams.get('site');
    this.getdata(this.fromDate.toLocaleDateString("en-US"), this.toDate.toLocaleDateString("en-US"), this.site)
  }
  ionViewDidLoad() {

    // console.log('ionViewDidLoad RptGetSalesRptPage');
  }
  ionViewDidLeave(){
    this.loading.dismiss();
  }
loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Server Error',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }


  getdata(fromDate, toDate, site) {

    this.loading.present();
    this.getData = [];
    this.service.getItemSales(fromDate, toDate, site).pipe(map(res => res)).subscribe(data => {
      var SubString = data.match(/\[(.*?)\]/);
      this.getData.push(SubString[0])
      this.getData = JSON.parse(this.getData[0]);    
      let MaterialName = null;
      let Mode = null;
      let Mode2 = null;   
      let NL = null;
      let NL2 = null;
      let TotalNL = null;
      let NetWt = null;
      let NetWt2 = null;
      let TotalNetWt = null;
      let jsonObj = null;
      for (let i = 0; i < this.getData.length; i++) {     
        if (this.getData[i]["MaterialName"] != "") {
          MaterialName = this.getData[i]["MaterialName"];
          Mode = this.getData[i]["Mode"];
          NL = this.getData[i]["NL"];
          NetWt = this.getData[i]["NetWt"];
        } else if (this.getData[i]["Mode"] == "Credit") {
        
          Mode2 = this.getData[i]["Mode"];
          NL2 = this.getData[i]["NL"];
          NetWt2 = this.getData[i]["NetWt"];
        }
        else if (this.getData[i]["Mode"] == "TL / Sub Total : ") {
          //TotalMode = this.getData[i]["Mode"];
          TotalNL = this.getData[i]["NL"];
          TotalNetWt = this.getData[i]["NetWt"];

          if (Mode2 == null) {
            Mode2 = "Credit ";
            NL2 = " 0 ";
            NetWt2 = " 0 "
          }
          jsonObj = { "MaterialName": MaterialName, "Mode": Mode, "Mode2": Mode2, "TotalMode": "TL/Sub Total", "NL": NL, "NL2": NL2, "TotalNL": TotalNL, "NetWt": NetWt, "NetWt2": NetWt2, "TotalNetWt": TotalNetWt }
          this.setData.push(jsonObj);
             Mode2 = null;
            NL2 = null;
        }
      }
      
      this.csTotal = 0;
      this.crTotal = 0;     
      this.Total = 0; 
      this.nlTotal=0;
      this.csNL=0;
      this.crNL = 0;

        for (let i = 0; i < this.setData.length; i++) {
        let total1 = parseFloat(  this.setData[i]["NetWt"]).toFixed(3);
        this.csTotal = +total1 + +this.csTotal;
        let total2 = parseFloat(this.setData[i]["NetWt2"]).toFixed(3);
        this.crTotal = +total2 + +this.crTotal;
        let total = parseFloat(this.setData[i]["TotalNetWt"]).toFixed(3);      
        this.Total = +total + +this.Total;


          let nl1 = parseInt(this.setData[i]["NL"]);
          this.csNL = +nl1 + +this.csNL
          let nl2 = parseInt(this.setData[i]["NL2"]);
          this.crNL = +nl2 + +this.crNL
        this.nlTotal = this.nlTotal + parseFloat(this.setData[i]["TotalNL"]);
      }
      this.csTotal = this.csTotal.toFixed(3);
      this.crTotal = this.crTotal.toFixed(3);
      this.Total = this.Total.toFixed(3);
      this.loading.dismiss();
    }, err => {
      this.loading.dismiss();
      this.presentToast()
    });

  }

}
