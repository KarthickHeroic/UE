import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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
  NLTotal;
  tonTotal
  getData = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.fromDate = new Date(navParams.get('fromDate'));
    this.shift = navParams.get('shift');
    this.site = navParams.get('site');
    this.getdata(this.fromDate.toLocaleDateString("en-US"), this.shift, this.site)
  }
  loading = this.loadingCtrl.create({     
    content: 'Please Wait...'
  });
  ionViewDidLoad() {
    // console.log('ionViewDidLoad RptGetShiftRptPage');
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
  getdata(fromDate, Shift, site) {
  
    this.loading.present();
    this.getData = [];  
    this.service.getShiftPos(fromDate, Shift, site).pipe(map(res => res)).subscribe(data => {
      var SubString = data.match(/\[(.*?)\]/);
      this.getData.push(SubString[0])
      this.getData = JSON.parse(this.getData[0]);   
      console.log(this.getData)
      this.rTotal = 0;           
        let amount1 = parseFloat(this.getData[0]["Amount1"]);
        let amount2 = parseFloat(this.getData[0]["Amount2"]);   
        let Nl1 = parseFloat(this.getData[0]["NL1"]);
        let Nl2 = parseFloat(this.getData[0]["NL2"]);
        let Ton1 = parseFloat(this.getData[0]["Ton1"]);
        let Ton2 = parseFloat(this.getData[0]["Ton2"]);
        this.rTotal = amount1+amount2;
        this.rTotal = amount1+amount2;
        this.NLTotal = Nl1+Nl2;
        this.tonTotal= Ton1+Ton2;
        this.tonTotal = this.tonTotal.toFixed(3);     
      this.rTotal = this.rTotal.toFixed(2);
      this.loading.dismiss();
    },
    error => {
      console.log(error);
      this.loading.dismiss();
      this.presentToast()
    });

  }

}
