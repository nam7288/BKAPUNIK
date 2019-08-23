import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuideModalPage } from './guide-modal';

@NgModule({
  declarations: [
    GuideModalPage,
  ],
  imports: [
    IonicPageModule.forChild(GuideModalPage),
  ],
})
export class GuideModalPageModule {}
