import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryModalPage } from './gallery-modal';

@NgModule({
  declarations: [
    GalleryModalPage,
  ],
  imports: [
    IonicPageModule.forChild(GalleryModalPage),
  ],
})
export class GalleryModalPageModule {}
