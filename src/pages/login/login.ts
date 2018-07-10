import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavParams, Nav, ViewController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  alertTitle;
  alertSubtitle;

  public rootPage: any = LoginPage;
  constructor(public navParams: NavParams, private alertCtrl: AlertController, public viewCtrl: ViewController, public storage: Storage, public nav: Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: this.alertTitle,
      subTitle: this.alertSubtitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  pushPage() {
    this.storage.set('Status', 'login');
    this.nav.setRoot(HomePage);
   
  }


  Submit(inputs) {
    if (inputs.value.username == "admin") {
      if (inputs.value.password == "admin") {
        this.pushPage()
      }
      else {
        this.alertTitle = "Passowrd"
        this.alertSubtitle = "Password is invalid!"
        this.presentAlert();
      }
    }
    else {
      this.alertTitle = "User Name"
      this.alertSubtitle = "User Name is invalid!"
      this.presentAlert();
    }
  }
}
