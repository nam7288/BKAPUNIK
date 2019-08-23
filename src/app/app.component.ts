import { Component,ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WeekViewPage } from '../pages/week-view/week-view';
import { ConvertCalendarPage } from '../pages/convert-calendar/convert-calendar';
import { GalleryCategoryPage } from '../pages/gallery-category/gallery-category';
import { DayModalPage } from '../pages/day-modal/day-modal';
import { UpdateResourcePage } from '../pages/update-resource/update-resource';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LanguageService } from "../providers/language.service";
import { LanguageModel } from "../models/language.model";

import { Storage } from '@ionic/storage';
import { CalendartypeService } from "../providers/calendartype.service";
import { CalendartypeModel } from "../models/calendartype.model";
declare var configApp;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // rootPage:any = HomePage;
  // rootPage:any = UpdateResourcePage;
  rootPage:any ;
  pages: Array<{title: string, component: any, icon: string}>; 
  textDir: string = "ltr";

  languageSelected : any = 'vn';
  languages : Array<LanguageModel>;  

  calendartypeSelected : any ;
  calendartypes : Array<CalendartypeModel>;

  root_text : any = '';

  constructor(private storage: Storage,public platform: Platform,public translate: TranslateService, public calendartypeService: CalendartypeService, public languageService: LanguageService, public menu: MenuController,public statusBar: StatusBar, splashScreen: SplashScreen) {
    translate.setDefaultLang('vn');
    translate.use('vn');   
    this.languages = this.languageService.getLanguages();
    this.setLanguage();   

    this.calendartypes = this.calendartypeService.getCalendartype(); 
     
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.rootPage = UpdateResourcePage;
      // this.rootPage = HomePage;
      this.getCalendartype();
      //statusBar.styleDefault();

      // statusBar.backgroundColorByHexString('#ffffff');
       // splashScreen.hide();
       if(this.platform.is('ios'))
       {
          this.statusBar.overlaysWebView(true);
          //this.statusBar.backgroundColorByName("white");
          //this.statusBar.backgroundColorByHexString('#33000000');
          this.statusBar.backgroundColorByHexString('#ffffff');
       }
       else
       {
          statusBar.styleDefault();
          statusBar.backgroundColorByHexString('#ffffff');
       }
       
      this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
      {
        this.textDir = event.lang == 'ar'? 'rtl' : 'ltr'; 
      });      
    });
    // set our app's pages
    this.pages = [
      { title: 'Calendar_Month', component: HomePage, icon: 'icon/month-icon.png'},
      { title: 'Week_Schedule', component: WeekViewPage, icon: 'icon/week-icon.png'},
      { title: 'Day_Schedule', component: DayModalPage, icon: 'icon/date-icon.png'},
      { title: 'Gallery', component: GalleryCategoryPage, icon: 'icon/image-icon.png'},
      { title: 'lunar_calendar_converter', component: ConvertCalendarPage, icon: 'icon/Am-Lich.png'},
      // { title: 'My First List', component: ListPage }
    ];

  }

  openPage(page) {
    // close the menu when clicking a link from the menu

    this.menu.close();
    // navigate to the new page if it is not the current page

    if (this.root_text == '') {
      this.root_text = 'Calendar_Month';
    }
    if (this.root_text != page.title) {
      this.root_text = page.title;
      setTimeout( () => {
        this.nav.setRoot(page.component, {}, {animate: false, direction: 'back'});
      }, 50); 
      // this.nav.setRoot(page.component);
    }
    
    
    // if (page.title == 'Day_Schedule') {
    //   // this.navCtrl.push(page.component);       
    // }
    // else{
    //   this.nav.setRoot(page.component);
    // }
    
  }    
  goBack(){
    this.menu.close();
  }

  setLanguage(){
    let defaultLanguage = this.translate.getDefaultLang();
    if(this.languageSelected){
      this.translate.setDefaultLang(this.languageSelected);
      this.translate.use(this.languageSelected);
    }else{
      this.languageSelected = defaultLanguage;
      this.translate.use(defaultLanguage);
    }
  }

  setCalendartype(){
    if(!this.calendartypeSelected){
      this.calendartypeSelected = this.calendartypeService.getDefaultCalendarTyle();

    }

     configApp.is_lunaCalendar = (this.calendartypeSelected == "amlich")?true:false;
    this.storage.set('calendartype', this.calendartypeSelected);
    this.nav.setRoot(this.nav.getActive().component);
    this.menu.close();    
  }
  getCalendartype(){
    this.calendartypeSelected = 'duonglich';
    // setTimeout(() => {
    //   this.calendartypeSelected = 'duonglich';
    // }, 100); 
       
    // configApp.is_lunaCalendar = (this.calendartypeSelected == "amlich")?true:false;
    // this.storage.get('calendartype').then((val) => {
    //   // console.log(val);
    //   if (val) {
    //     this.calendartypeSelected = val;
    //      configApp.is_lunaCalendar = (this.calendartypeSelected == "amlich")?true:false;
    //   }
    //   else{
    //     this.setCalendartype();
    //   }
    // });
  }  

  refresh() {
    this.nav.setRoot(this.nav.getActive().component);
    this.menu.close();
    // console.log('ddd');
    // console.log('Begin async operation', refresher);

    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   refresher.complete();
    // }, 2000);
  }  

}

