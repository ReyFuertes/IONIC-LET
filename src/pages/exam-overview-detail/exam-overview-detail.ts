import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExamStartPage } from '../exam-start/exam-start';

@IonicPage()
@Component({
  selector: 'page-exam-overview-detail',
  templateUrl: 'exam-overview-detail.html',
})
export class ExamOverviewDetailPage {
  public examDetails: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.examDetails = navParams.data['selectedItem'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamOverviewDetailPage');
  }

  beginExam() {
    let payload = {
      selection: this.navParams.data['param'],
      guid: this.navParams.data['selectedItem'][0].guid,
      selectedItem: this.navParams.data['selectedItem']
    }
    this.navCtrl.push(ExamStartPage, payload);
  }

}
