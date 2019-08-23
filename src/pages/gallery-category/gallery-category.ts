import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions,Platform } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GalleryModalPage } from '../gallery-modal/gallery-modal';
import { GalleryViewPage } from '../gallery-view/gallery-view';
import { TranslateService } from '@ngx-translate/core';
declare var configApp;

@IonicPage()
@Component({
  selector: 'page-gallery-category',
  templateUrl: 'gallery-category.html',
})
export class GalleryCategoryPage {
  ApiRouter: string;
  galleries: any;
  page: any;
  pages: any;
  moredata : any; 
  constructor(public translate: TranslateService,public plt: Platform,public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController, public http: Http) { 
    // this.ApiRouter = 'http://localhost/Calendar/' ;
    this.ApiRouter = configApp.ApiRouter ;
    this.page = 1;   
    this.pages = new Array(); 
    this.galleries = new Array();
    this.moredata = false;
    this.getGallery(null);
    // this.http.get(this.ApiRouter + 'api/gallery?limit='+ this.limit + "&page=" + this.page).map(res => res.json()).subscribe(data => {
    //     this.galleries = data;
    // });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad WeekViewPage');
  } 
  ionViewWillEnter() {
  }

  doInfinite(infiniteScroll) {
    this.page += 1;
    setTimeout(() => {
      this.getGallery(infiniteScroll);
      // infiniteScroll.complete();
    }, 500);
  }  

  getGallery(infiniteScroll){
    if (this.plt.is('android')) {
      this.http.get(this.ApiRouter + 'api/gallery_category?page=' + this.page).map(res => res.json()).subscribe(data => {
          if (data && data.items && data.items.length > 0) {
            // this.galleries = new Array();
            data.items.forEach(item => {
              this.galleries.push(item);
            });    
          } 
          else{
            this.moredata = false;
          }
          if (infiniteScroll) {
            infiniteScroll.complete();
          }   
      });
    }
    else
    {
      this.http.get(this.ApiRouter + 'api/gallery_category_ios?page=' + this.page).map(res => res.json()).subscribe(data => {
          if (data && data.items && data.items.length > 0) {
            // this.galleries = new Array();
            data.items.forEach(item => {
              this.galleries.push(item);
            });    
          } 
          else{
            this.moredata = false;
          }
          if (infiniteScroll) {
            infiniteScroll.complete();
          }   
      });
    }
  }

  goToPage(page){
    this.page = page;
    this.getGallery(null);
  }

  showDetail(item){
    this.navCtrl.push(GalleryViewPage, {
      data:item,
      categories:this.galleries,
      ApiRouter:this.ApiRouter
    });    
  }

}
