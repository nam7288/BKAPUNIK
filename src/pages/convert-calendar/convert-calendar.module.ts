import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConvertCalendarPage } from './convert-calendar';

@NgModule({
  declarations: [
    ConvertCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(ConvertCalendarPage),
  ],
})
export class ConvertCalendarPageModule {}
