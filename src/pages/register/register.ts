
import { PromptMsgs } from './../../helpers/promptMsgs';
import { LoginService } from './../../providers/login.service';
import { BtnActions } from './../../helpers/btnActions';
import { UserRegistration } from './../../models/UserRegister';
import { MajoringService } from './../../providers/majoring.service';
import { Majoring } from './../../models/majoring';
import { AppSettings } from './../../helpers/app.settings';
import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms'

@IonicPage()
@Component({
   selector: 'page-register',
   templateUrl: 'register.html'
})
export class RegisterPage {
   public appTitle: string = AppSettings.AppTitle;
   public userRegistration: UserRegistration = new UserRegistration();
   public userRegistrationForm: FormGroup;
   public subscription: Subscription;
   public msgs: any[] = [];
   public btnRegisterText: string = BtnActions.register;
   public majorings: Majoring[];
   public address: string = '';
   public invalidFieldMsg: string = '';
   public isRegistering: boolean = true;

   private validationMessages = {
      required: 'Field is required.',
      minlength: 'must me at least over 3 characters'
   };

   constructor(private _loadingCtrl: LoadingController, private _toastCtrl: ToastController, private navCtrl: NavController, private loginService: LoginService, private majoringService: MajoringService, private formBuilder: FormBuilder) {
      this.subscription = this.majoringService.getMajorings().subscribe(response => {
         if (response.success === true) {
            this.majorings = response.majorings;
         }
      })

      this.userRegistrationForm = this.formBuilder.group({
         username: ['', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(35)]
         ],
         password: ['', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(35)]
         ],
         email: ['', [
            Validators.required,
            Validators.email,
            Validators.minLength(4),
            Validators.maxLength(35)]
         ],
         school: ['', [
            Validators.minLength(4),
            Validators.maxLength(155)]
         ],
         fullname: ['', [
            Validators.minLength(4),
            Validators.maxLength(35)]
         ],
         contact: ['', [
            Validators.maxLength(35)]
         ],
         address: ['', [
            Validators.maxLength(255)]
         ],
         majoring: ['', []
         ]
      })

      //watch username value changes
      const usernameControl = this.userRegistrationForm.get('username');
      usernameControl.valueChanges.debounceTime(1000).subscribe(value => this.setUsernameMessage(usernameControl))

      //watch password value changes
      const passwordControl = this.userRegistrationForm.get('password');
      passwordControl.valueChanges.debounceTime(1000).subscribe(value => this.setPasswordMessage(passwordControl))

      //watch email value changes
      const emailControl = this.userRegistrationForm.get('email');
      emailControl.valueChanges.debounceTime(1000).subscribe(value => this.setEmailMessage(emailControl))
   }

   setUsernameMessage(c: AbstractControl) {
      this.invalidFieldMsg = '';
      if ((c.touched || c.dirty) && c.errors) {
         this.invalidFieldMsg = 'Username ' + Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
      }
   }

   setPasswordMessage(c: AbstractControl) {
      this.invalidFieldMsg = '';
      if ((c.touched || c.dirty) && c.errors) {
         this.invalidFieldMsg = 'Password ' + Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
      }
   }

   setEmailMessage(c: AbstractControl) {
      this.invalidFieldMsg = '';
      if ((c.touched || c.dirty) && c.errors) {
         this.invalidFieldMsg = 'Invalid Email ' + Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
      }
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad RegisterPage');
   }

   gotoLoginPage() {
      this.navCtrl.pop();
   }

   onRegister() {
      this.loadingCtrl();
      
      this.btnRegisterText = BtnActions.registering;
      this.isRegistering = true;

      this.subscription = this.loginService.handleUserRegistration(this.userRegistrationForm.value).subscribe(response => {
         
         if (response.success === true) {

            this.toastCtrl(PromptMsgs.registered, 'toast-success');

            setTimeout(() => {
               this.isRegistering = false;
               this.userRegistrationForm.reset();
               this.btnRegisterText = BtnActions.register;
               this.gotoLoginPage();
            }, 3000);

         } else if (response.success === false) {
            this.toastCtrl(`${PromptMsgs.registerFailed}: ${response.message}`, 'toast-error');

         }

         this.btnRegisterText = BtnActions.register;
      },
         error => {
            this.toastCtrl(PromptMsgs.registerFailed, 'toast-error');
         });
   }

   private toastCtrl(msg: string, cssClass: string = null) {
      let toast = this._toastCtrl.create({
         message: msg,
         duration: 3000,
         position: 'top',
         cssClass: cssClass 
      });
      toast.present();
   }

   private loadingCtrl() {
      let loader = this._loadingCtrl.create({
         content: "Please wait...",
         duration: 3000
      });
      loader.present();
   }



}
