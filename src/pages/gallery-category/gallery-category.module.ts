import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryCategoryPage } from './gallery-category';

@NgModule({
  declarations: [
    GalleryCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(GalleryCategoryPage),
  ],
})
export class GalleryCategoryPageModule {}
