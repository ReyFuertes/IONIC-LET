import { Answers } from './../../models/answers';
import { ExamService } from './../../providers/exam.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs';

@IonicPage()
@Component({
   selector: 'page-exam-result-answers',
   templateUrl: 'exam-result-answers.html',
})
export class ExamResultAnswersPage {
   public answers: Answers[] = [];
   public questionName: string = '';
   public myAnswerTxt: string = '';
   public isCorrect: string = '';
   public isMyAnswer: string = '';
   
   private sub: Subscription;
   
   constructor(private examService: ExamService, public navCtrl: NavController, public navParams: NavParams) {
      this.questionName = navParams.get('questionName');
      this.myAnswerTxt = navParams.get('myAnswer');
      this.isCorrect = navParams.get('isCorrect');
      this.isMyAnswer = navParams.get('isMyAnswer');

      this.sub = this.examService.getAnswersByQuestion({ question_ids: navParams.get('questionId') }).subscribe(response => {
         if (response.success === true) {
            this.answers = response.answers;
         }
      })
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad ExamResultAnswersPage');
   }

   return() {
      return false;
   }

}
