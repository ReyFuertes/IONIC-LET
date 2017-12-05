import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientPopoverPage } from './client-popover';

@NgModule({
  declarations: [
    ClientPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientPopoverPage),
  ],
})
export class ClientPopoverPageModule {}
