import { LoginPage } from "./../login/login";
import { ExamResultsPage } from "./../exam-results/exam-results";
import { BtnActions } from "./../../helpers/btnActions";
import { ExamService } from "./../../providers/exam.service";
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { Subscription } from "rxjs";
import { Exam } from "./../../models/exam";
import { Question } from "./../../models/question";
import { Answers } from "./../../models/answers";
import { NgSwitchCase } from "@angular/common";
import { PromptMsgs } from "./../../helpers/promptMsgs";
import { growSlowlyAnimation } from "./../../helpers/transitions";
import { ViewController } from "ionic-angular/navigation/view-controller";

@IonicPage()
@Component({
  selector: "page-exam-start",
  templateUrl: "exam-start.html",
  animations: [growSlowlyAnimation]
})
export class ExamStartPage {
  public tabCategories: Exam[];
  public questions: Question[];
  public answers: Answers[] = [];
  public param: string;
  public student_guid: string = "";
  public value: number = 0;
  public btnSubmitText = BtnActions.submit;
  public questionArr: any[] = [];
  public timeLimit: any;
  public isTimeEnded: boolean = false;
  public selections: any[] = [];
  public categories: string;
  private sub: Subscription;

  constructor(private _toastCtrl: ToastController, private examService: ExamService,
    public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    if (localStorage.getItem("currentUser") == null) {
      this.navCtrl.push(LoginPage).then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index, 1);
      });
    }

    this.selections.length = 0;

    if (localStorage.getItem("currentUser") !== null) {
      var majoring_id = JSON.parse(localStorage.getItem("currentUser")).user[0].majoring_id;

      localStorage.setItem("examSession", "1");

      this.student_guid = JSON.parse(localStorage.getItem("currentUser")).user[0].id;

      var payload = {
        majoring_id: majoring_id,
        selection: navParams.get("selection"),
        guid: navParams.get('guid')
      };

      this.sub = this.examService.getTabMajoringCategory(payload)
        .subscribe(response => {
          if (response.success == true) {
            this.tabCategories = response.categories;

            this.categories = this.tabCategories[0].id;

            const tabs = this.tabCategories;
            const tabNames: any[] = [];

            for (var i in tabs) {
              tabNames.push(tabs[i].name);
            }

            this.sub = this.examService
              .getExamQuestionsByCategory({
                category_majoring: tabNames
              })
              .subscribe(response => {
                this.questions = response.questions;

                const questions = this.questions;
                const questionIds: any[] = [];

                for (var i in questions) {
                  var idx = 0;
                  for (var o in questions[i]) {
                    idx++;
                    questionIds.push(questions[i][o].id);

                    questions[i][o].idx = idx;

                    this.questionArr.push(questions[i][o]);
                  }
                }

                this.sub = this.examService
                  .getAnswersByQuestion({ question_ids: questionIds })
                  .subscribe(response => {
                    if (response.success === true) {
                      this.answers = response.answers;
                    }
                  });
              });
          }
        });
      this.param = navParams.get("selection");
    }
  }

  loadSelections() {
    for (var i in this.selections) {
      for (var o in this.answers) {
        if (this.answers[o].id == this.selections[i].id) {
          this.answers[o] = this.selections[i];
        }
      }
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ExamStartPage");
  }

  onSubmit() {
    let selectionCount = 0;
    const questionCount = this.questionArr.length;

    for (var x in this.selections) {
      selectionCount++;
    }

    if (questionCount > selectionCount) {
      this.toastCtrl(
        `Please answer all questions before submitting!`,
        "toast-error"
      );
      return;
    }

    let myAnswers = this.answers;

    for (var o in myAnswers) {
      for (var i in this.selections) {
        const selectedAnswer = JSON.parse(
          JSON.stringify(this.selections[i])
        );

        if (selectedAnswer.question_id == myAnswers[o].question_id) {
          myAnswers[o]["my_answer_txt"] = selectedAnswer.name;
        }

        myAnswers[o]["iscorrect"] = "0";
        myAnswers[o]["student_guid"] = this.student_guid;

        if (selectedAnswer.id == myAnswers[o].id) {
          myAnswers[o]["id"] = selectedAnswer.id;
          myAnswers[o]["guid"] = "";
          myAnswers[o]["question_id"] = selectedAnswer.question_id;
          myAnswers[o]["iscorrect"] = "1";
          myAnswers[o]["my_answer_txt"] = selectedAnswer.name;
          break;
        }
      }
    }

    myAnswers.sort(function (a, b) {
      return parseFloat(a.question_id) - parseFloat(b.question_id);
    });

    this.sub = this.examService
      .checkAnswers({ answers: myAnswers })
      .subscribe(response => {
        if (response.success === true) {
          localStorage.setItem(
            "resultsUrl",
            JSON.stringify({ selection: this.param, guid: response.guid })
          );

          this.navCtrl.push(ExamResultsPage, {
            selection: this.param,
            guid: response.guid,
            selectedItem: this.navParams.get('selectedItem')
          });
        }
      });
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
