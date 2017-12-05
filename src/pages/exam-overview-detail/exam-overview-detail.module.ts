import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamOverviewDetailPage } from './exam-overview-detail';

@NgModule({
  declarations: [
    ExamOverviewDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamOverviewDetailPage),
  ],
})
export class ExamOverviewDetailPageModule {}
