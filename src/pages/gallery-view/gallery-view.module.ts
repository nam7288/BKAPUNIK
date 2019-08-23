import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryViewPage } from './gallery-view';

@NgModule({
  declarations: [
    GalleryViewPage,
  ],
  imports: [
    IonicPageModule.forChild(GalleryViewPage),
  ],
})
export class GalleryViewPageModule {}
