import { QuestionService } from './../../providers/question.service';
import { Category } from './../../models/category';
import { ExamResultAnswersPage } from './../exam-result-answers/exam-result-answers';
import { ExamOverviewPage } from './../exam-overview/exam-overview';
import { Answers } from './../../models/answers';
import { Question } from './../../models/question';
import { growSlowlyAnimation } from './../../helpers/transitions';
import { Exam } from './../../models/exam';
import { ExamService } from './../../providers/exam.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-exam-results',
  templateUrl: 'exam-results.html',
  animations: [growSlowlyAnimation]
})
export class ExamResultsPage {
  public tabCategories: Exam[];
  public categories: string;
  public questions: Question[];
  public param: string;
  public selections: any[] = [];
  public categoryPoints = [];
  public questionArr: any[] = [];
  public categoryTotalScore: string;
  public categoryEarnedScore: string;
  public categoryScore: Category[];
  public answers: Answers[] = [];
  public tabNames: any[] = [];
  public tabs: any[] = [];
  private sub: Subscription;
  private studentGuid: string;

  constructor(private questionService: QuestionService, private examService: ExamService, public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.selections.length = 0;

    if (localStorage.getItem('currentUser') !== null) {
      let majoringId = JSON.parse(localStorage.getItem('currentUser')).user[0].majoring_id;
      this.studentGuid = JSON.parse(localStorage.getItem('currentUser')).user[0].id;

      var values = {
        majoring_id: majoringId,
        selection: navParams.get('selection')
      }

      this.tabs = navParams.get('selectedItem');

      const categoryGuidParams = { exam_guid: navParams.get('guid'), category_names: this.tabs[0].name };

      this.sub = this.examService.getTotalForCategory(categoryGuidParams).subscribe(response => {
        if (response.success == true) {
          this.categoryScore = response.category_score;
        }
      })

      this.sub = this.examService.getSumTotalPoints(categoryGuidParams)
        .subscribe(response => {
          if (response.success == true) {
            this.categoryTotalScore = response.total_score;
          }
        })

      this.sub = this.examService.getEarnedPoints(categoryGuidParams)
        .subscribe(response => {
          if (response.success == true) {
            this.categoryEarnedScore = response.earned_score;
          }
        })

      this.sub = this.questionService.getQuestionIdsFromResults({ guid: navParams.get('guid'), student_guid: this.studentGuid })
        .subscribe(response => {
          if (response.success === true) {
            this.sub = this.questionService.getQuestionByResults(
              {
                question_ids: response.questionids,
                category_names: this.tabs[0].name,
                exam_guid: navParams.get('guid')
              }
            ).subscribe(response => {
              this.questions = response.questions;

              const questions = this.questions;
              const questionIds: any[] = [];

              for (var i in questions) {
                questionIds.push(questions[i].id)
              }

              this.sub = this.examService.getAnswersByQuestion({ question_ids: questionIds }).subscribe(response => {
                if (response.success === true) {
                  this.answers = response.answers;
                }
              })

            });
          }
        })
      this.param = navParams.get('selection');
    }
  }

  gotoAnswer(question: Question) {
    this.navCtrl.push(ExamResultAnswersPage,
      {
        'questionId': question.id,
        'questionName': question.name,
        'myAnswer': question.my_answer_txt,
        'isCorrect': question.iscorrect,
        'isMyAnswer': question.my_answer
      })
  }

  gotoExamOverviewPage() {
    this.navCtrl.push(ExamOverviewPage).then(() => {
      const index = this.viewCtrl.index;
      this.navCtrl.remove(index, 1);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamResultsPage');
  }

}
