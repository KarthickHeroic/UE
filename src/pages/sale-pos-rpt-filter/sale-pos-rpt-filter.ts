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

  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  }); 
  ionViewDidLoad() {
    // console.log('ionViewDidLoad SalesPosRptPage');
    // this.navBar.backButtonClick = (e:UIEvent)=>{
    //   // todo something
    //   console.log("test");
      
    //   //this.loading.dismiss();
    //  }
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
      this.rTotal = 0;
      console.log(this.getData);
      
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
       this.loading.dismiss();

    }, err => {
      console.error(err);
      this.loading.dismiss();
      this.presentToast();

    });
  }
}
