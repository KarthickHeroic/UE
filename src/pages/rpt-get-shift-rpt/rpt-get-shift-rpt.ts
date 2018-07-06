import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ServicesProvider} from './../../providers/services/services';
import { LoginPage } from './../../pages/login/login';
/**
 * Generated class for the RptGetShiftRptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rpt-get-shift-rpt',
  templateUrl: 'rpt-get-shift-rpt.html',
})
export class RptGetShiftRptPage {
  fromDate;
  shift;
  site;
  total;
  rTotal;
  getData = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider,public platform:Platform) {
    this.fromDate = new Date(navParams.get('fromDate'));
    this.shift = navParams.get('shift');
    this.site = navParams.get('site');
    this.getdata(this.fromDate.toLocaleDateString("en-US"), this.shift, this.site)
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RptGetShiftRptPage');
  }
  onLogout(){
    this.service.storageSet();      
    this.navCtrl.push(LoginPage);     
  }
  onExit(){
    this.platform.exitApp(); 
  }

  
  getdata(fromDate, Shift, site){   
    this.getData = [];

    this.service.getShiftPos(fromDate, Shift, site).map(res => res).subscribe(data => { 
      var SubString = data.match(/\[(.*?)\]/);
      this.getData.push(SubString[0]) 
      this.getData = JSON.parse(this.getData[0]);
      console.log(this.getData);       
  

this.rTotal=0;
      for ( let i = 0; i < this.getData.length; i++) {       
        this.total =  parseFloat(this.getData[i]["Amount"]); 
        this.rTotal = this.total+this.rTotal;  
    }    
    this.rTotal =  this.rTotal.toFixed(2);

      });
}

}
