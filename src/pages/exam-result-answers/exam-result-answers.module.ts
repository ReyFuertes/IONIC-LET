import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamResultAnswersPage } from './exam-result-answers';

@NgModule({
  declarations: [
    ExamResultAnswersPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamResultAnswersPage),
  ],
})
export class ExamResultAnswersPageModule {}
