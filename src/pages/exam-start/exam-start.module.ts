import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamStartPage } from './exam-start';

@NgModule({
  declarations: [
    ExamStartPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamStartPage),
  ],
})
export class ExamStartPageModule {}
