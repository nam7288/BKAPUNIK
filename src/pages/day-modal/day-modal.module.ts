import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DayModalPage } from './day-modal';

@NgModule({
  declarations: [
    DayModalPage,
  ],
  imports: [
    IonicPageModule.forChild(DayModalPage),
  ],
})
export class DayModalPageModule {}
