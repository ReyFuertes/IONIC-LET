import { ExamOverviewPage } from "./../exam-overview/exam-overview";
import { PromptMsgs } from "./../../helpers/promptMsgs";
import { BtnActions } from "./../../helpers/btnActions";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LoginService } from "../../providers/login.service";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { LoginPage } from "../login/login";
import { ViewController } from "ionic-angular/navigation/view-controller";

@IonicPage()
@Component({
  selector: "page-forgot-password",
  templateUrl: "forgot-password.html"
})
export class ForgotPasswordPage {
  public btnResetText: string = BtnActions.resetPassword;
  public isLogin: boolean;
  public subsription: any;
  public msgs: any[] = [];
  public email: any;

  constructor(
    private _toastCtrl: ToastController,
    private loginService: LoginService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
    if (localStorage.getItem("currentUser") != null) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ForgotPasswordPage");
  }

  onSend(frm: any) {
    this.btnResetText = BtnActions.sending;
    this.loginService.sendPasswordReset(frm).subscribe(response => {
      if (response.success === true) {
        this.email = '';

        this.toastCtrl(PromptMsgs.registered, "toast-success");
      } else {
        this.toastCtrl(`${PromptMsgs.generalError}`, "toast-error");
      }

      setTimeout(() => {
        this.btnResetText = BtnActions.resetPassword;
      }, 1000);
    });
  }

  gotoLogin() {
    this.navCtrl.push(LoginPage).then(() => {
      const index = this.viewCtrl.index;
      this.navCtrl.remove(index, 1);
    });
  }

  onBack() {
    if (localStorage.getItem("currentUser")) {
      var is_admin = JSON.parse(localStorage.getItem("currentUser")).user[0]
        .is_admin;

      if (is_admin === 0) {
        this.navCtrl.push(ExamOverviewPage).then(() => {
          const index = this.viewCtrl.index;
          this.navCtrl.remove(index, 1);
        });
      }
    }
  }

  private toastCtrl(msg: string, cssClass: string = null) {
    let toast = this._toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "top",
      cssClass: cssClass
    });
    toast.present();
  }
}
