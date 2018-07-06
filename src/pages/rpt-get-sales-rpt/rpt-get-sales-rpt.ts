import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { ServicesProvider} from './../../providers/services/services';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { LoginPage } from './../../pages/login/login';
/**
 * Generated class for the RptGetSalesRptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rpt-get-sales-rpt',
  templateUrl: 'rpt-get-sales-rpt.html',
})
export class RptGetSalesRptPage {
  fromDate;
  toDate;
  site;
  getData = [];
  setData = [];
  rTotal;
  total;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider, public http: HttpClient, public platform:Platform) {
    this.fromDate = new Date(navParams.get('fromDate'));
    this.toDate = new Date(navParams.get('toDate'));
    this.site = navParams.get('site');
    this.getdata(this.fromDate.toLocaleDateString("en-US"), this.toDate.toLocaleDateString("en-US"), this.site)
  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad RptGetSalesRptPage');
  }
  onLogout(){
    this.service.storageSet();      
    this.navCtrl.push(LoginPage);     
  }
  onExit(){
    this.platform.exitApp(); 
  }
  getdata(fromDate, toDate, site){   
    this.getData = [];

    this.service.getItemSales(fromDate, toDate, site).map(res => res).subscribe(data => { 
      var SubString = data.match(/\[(.*?)\]/);
      this.getData.push(SubString[0]) 
      this.getData = JSON.parse(this.getData[0]);
      console.log(this.getData);
      let MaterialName=null;
          let Mode=null;
          let Mode2=null;
          let TotalMode=null;
          let NL=null;
          let NL2=null;
          let TotalNL=null;
          let NetWt=null;
          let NetWt2=null;
          let TotalNetWt=null;
          let jsonObj=null;
         for ( let i = 0; i < this.getData.length; i++) { 
        
           if(this.getData[i]["MaterialName"]!="")
           {
             MaterialName = this.getData[i]["MaterialName"];
             Mode = this.getData[i]["Mode"];
             NL = this.getData[i]["NL"];
             NetWt = this.getData[i]["NetWt"];            
            }else if(this.getData[i]["Mode"]=="Credit")
            {
              Mode2 = this.getData[i]["Mode"];
              NL2 = this.getData[i]["NL"];
              NetWt2 = this.getData[i]["NetWt"];
            }            
            else if(this.getData[i]["Mode"]=="TL / Sub Total : ")
            {
              TotalMode = this.getData[i]["Mode"];
              TotalNL = this.getData[i]["NL"];
              TotalNetWt = this.getData[i]["NetWt"];

              if(Mode2==null)
              {
                Mode2="Credit ";
                NL2=" 0 ";
                NetWt2=" 0 "
              }

              jsonObj={"MaterialName":MaterialName, "Mode":Mode,"Mode2":Mode2, "TotalMode":TotalMode,"NL":NL,"NL2":NL2,"TotalNL":TotalNL,"NetWt":NetWt,"NetWt2":NetWt2,"TotalNetWt":TotalNetWt}
this.setData.push(jsonObj);

            }              
            
       
    }
  

this.rTotal=0;
      for ( let i = 0; i < this.setData.length; i++) {       
        this.total =  parseFloat(this.setData[i]["TotalNetWt"]); 
        this.rTotal = this.total+this.rTotal;  
    }    
    this.rTotal =  this.rTotal.toFixed(2);

      });
}
}
