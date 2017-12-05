import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamOverviewPage } from './exam-overview';

@NgModule({
  declarations: [
    ExamOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamOverviewPage),
  ],
})
export class ExamOverviewPageModule {}
