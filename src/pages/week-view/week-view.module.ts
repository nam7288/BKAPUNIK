import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeekViewPage } from './week-view';

@NgModule({
  declarations: [
    WeekViewPage,
  ],
  imports: [
    IonicPageModule.forChild(WeekViewPage),
  ],
})
export class WeekViewPageModule {}
