import { LoginPage } from './../login/login';
import { ForgotPasswordPage } from './../forgot-password/forgot-password';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-client-popover',
  templateUrl: 'client-popover.html',
})
export class ClientPopoverPage {
  public userEmail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    if (localStorage.getItem("currentUser") !== null) {
      this.userEmail = JSON.parse(localStorage.getItem("currentUser")).user[0].email;

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPopoverPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  gotoForgotPassword() {
    this.viewCtrl.dismiss();
    this.navCtrl.push(ForgotPasswordPage);
  }

  onLogout() {
    this.viewCtrl.dismiss();
    localStorage.removeItem('currentUser');

    this.navCtrl.setRoot(LoginPage);
  }
}
