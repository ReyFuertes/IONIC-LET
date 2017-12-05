import { PromptMsgs } from "./../../helpers/promptMsgs";
import { ExamOverviewPage } from "./../exam-overview/exam-overview";
import { LoginService } from "./../../providers/login.service";
import { AppSettings } from "./../../helpers/app.settings";
import { Component } from "@angular/core";
import {
   IonicPage,
   NavController,
   NavParams,
   ToastController
} from "ionic-angular";
import { RegisterPage } from "../register/register";
import { Subscription } from "rxjs";
import {
   FormGroup,
   FormControl,
   FormBuilder,
   Validators,
   AbstractControl
} from "@angular/forms";

@IonicPage()
@Component({
   selector: "page-login",
   templateUrl: "login.html"
})
export class LoginPage {
   public appTitle: string = AppSettings.AppTitle;
   public username: string = "";
   public password: string = "";
   public isteacher: any;
   public subscription: Subscription;
   public userLoginForm: FormGroup;
   public loginErrorMsg: string = "";
   public invalidFieldMsg: string = "";
   public isLogin: boolean = false;

   constructor(
      private _toastCtrl: ToastController,
      private navCtrl: NavController,
      public navParams: NavParams,
      private formBuilder: FormBuilder,
      private loginService: LoginService
   ) {
      if (localStorage.getItem('currentUser') !== null) {
			if(JSON.parse(localStorage.getItem('currentUser')).success == true) {
            this.isLogin = true;
            this.navCtrl.push(ExamOverviewPage);
         }
      }

      this.userLoginForm = this.formBuilder.group({
         username: [
            "",
            [
               Validators.required,
               Validators.minLength(3),
               Validators.maxLength(35)
            ]
         ],
         password: [
            "",
            [
               Validators.required,
               Validators.minLength(3),
               Validators.maxLength(35)
            ]
         ]
      });

      //watch username value changes
      const emailControl = this.userLoginForm.get("username");
      emailControl.valueChanges
         .debounceTime(1000)
         .subscribe(value => this.setUsernameMessage(emailControl));

      //watch password value changes
      const passwordControl = this.userLoginForm.get("password");
      passwordControl.valueChanges
         .debounceTime(1000)
         .subscribe(value => this.setPasswordMessage(passwordControl));
   }

   ionViewDidLoad() {}

   validationMessages = {
      required: "is required.",
      minlength: "must me at least over 3 characters"
   };

   setUsernameMessage(c: AbstractControl) {
      this.invalidFieldMsg = "";
      if ((c.touched || c.dirty) && c.errors) {
         this.invalidFieldMsg =
            "Username " +
            Object.keys(c.errors)
               .map(key => this.validationMessages[key])
               .join(" ");
      }
   }

   setPasswordMessage(c: AbstractControl) {
      this.invalidFieldMsg = "";
      if ((c.touched || c.dirty) && c.errors) {
         this.invalidFieldMsg =
            "Password " +
            Object.keys(c.errors)
               .map(key => this.validationMessages[key])
               .join(" ");
      }
   }

   onLogin() {
      this.subscription = this.loginService
         .handleUserLogin(this.userLoginForm.value)
         .subscribe(
            response => {
               if (response.success === true) {
                  localStorage.setItem("currentUser", JSON.stringify(response)); //store response in localstorage

                  this.navCtrl.push(ExamOverviewPage);
               } else {
                  this.toastCtrl(`${PromptMsgs.loginFailed}`, "toast-error");
               }
            },
            error => {
               this.toastCtrl(`${PromptMsgs.loginFailed}`, "toast-error");
            }
         );
   }

   gotoRegisterPage(): void {
      this.navCtrl.push(RegisterPage);
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
