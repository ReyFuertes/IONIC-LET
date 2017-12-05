import { ExamStartPage } from './../exam-start/exam-start';
import { ExamOverviewDetailPage } from './../exam-overview-detail/exam-overview-detail';
import { ClientPopoverPage } from './../client-popover/client-popover';
import { ExamService } from './../../providers/exam.service';
import { Exam } from './../../models/exam';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { PopoverController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-exam-overview',
  templateUrl: 'exam-overview.html',
})

export class ExamOverviewPage {
  public examCategories: Exam[];
  public timeLimit: any;
  private sub: Subscription;
  private param: string;

  constructor(public loadingCtrl: LoadingController, public popoverCtrl: PopoverController, private examService: ExamService, private navCtrl: NavController) {
    if (localStorage.getItem('currentUser') != null) {
      localStorage.removeItem('examSession');
      localStorage.removeItem('resultsUrl');

      var majoringId = JSON.parse(localStorage.getItem('currentUser')).user[0].majoring_id;

      if (majoringId === null) {
        this.param = 'secondary';
      } else {
        this.param = 'elementary';
      }

      var values = {
        majoring_id: majoringId,
        selection: this.param
      }

      this.sub = this.examService.getTabCategories(values).subscribe(response => {
        this.examCategories = response.categories;
      })

    } else {
      this.navCtrl.pop();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamOverviewPage');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ClientPopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1500
    });
    loader.present();
  }

  gotoDetail(id: string) {
    let selectedItem = this.examCategories.filter(el => el.id === id);
    let payload = {
      selectedItem: selectedItem,
      param: this.param
    }
    this.navCtrl.push(ExamOverviewDetailPage, payload);
  }

}
