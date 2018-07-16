import { Component, Pipe, PipeTransform,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,Navbar  } from 'ionic-angular';
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
  @ViewChild(Navbar) navBar: Navbar;
    fromDate;
  toDate;
  tonnage;
  crusher;
  getData = [];
  setData = [];
  jsonHead={};
  total;
  TotalSite1;
  TotalSite2;
  TotalSite3;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController
  ) {

    this.fromDate = new Date(navParams.get('fromDate'));
    this.toDate = new Date(navParams.get('toDate'));
    this.tonnage = navParams.get('tonnage');
    this.crusher = navParams.get('crusher');
    this.getdata(this.fromDate.toLocaleDateString("en-US"), this.toDate.toLocaleDateString("en-US"), this.tonnage, this.crusher)
   //this.getdatadummy();
  }

  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  }); 
  ionViewDidLoad() {

  }
  
  ionViewDidLeave(){
    this.loading.dismiss();
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
      this.TotalSite1 = 0;
      this.TotalSite2 = 0;
      this.TotalSite3 = 0;
      console.log(this.getData);
   
     
      for (let i = 1; i < this.getData.length; i++) {
        let C1Total;
        let C2Total;
        let C3Total;
        if (this.getData[i]["C0"]!= "Net Total") {
          C1Total = this.getData[i]["C1"];
          C2Total = this.getData[i]["C2"];
          C3Total = this.getData[i]["C3"];
        }
        else {
          C1Total = '0.00';
          C2Total = '0.00';
          C3Total = '0.00';
        }
        this.TotalSite1 = +C1Total + +this.TotalSite1;
        this.TotalSite2 = +C2Total + +this.TotalSite2;
        this.TotalSite3 = +C3Total + +this.TotalSite3;
      }
      this.TotalSite1 = this.TotalSite1.toFixed(3);
      this.TotalSite2 = this.TotalSite2.toFixed(3);
      this.TotalSite3 = this.TotalSite3.toFixed(3);
     
      if(this.tonnage=="Amount")
      {
        for (let i = 0; i < 1; i++) {
          this.getData[i]["C1"] = "₹" + this.getData[i]["C1"];
          this.getData[i]["C2"] = "₹" + this.getData[i]["C2"];
          this.getData[i]["C3"] = "₹" + this.getData[i]["C3"];
        }       
      }
      
       this.loading.dismiss();

    }, err => {
      console.error(err);
      this.loading.dismiss();
      this.presentToast();

    });
  }
}
