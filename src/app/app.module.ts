import { QuestionService } from './../providers/question.service';
import { ExamResultAnswersPage } from './../pages/exam-result-answers/exam-result-answers';
import { ExamResultsPage } from './../pages/exam-results/exam-results';
import { ExamStartPage } from './../pages/exam-start/exam-start';
import { ExamOverviewDetailPage } from './../pages/exam-overview-detail/exam-overview-detail';
import { ForgotPasswordPage } from './../pages/forgot-password/forgot-password';
import { ClientPopoverPage } from './../pages/client-popover/client-popover';
import { ExamOverviewPage } from './../pages/exam-overview/exam-overview';
import { TimerService } from './../providers/time.service';
import { ExamService } from './../providers/exam.service';
import { LoginService } from './../providers/login.service';
import { MajoringService } from './../providers/majoring.service';
import { RegisterPage } from './../pages/register/register';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    LoginPage,
    RegisterPage,
    ExamOverviewPage,
    ClientPopoverPage,
    ForgotPasswordPage,
    ExamOverviewDetailPage,
    ExamStartPage,
    ExamResultsPage,
    ExamResultAnswersPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    LoginPage,
    RegisterPage,
    ExamOverviewPage,
    ClientPopoverPage,
    ForgotPasswordPage,
    ExamOverviewDetailPage,
    ExamStartPage,
    ExamResultsPage,
    ExamResultAnswersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MajoringService,
    LoginService,
    ExamService,
    TimerService,
    QuestionService
  ]
})

export class AppModule { }
