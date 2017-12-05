import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamResultsPage } from './exam-results';

@NgModule({
  declarations: [
    ExamResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamResultsPage),
  ],
})
export class ExamResultsPageModule {}
