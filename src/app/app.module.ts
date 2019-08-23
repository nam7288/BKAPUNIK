import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Calendar } from '@ionic-native/calendar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddEventPage } from '../pages/add-event/add-event';
import { ConvertCalendarPage } from '../pages/convert-calendar/convert-calendar';
import { UpdateResourcePage } from '../pages/update-resource/update-resource';
import { DayModalPage } from '../pages/day-modal/day-modal';
import { WeekViewPage } from '../pages/week-view/week-view';
import { GalleryModalPage } from '../pages/gallery-modal/gallery-modal';
import { GalleryViewPage } from '../pages/gallery-view/gallery-view';
import { GalleryCategoryPage } from '../pages/gallery-category/gallery-category';
import { SelectpikerPage } from '../pages/selectpiker/selectpiker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Base64 } from '@ionic-native/base64';
import { SQLite } from '@ionic-native/sqlite';
// import { Network } from '@ionic-native/network';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from '../providers/language.service';
import { AmlichService } from '../providers/amlich.service';
import { CalendartypeService } from '../providers/calendartype.service';
import { WallpaperService } from '../providers/wallpaper.service';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { PhotoLibrary } from '@ionic-native/photo-library';

import { IonicStorageModule } from '@ionic/storage';

import { HttpModule } from '@angular/http';

import { SettingService } from '../providers/setting/setting.service';
import { DatabaseService } from './../providers/database/database.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddEventPage,
    ConvertCalendarPage,
    UpdateResourcePage,
    DayModalPage,
    WeekViewPage,
    GalleryViewPage,
    GalleryCategoryPage,
    GalleryModalPage,
    SelectpikerPage, 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [ HttpClient]
      }
    })    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddEventPage,
    ConvertCalendarPage,
    UpdateResourcePage,
    DayModalPage,
    WeekViewPage,
    GalleryViewPage,
    GalleryCategoryPage,
    GalleryModalPage,
    SelectpikerPage,
  ],
  providers: [
    LanguageService,
    CalendartypeService,
    AmlichService,
    StatusBar,
    SplashScreen,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Calendar,
    WallpaperService,
    PhotoLibrary,
    FileTransfer,
    File,
    Base64,
    SQLite,
    SettingService,
    DatabaseService,
    // Network
  ]
})
export class AppModule {}
