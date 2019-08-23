import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions,Platform } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GalleryModalPage } from '../gallery-modal/gallery-modal';

@IonicPage()
@Component({
  selector: 'page-gallery-view',
  templateUrl: 'gallery-view.html',
})
export class GalleryViewPage {
  ApiRouter: string;
  data: any;
  galleries: any;
  category: any;
  categories: any;
  page: any;
  pages: any;
  moredata : any; 
  constructor(public navCtrl: NavController,public plt: Platform, public navParams: NavParams,public modalCtrl: ModalController, public http: Http) { 
    // this.ApiRouter = 'http://localhost/Calendar/' ;
    // this.ApiRouter = 'http://beunik.com.vn/demo/calendar/admin/' ;
    this.ApiRouter = this.navParams.get('ApiRouter');
    this.data = this.navParams.get('data');   
    this.categories = this.navParams.get('categories');   
    this.category = this.data._id; 
    this.page = 1;   
    this.pages = new Array();   
    this.galleries = new Array();
    this.moredata = true;
    this.getGallery(null);
    // this.http.get(this.ApiRouter + 'api/gallery?limit='+ this.limit + "&page=" + this.page).map(res => res.json()).subscribe(data => {
    //     this.galleries = data;
    // });
  }

  ionViewDidLoad() {
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
        this.http.get(this.ApiRouter + 'api/gallery?category='+ this.category + "&page=" + this.page).map(res => res.json()).subscribe(data => {
          // if (data) {
          //   this.pages = data.pages;
          // }
          if (data && data.items && data.items.length > 0) {
            // this.galleries = new Array();
            data.items.forEach(item => {
              this.galleries.push(item);
            });
            if (data.items.length < data.limit) {
              this.moredata = false;
            }    
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
      this.http.get(this.ApiRouter + 'api/gallery_ios?category='+ this.category + "&page=" + this.page).map(res => res.json()).subscribe(data => {
        // if (data) {
        //   this.pages = data.pages;
        // }
        if (data && data.items && data.items.length > 0) {
          // this.galleries = new Array();

          data.items.forEach(item => {
            this.galleries.push(item);
          });
          console.log(this.galleries);
          if (data.items.length < data.limit) {
            this.moredata = false;
          }    
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
    // const modalOptions: ModalOptions = {
    //   cssClass: "GalleryModal"
    // };
    // const modal = this.modalCtrl.create("GalleryModalPage", {data:item,ApiRouter:this.ApiRouter}, modalOptions);
    // modal.present();

    this.navCtrl.push(GalleryModalPage, {
      data:item,
      ApiRouter:this.ApiRouter
    });     
  }

  changeCategory(){
    this.page = 1;
    this.galleries = new Array();
    this.moredata = true;
    this.getGallery(null);
  }

}
