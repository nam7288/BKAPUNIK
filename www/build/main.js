webpackJsonp([10],{

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConvertCalendarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__day_modal_day_modal__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConvertCalendarPage = /** @class */ (function () {
    function ConvertCalendarPage(alertCtrl, navCtrl, navParams, translate, localNotifications) {
        // mobiscroll.settings = {
        //     lang: 'vn',        
        //     theme: 'ios' ,
        //     // buttons: [ 
        //     //     { 
        //     //         text: 'Hide1',
        //     //         handler: 'set',
        //     //         cssClass: 'calendar-btn'
        //     //     },           
        //     //     { 
        //     //         text: 'Hide',
        //     //         handler: 'cancel',
        //     //         cssClass: 'calendar-btn'
        //     //     }
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.localNotifications = localNotifications;
        this.is_leaf = false;
        this.eventLeaf = false;
        //     // ]     
        // };
        // this.translate.get('cancel').subscribe(
        //   value => {
        //     mobiscroll.settings.buttons[1].text = value;
        //   }
        // )    
        // this.translate.get('Set').subscribe(
        //   value => {
        //     mobiscroll.settings.buttons[0].text = value;
        //   }
        // )      
    }
    ConvertCalendarPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () {
            _this.initView();
        }, 100);
        // this.initView();
    };
    ConvertCalendarPage.prototype.ionViewWillLeave = function () {
    };
    ConvertCalendarPage.prototype.changeLeftday = function (ev) {
        if (this.eventLeaf) {
            eventLeafGlobal = true;
        }
        else {
            eventLeafGlobal = false;
        }
        var initial = this.date.split(/\//).reverse().join('/');
        this.lunarDate.setVal(mydate, true, true, false, 1000);
        var mydate = new Date(initial);
        var lunar = convertSolar2Lunar(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear(), 7);
        this.lunarDate.setVal(mydate, true, true, false, 1000);
    };
    ConvertCalendarPage.prototype.initView = function () {
        mobiscroll.settings = {
            lang: 'en',
            theme: 'android',
        };
        var root = this;
        this.solarDate = mobiscroll.date('#solarDate', {
            display: 'inline',
            layout: 'liquid',
            dateFormat: 'dd/mm/yy',
            monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            onShow: function (event, inst) {
                root.date = event.valueText;
            },
            onChange: function (event, inst) {
                // console.log(event);
                var initial = event.valueText.split(/\//).reverse().join('/');
                root.date = event.valueText;
                var mydate = new Date(initial);
                var lunar = convertSolar2Lunar(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear(), 7);
                if (is_LeapMonth(lunar[0], lunar[1], lunar[2], 7)) {
                    root.is_leaf = true;
                    if (lunar[3] == 1) {
                        eventLeafGlobal = true;
                        root.eventLeaf = true;
                    }
                    else {
                        eventLeafGlobal = false;
                        root.eventLeaf = false;
                    }
                }
                else {
                    root.is_leaf = false;
                    eventLeafGlobal = false;
                    root.eventLeaf = false;
                }
                root.lunarDate.setVal(mydate, true, true, false, 1000);
            },
        });
        mobiscroll.settings = {
            lang: 'vn',
            theme: 'android',
        };
        this.lunarDate = mobiscroll.date('#lunarDate', {
            display: 'inline',
            layout: 'liquid',
            dateFormat: 'dd/mm/yy',
            monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            isLunar: true,
            monthText: 'Luna',
            onChange: function (event, inst) {
                var initial = event.valueText.split(/\//);
                console.log(is_LeapMonth(parseInt(initial[0]), parseInt(initial[1]), parseInt(initial[2]), 7));
                if (is_LeapMonth(parseInt(initial[0]), parseInt(initial[1]), parseInt(initial[2]), 7)) {
                    eventLeafGlobal = true;
                    // root.eventLeaf = true;  
                    root.is_leaf = true;
                }
                else {
                    eventLeafGlobal = false;
                    root.eventLeaf = false;
                    root.is_leaf = false;
                }
                var solar = convertLunar2Solar(parseInt(initial[0]), parseInt(initial[1]), parseInt(initial[2]), 0, 7);
                root.date = solar.join('/');
            },
        });
    };
    ConvertCalendarPage.prototype.showMore = function () {
        var initial = this.date.split(/\//);
        var day = parseInt(initial[0]);
        var month = parseInt(initial[1]);
        var year = parseInt(initial[2]);
        var lunarDays = getLunarDate(day, month, year);
        var lunarDay = lunarDays.day;
        if (lunarDays.day == 1) {
            lunarDay = lunarDays.day + "/" + lunarDays.month;
        }
        var dayWeek = new Date(year, month - 1, day).getDay();
        var lunarDayArray = [lunarDay, dayWeek];
        var thisDate1 = initial[2] + "-" + initial[1] + "-" + initial[0] + " 00:00:00";
        var thisDate2 = initial[2] + "-" + initial[1] + "-" + initial[0] + "-" + day + " 23:59:59";
        var data = {
            day: day,
            month: month,
            year: year,
            dateStart: thisDate1,
            dateEnd: thisDate2,
            lunaDay: lunarDayArray,
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__day_modal_day_modal__["a" /* DayModalPage */], {
            data: data,
        });
    };
    ConvertCalendarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-convert-calendar',template:/*ion-inline-start:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\convert-calendar\convert-calendar.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle class="menu-button">\n      <ion-icon name="menu"></ion-icon>\n    </button>   \n    <ion-title>\n      <img class="logo-header" alt="logo" height="40"   src="../assets/imgs/logo-header.png" > \n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only class="add-button" style="visibility: hidden;">\n        <ion-icon name="md-add"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="ion-content">\n  <div class="title-page">\n    {{ "lunar_calendar_converter" | translate}}\n  </div>\n  <ion-list>\n    <ion-row>\n      <ion-item class="box">\n        <div class="date_title">\n          <img src="../assets/imgs/icon/duong.png">\n          <span>{{ "duonglich" | translate}}</span>\n          \n        </div>\n        <div id="solarDate"></div>\n      </ion-item>\n\n<!--       <ion-item class="box">\n        <div class="date_title amlich-title">\n          <img src="../assets/imgs/icon/am.png">\n          <span>{{ "amlich" | translate}}</span>\n        </div>\n        \n      </ion-item> --> \n\n      <ion-item *ngIf="is_leaf" class="check-box">\n        <ion-label>{{ "thang_nhuan" | translate}}</ion-label>\n        <ion-checkbox color="light" background="#e71f22" [(ngModel)]="eventLeaf" (ionChange)="changeLeftday(ev)"></ion-checkbox>\n      </ion-item>       \n      <ion-item class="box box-amlich">\n        <div class="date_title amlich-title">\n          <img src="../assets/imgs/icon/am.png">\n          <span>{{ "amlich" | translate}}</span>\n        </div>        \n        <div id="lunarDate"></div>\n      </ion-item>     \n      <ion-item class="btn-view">\n        <button ion-button icon-only class="show-more" (click)="showMore()">\n          {{ "xem_chi_tiet_ngay" | translate}}\n        </button>\n      </ion-item>     \n    </ion-row>\n  </ion-list>\n\n\n</ion-content>\n<img class="font-bg-gallery" src="../assets/imgs/footer-gallery.png">'/*ion-inline-end:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\convert-calendar\convert-calendar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], ConvertCalendarPage);
    return ConvertCalendarPage;
}());

//# sourceMappingURL=convert-calendar.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryCategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gallery_view_gallery_view__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GalleryCategoryPage = /** @class */ (function () {
    function GalleryCategoryPage(translate, plt, navCtrl, navParams, modalCtrl, http) {
        this.translate = translate;
        this.plt = plt;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.http = http;
        // this.ApiRouter = 'http://localhost/Calendar/' ;
        this.ApiRouter = configApp.ApiRouter;
        this.page = 1;
        this.pages = new Array();
        this.galleries = new Array();
        this.moredata = false;
        this.getGallery(null);
        // this.http.get(this.ApiRouter + 'api/gallery?limit='+ this.limit + "&page=" + this.page).map(res => res.json()).subscribe(data => {
        //     this.galleries = data;
        // });
    }
    GalleryCategoryPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad WeekViewPage');
    };
    GalleryCategoryPage.prototype.ionViewWillEnter = function () {
    };
    GalleryCategoryPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.page += 1;
        setTimeout(function () {
            _this.getGallery(infiniteScroll);
            // infiniteScroll.complete();
        }, 500);
    };
    GalleryCategoryPage.prototype.getGallery = function (infiniteScroll) {
        var _this = this;
        if (this.plt.is('android')) {
            this.http.get(this.ApiRouter + 'api/gallery_category?page=' + this.page).map(function (res) { return res.json(); }).subscribe(function (data) {
                if (data && data.items && data.items.length > 0) {
                    // this.galleries = new Array();
                    data.items.forEach(function (item) {
                        _this.galleries.push(item);
                    });
                }
                else {
                    _this.moredata = false;
                }
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
            });
        }
        else {
            this.http.get(this.ApiRouter + 'api/gallery_category_ios?page=' + this.page).map(function (res) { return res.json(); }).subscribe(function (data) {
                if (data && data.items && data.items.length > 0) {
                    // this.galleries = new Array();
                    data.items.forEach(function (item) {
                        _this.galleries.push(item);
                    });
                }
                else {
                    _this.moredata = false;
                }
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
            });
        }
    };
    GalleryCategoryPage.prototype.goToPage = function (page) {
        this.page = page;
        this.getGallery(null);
    };
    GalleryCategoryPage.prototype.showDetail = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__gallery_view_gallery_view__["a" /* GalleryViewPage */], {
            data: item,
            categories: this.galleries,
            ApiRouter: this.ApiRouter
        });
    };
    GalleryCategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-gallery-category',template:/*ion-inline-start:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\gallery-category\gallery-category.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle class="menu-button">\n      <ion-icon name="menu"></ion-icon>\n    </button>  	\n    <ion-title>\n      <img class="logo-header" alt="logo" height="40"   src="../assets/imgs/logo-header.png" > \n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only class="add-button" style="visibility: hidden;">\n        <ion-icon name="md-add"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="ion-content">\n  <div class="title-gallery">\n    {{ "gallery_image" | translate}}\n  </div>\n  <ion-list class="list-gallery">\n    <ion-row>\n      <ion-item col-6 *ngFor="let post of galleries">\n        <div class="item-gallery" (click)="showDetail(post)">\n          <img [src]="ApiRouter + post.image.path" />\n          <div class="title">{{post.title}}</div>\n        </div>\n      </ion-item>\n    </ion-row>\n  </ion-list>\n <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="moredata">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more data...">\n    </ion-infinite-scroll-content>\n </ion-infinite-scroll>  \n\n\n</ion-content>\n<img class="font-bg-gallery" src="../assets/imgs/footer-gallery.png">'/*ion-inline-end:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\gallery-category\gallery-category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], GalleryCategoryPage);
    return GalleryCategoryPage;
}());

//# sourceMappingURL=gallery-category.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gallery_modal_gallery_modal__ = __webpack_require__(125);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GalleryViewPage = /** @class */ (function () {
    function GalleryViewPage(navCtrl, plt, navParams, modalCtrl, http) {
        this.navCtrl = navCtrl;
        this.plt = plt;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.http = http;
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
    GalleryViewPage.prototype.ionViewDidLoad = function () {
    };
    GalleryViewPage.prototype.ionViewWillEnter = function () {
    };
    GalleryViewPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.page += 1;
        setTimeout(function () {
            _this.getGallery(infiniteScroll);
            // infiniteScroll.complete();
        }, 500);
    };
    GalleryViewPage.prototype.getGallery = function (infiniteScroll) {
        var _this = this;
        if (this.plt.is('android')) {
            this.http.get(this.ApiRouter + 'api/gallery?category=' + this.category + "&page=" + this.page).map(function (res) { return res.json(); }).subscribe(function (data) {
                // if (data) {
                //   this.pages = data.pages;
                // }
                if (data && data.items && data.items.length > 0) {
                    // this.galleries = new Array();
                    data.items.forEach(function (item) {
                        _this.galleries.push(item);
                    });
                    if (data.items.length < data.limit) {
                        _this.moredata = false;
                    }
                }
                else {
                    _this.moredata = false;
                }
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
            });
        }
        else {
            this.http.get(this.ApiRouter + 'api/gallery_ios?category=' + this.category + "&page=" + this.page).map(function (res) { return res.json(); }).subscribe(function (data) {
                // if (data) {
                //   this.pages = data.pages;
                // }
                if (data && data.items && data.items.length > 0) {
                    // this.galleries = new Array();
                    data.items.forEach(function (item) {
                        _this.galleries.push(item);
                    });
                    console.log(_this.galleries);
                    if (data.items.length < data.limit) {
                        _this.moredata = false;
                    }
                }
                else {
                    _this.moredata = false;
                }
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
            });
        }
    };
    GalleryViewPage.prototype.goToPage = function (page) {
        this.page = page;
        this.getGallery(null);
    };
    GalleryViewPage.prototype.showDetail = function (item) {
        // const modalOptions: ModalOptions = {
        //   cssClass: "GalleryModal"
        // };
        // const modal = this.modalCtrl.create("GalleryModalPage", {data:item,ApiRouter:this.ApiRouter}, modalOptions);
        // modal.present();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__gallery_modal_gallery_modal__["a" /* GalleryModalPage */], {
            data: item,
            ApiRouter: this.ApiRouter
        });
    };
    GalleryViewPage.prototype.changeCategory = function () {
        this.page = 1;
        this.galleries = new Array();
        this.moredata = true;
        this.getGallery(null);
    };
    GalleryViewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-gallery-view',template:/*ion-inline-start:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\gallery-view\gallery-view.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle class="menu-button">\n      <ion-icon name="menu"></ion-icon>\n    </button>  	\n    \n    <ion-title>\n      <img class="logo-header" alt="logo" height="40"   src="../assets/imgs/logo-header.png" > \n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only class="add-button" style="visibility: hidden;">\n        <ion-icon name="md-add"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="ion-content">\n  <ion-item class="item-leave-height">\n    <select [(ngModel)]="category" (change)=\'changeCategory()\'>\n      <option *ngFor="let item of categories" [value]="item._id">{{item.title}}</option>\n    </select>\n  </ion-item>\n  <ion-list class="list-gallery">\n    <ion-row>\n      <ion-item col-6 *ngFor="let post of galleries">\n        <div class="item-gallery" (click)="showDetail(post)">\n          <img [src]="ApiRouter + post.image.path" />\n          <div class="play-video" *ngIf="post.url_video">\n            <ion-icon ios="ios-play" md="md-play"></ion-icon>\n          </div>\n          \n        </div>\n      </ion-item>\n    </ion-row>\n  </ion-list>\n <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="moredata">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more data...">\n    </ion-infinite-scroll-content>\n </ion-infinite-scroll>  \n\n\n</ion-content>\n  <ul class="pagination" hidden>\n    <li *ngFor="let pitem of pages">\n      <span *ngIf="pitem != page;else active">\n        <a *ngIf="pitem != -1" class="page-item" href="#" (click)="goToPage(pitem)">{{pitem}}</a>\n        <a *ngIf="pitem == -1" class="disabled">...</a>\n      </span> \n      <ng-template #active class="active">\n          <span class="active">\n            <a *ngIf="pitem != -1" class="page-item" href="#" (click)="goToPage(pitem)">{{pitem}}</a>\n            <a *ngIf="pitem == -1" class="disabled">...</a>   \n          </span>    \n      </ng-template>          \n    </li>\n\n  </ul> '/*ion-inline-end:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\gallery-view\gallery-view.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], GalleryViewPage);
    return GalleryViewPage;
}());

//# sourceMappingURL=gallery-view.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_base64__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_photo_library__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var GalleryModalPage = /** @class */ (function () {
    function GalleryModalPage(loadingCtrl, photoLibrary, base64, plt, navCtrl, modalCtrl, alertCtrl, transfer, file, navParams, domSanitizer, viewCtrl, translate) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.photoLibrary = photoLibrary;
        this.base64 = base64;
        this.plt = plt;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.transfer = transfer;
        this.file = file;
        this.navParams = navParams;
        this.domSanitizer = domSanitizer;
        this.viewCtrl = viewCtrl;
        this.translate = translate;
        this.inputs = {
            title: "",
            inputs: "",
            buttons: "",
        };
        this.ApiRouter = this.navParams.get('ApiRouter');
        this.data = this.navParams.get('data');
        if (this.data.url_video) {
            this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.url_video);
        }
        else {
            this.img_url = this.ApiRouter + this.data.image.path;
            // this.photoViewer.show(this.ApiRouter + this.data.image.path, this.data.title, {share: true}); 
            // this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.fileTransfer = this.transfer.create();
            // });         
        }
        this.translate.get('text_Set_as_home_screen').subscribe(function (value) {
            _this.text_Set_as_home_screen = value;
        });
        this.translate.get('text_Set_as_lock_screen').subscribe(function (value) {
            _this.text_Set_as_lock_screen = value;
        });
        this.translate.get('text_Download_photos').subscribe(function (value) {
            _this.text_Download_photos = value;
        });
        this.translate.get('text_Download_photos_to_bg').subscribe(function (value) {
            _this.text_Download_photos_to_bg = value;
        });
        this.translate.get('text_both').subscribe(function (value) {
            _this.text_both = value;
        });
        this.translate.get('Please_wait').subscribe(function (value) {
            _this.Please_wait = value;
        });
        this.translate.get('cancel').subscribe(function (value) {
            _this.cancel = value;
        });
        this.translate.get('ok').subscribe(function (value) {
            _this.ok = value;
        });
        this.translate.get('Download_photos_successfully').subscribe(function (value) {
            _this.Download_photos_successfully = value;
        });
        this.translate.get('Wallpaper_applied').subscribe(function (value) {
            _this.Wallpaper_applied = value;
        });
    }
    GalleryModalPage.prototype.ionViewDidLoad = function () {
    };
    GalleryModalPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    GalleryModalPage.prototype.onDownloadIos = function () {
        var _this = this;
        this.inputs.title = this.text_Download_photos_to_bg;
        this.inputs.buttons = [
            {
                text: this.cancel,
                role: 'cancel',
                handler: function () {
                    // console.log('Cancel clicked');
                }
            },
            {
                text: this.ok,
                handler: function (value) {
                    if (_this.loading) {
                        _this.loading.dismiss();
                    }
                    _this.loading = _this.loadingCtrl.create({
                        content: _this.Please_wait
                    });
                    _this.loading.present();
                    _this.downloadIOS();
                }
            }
        ];
        var myAlert = this.alertCtrl.create(this.inputs);
        myAlert.present();
    };
    GalleryModalPage.prototype.downloadIOS = function () {
        var _this = this;
        this.plt.ready().then(function () {
            var fileTransfer = _this.transfer.create();
            var url = encodeURI(_this.img_url);
            var targetPath = cordova.file.cacheDirectory + __WEBPACK_IMPORTED_MODULE_8_moment___default()().format("YYYYMMDDHHmmsss") + ".jpg";
            // let targetPath = cordova.file.documentsDirectory + moment().format("YYYYMMDDHHmmsss")+".jpg"; 
            fileTransfer.download(url, targetPath).then(function (entry) {
                cordova.plugins.imagesaver.saveImageToGallery(targetPath, _this.onSaveImageSuccess, _this.onSaveImageError);
                _this.loading.dismiss();
                _this.alertSuccess = _this.alertCtrl.create({
                    title: _this.Download_photos_successfully,
                    buttons: ['Ok']
                });
                _this.alertSuccess.present();
                // const modalOptions: ModalOptions = {
                //   cssClass: "GuideModal",
                //   showBackdrop: true,
                //   enableBackdropDismiss: true
                // };
                // const modal = this.modalCtrl.create("GuideModalPage", {}, modalOptions);
                // modal.present();
            }, function (error) {
                var alertFailure = _this.alertCtrl.create({
                    title: "Download Failed!",
                    subTitle: "was not successfully downloaded. Error code: " + error.code,
                    buttons: ['Ok']
                });
                alertFailure.present();
            });
        });
    };
    GalleryModalPage.prototype.onSaveImageSuccess = function () {
        // loading.dismiss();
        // view.present(); 
    };
    GalleryModalPage.prototype.onSaveImageError = function () {
        // alert("Download Error!");
        // loading.dismiss(); 
        // const alertSuccess = view.alertCtrl.create({
        //     title: `Download Failed! Please try again !`,
        //     buttons: ['Ok']
        //   });
        //   view.alertSuccess.present();
    };
    GalleryModalPage.prototype.onSaveImageSuccessAndroid = function () {
    };
    GalleryModalPage.prototype.onSaveImageErrorAndroid = function () {
        // alert("Download Error!");
        // loading.dismiss(); 
        // const alertSuccess = view.alertCtrl.create({
        //     title: `Download Failed! Please try again !`,
        //     buttons: ['Ok']
        //   });
        //   view.alertSuccess.present();
    };
    GalleryModalPage.prototype.download = function () {
        var _this = this;
        this.inputs.inputs = [
            {
                type: 'radio',
                // label: "Làm màn hình nền!",
                label: this.text_Set_as_home_screen,
                value: 1,
                checked: false
            },
            {
                type: 'radio',
                label: this.text_Set_as_lock_screen,
                value: 2,
                checked: false
            },
            {
                type: 'radio',
                label: this.text_both,
                value: 3,
                checked: false
            },
            {
                type: 'radio',
                label: this.text_Download_photos,
                value: 4,
                checked: false
            }
        ];
        this.inputs.buttons = [
            {
                text: this.cancel,
                role: 'cancel',
                handler: function () {
                    // console.log('Cancel clicked');
                }
            },
            {
                text: this.ok,
                handler: function (value) {
                    if (_this.loading) {
                        _this.loading.dismiss();
                    }
                    _this.loading = _this.loadingCtrl.create({
                        content: _this.Please_wait
                    });
                    _this.loading.present();
                    console.log(value);
                    // console.log(value.length);
                    _this.downloadAndroid(value);
                }
            }
        ];
        var myAlert = this.alertCtrl.create(this.inputs);
        myAlert.present();
    };
    GalleryModalPage.prototype.downloadAndroid = function (option) {
        var _this = this;
        this.photoLibrary.requestAuthorization().then(function () {
            var imageURL = _this.img_url;
            // let targetPath = cordova.file.externalDataDirectory + moment().format("YYYYMMDDHHmmsss")+".jpg";      
            var targetPath = cordova.file.cacheDirectory + __WEBPACK_IMPORTED_MODULE_8_moment___default()().format("YYYYMMDDHHmmsss") + ".jpg";
            _this.fileTransfer.download(imageURL, targetPath, true).then(function (entry) {
                _this.base64.encodeFile(entry.toURL()).then(function (base64File) {
                    var imageSrc = base64File.split(",");
                    // window['plugins'].wallpaper.setImageBase64(imageSrc[1]);
                    // alert(option);
                    if (option) {
                        if (option == 1) {
                            window['plugins'].wallpaper.setImageBase64Lockscreen(imageSrc[1], 1);
                            _this.alertSuccess = _this.alertCtrl.create({
                                title: _this.Wallpaper_applied,
                                buttons: ['Ok']
                            });
                        }
                        if (option == 2) {
                            window['plugins'].wallpaper.setImageBase64Lockscreen(imageSrc[1], 2);
                            _this.alertSuccess = _this.alertCtrl.create({
                                title: _this.Wallpaper_applied,
                                buttons: ['Ok']
                            });
                        }
                        if (option == 3) {
                            window['plugins'].wallpaper.setImageBase64Lockscreen(imageSrc[1], 3);
                            _this.alertSuccess = _this.alertCtrl.create({
                                title: _this.Wallpaper_applied,
                                buttons: ['Ok']
                            });
                        }
                        if (option == 4) {
                            _this.alertSuccess = _this.alertCtrl.create({
                                title: _this.Download_photos_successfully,
                                buttons: ['Ok']
                            });
                        }
                    }
                    _this.loading.dismiss();
                    _this.alertSuccess.present();
                    // window['plugins'].wallpaper.setImageBase64setImageBase64Lockscreen(imageSrc[1]);
                    cordova.plugins.imagesaver.saveImageToGallery(targetPath, _this.onSaveImageSuccessAndroid, _this.onSaveImageError);
                }, function (err) {
                });
            }, function (error) {
                _this.loading.dismiss();
                var alertFailure = _this.alertCtrl.create({
                    title: "Download Failed!",
                    // subTitle: `${this.data.title} was not successfully downloaded. Error code: ${error.source} - ${error.target} - ${error.code}`,
                    buttons: ['Ok']
                });
                alertFailure.present();
            });
        })
            .catch(function (err) { return _this.loading.dismiss(); });
    };
    GalleryModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-gallery-modal',template:/*ion-inline-start:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\gallery-modal\gallery-modal.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle class="menu-button">\n      <ion-icon name="menu"></ion-icon>\n    </button>   	\n    <ion-title> <img class="logo-header" alt="logo" height="40"   src="../assets/imgs/logo-header.png" > </ion-title>\n    <ion-buttons end *ngIf="!data.url_video">\n      <button ion-button icon-only (click)="onDownloadIos()" class="add-button" *ngIf="plt.is(\'ios\')">\n        <img height="25" src="../assets/imgs/icon/download.png">\n      </button>\n      <button ion-button icon-only (click)="download()" class="add-button" *ngIf="plt.is(\'android\')">\n        <img height="30" src="../assets/imgs/icon/wal-icon.png">\n      </button>     \n    </ion-buttons> \n    <ion-buttons end *ngIf="data.url_video">\n      <button ion-button icon-only class="add-button" style="visibility: hidden;">\n        <ion-icon name="md-add"></ion-icon>\n      </button>\n    </ion-buttons>   \n  </ion-navbar>\n</ion-header>\n\n<ion-content class=\'content no-scroll\'>	\n	<img *ngIf="!data.url_video" [src]="img_url" />\n	<div class="video" *ngIf="data.url_video">\n		<iframe width="100%"  [src]="trustedVideoUrl" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n	</div>\n</ion-content>'/*ion-inline-end:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\gallery-modal\gallery-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_photo_library__["a" /* PhotoLibrary */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_base64__["a" /* Base64 */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
    ], GalleryModalPage);
    return GalleryModalPage;
}());

//# sourceMappingURL=gallery-modal.js.map

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeekViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_event_add_event__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__day_modal_day_modal__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_calendar__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the WeekViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WeekViewPage = /** @class */ (function () {
    function WeekViewPage(navCtrl, navParams, calendar, domSanitizer, plt) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.calendar = calendar;
        this.domSanitizer = domSanitizer;
        this.plt = plt;
        this.is_lunaCalendar = false;
        this.loading = false;
        this.is_lunaCalendar = configApp.is_lunaCalendar;
        // this.initView();
    }
    WeekViewPage.prototype.ngAfterViewInit = function () {
        // this.slides.freeMode = true;
        this.slides.centeredSlides = false;
        // this.slides.slideTo(1, 0);
    };
    WeekViewPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.initView();
        var timmrr = 0;
        if (this.plt.is('android')) {
            timmrr = 0;
        }
        setTimeout(function () {
            // this.initView(); 
            _this.loading = true;
            _this.loadEventThisMonth();
            // this.setSlide();
        }, timmrr);
    };
    WeekViewPage.prototype.ionViewWillEnter = function () {
        this.slides.slideTo(1, 0);
    };
    WeekViewPage.prototype.initView = function () {
        this.date = new Date();
        this.year = this.date.getFullYear();
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.monthLunaNames = ["thang_gieng", "thang_2", "thang_3", "thang_4", "thang_5", "thang_6", "thang_7", "thang_8", "thang_9", "thang_10", "thang_11", "thang_chap"];
        this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.initDay();
        this.is_slide = true;
    };
    WeekViewPage.prototype.initDay = function () {
        this.daysInThisWeek = new Array();
        this.daysInLastWeek = new Array();
        this.daysInNextWeek = new Array();
        this.indexOfWeek = 0;
        this.weekCount = 0;
        this.getDaysOfMonth();
        this.loadEventThisMonth();
        var mydate = this.date.getDate();
        var mytotaldate = this.daysInLastMonth.length;
        var myIndex = Math.floor((mydate + mytotaldate) / 7);
        this.currentWeek = myIndex;
        if (this.currentWeek * 7 < (this.date.getDate() + this.daysInLastMonth.length)) {
            this.currentWeek += 1;
        }
        this.daysInLastWeek = this.weeksInThisMonth[this.currentWeek - 1];
        this.daysInThisWeek = this.weeksInThisMonth[this.currentWeek];
        this.daysInNextWeek = this.weeksInThisMonth[this.currentWeek + 1];
        for (var i = 0; i < this.daysInLastWeek.length; i++) {
            var day = this.daysInLastWeek[i].day;
            var month = this.date.getMonth() + 1 + this.daysInLastWeek[i].prevOrNextMonth;
            var year = this.date.getFullYear();
            var lunarDays = getLunarDate(day, month, year);
            var lunarDay = lunarDays.day;
            if (day == 0 || lunarDays.day == 1) {
                lunarDay = lunarDays.day + "/" + lunarDays.month;
            }
            var dayWeek = new Date(year, month - 1, day).getDay();
            this.daysInLastWeek[i].lunarDay = lunarDay;
            this.daysInLastWeek[i].dayWeek = dayWeek;
            this.daysInLastWeek[i].lunarDays = lunarDays;
            this.daysInLastWeek[i].lunarDayDay = lunarDays.day;
        }
        for (var i = 0; i < this.daysInThisWeek.length; i++) {
            var day = this.daysInThisWeek[i].day;
            var month = this.date.getMonth() + 1 + this.daysInThisWeek[i].prevOrNextMonth;
            var year = this.date.getFullYear();
            var lunarDays = getLunarDate(day, month, year);
            var lunarDay = lunarDays.day;
            if (day == 0 || lunarDays.day == 1) {
                lunarDay = lunarDays.day + "/" + lunarDays.month;
            }
            var dayWeek = new Date(year, month - 1, day).getDay();
            this.daysInThisWeek[i].lunarDay = lunarDay;
            this.daysInThisWeek[i].dayWeek = dayWeek;
            this.daysInThisWeek[i].lunarDays = lunarDays;
            this.daysInThisWeek[i].lunarDayDay = lunarDays.day;
        }
        for (var i = 0; i < this.daysInNextWeek.length; i++) {
            var day = this.daysInNextWeek[i].day;
            var month = this.date.getMonth() + 1 + this.daysInNextWeek[i].prevOrNextMonth;
            var year = this.date.getFullYear();
            var lunarDays = getLunarDate(day, month, year);
            var lunarDay = lunarDays.day;
            if (day == 0 || lunarDays.day == 1) {
                lunarDay = lunarDays.day + "/" + lunarDays.month;
            }
            var dayWeek = new Date(year, month - 1, day).getDay();
            this.daysInNextWeek[i].lunarDay = lunarDay;
            this.daysInNextWeek[i].dayWeek = dayWeek;
            this.daysInNextWeek[i].lunarDays = lunarDays;
            this.daysInNextWeek[i].lunarDayDay = lunarDays.day;
        }
        this.setBGDatabase();
    };
    WeekViewPage.prototype.setBGDatabase = function () {
        var year = this.currentYear;
        var month = this.currentMonthMonth;
        var type = 0;
        if (!this.background_img || month == 12 || month == 1) {
            if (!this.background_img) {
                this.background_img = new Array();
            }
            for (var i = 0; i < 12; i++) {
                if (database && database[year] && database[year][type] && database[year][type][i]) {
                    this.background_img[i] = this.domSanitizer.bypassSecurityTrustStyle('url(' + database[year][type][i] + ')');
                }
                else if (database && database["default"] && database["default"][type] && database["default"][type][i]) {
                    this.background_img[i] = this.domSanitizer.bypassSecurityTrustResourceUrl('url(' + database["default"][type][i] + ')');
                }
                else {
                    this.background_img[i] = this.getBg(this.monthNames[i]);
                }
            }
        }
        if (!this.is_lunaCalendar) {
            if (database && database[year] && database[year][1] && database[year][1][month]) {
                this.month_count = this.domSanitizer.bypassSecurityTrustResourceUrl(database[year][1][month]);
            }
            else if (database && database["default"] && database["default"][1] && database["default"][1][month]) {
                this.month_count = this.domSanitizer.bypassSecurityTrustResourceUrl(database["default"][1][month]);
            }
            else {
                this.month_count = "../assets/imgs/month/" + (this.currentMonth ? this.currentMonth : "bgApril") + ".png";
            }
        }
        else {
            var lunarYear = this.currentLunaYear;
            var lunarMonth = this.currentLunaMonth - 1;
            if (database && database[lunarYear] && database[lunarYear][1] && database[lunarYear][1][lunarMonth]) {
                this.month_count = this.domSanitizer.bypassSecurityTrustResourceUrl(database[lunarYear][1][lunarMonth]);
            }
            else if (database && database["default"] && database["default"][1] && database["default"][1][lunarMonth]) {
                this.month_count = this.domSanitizer.bypassSecurityTrustResourceUrl(database["default"][1][lunarMonth]);
            }
            else {
                this.month_count = "../assets/imgs/month/" + (this.monthNames[lunarMonth]) + ".png";
            }
        }
    };
    WeekViewPage.prototype.getDaysOfMonth = function () {
        this.weeksInThisMonth = new Array();
        this.daysInThisMonth = new Array();
        this.daysLunarInThisMonth = new Array();
        this.daysInLastMonth = new Array();
        this.daysInNextMonth = new Array();
        this.currentMonth = this.monthNames[this.date.getMonth()];
        this.currentMonthMonth = this.date.getMonth() + 1;
        var currentLunaDate = getLunarDate(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
        this.currentLunaMonth = currentLunaDate.month;
        this.currentLunaYear = currentLunaDate.year;
        this.currentYear = this.date.getFullYear();
        if (this.date.getMonth() === new Date().getMonth()) {
            this.currentDate = new Date().getDate();
        }
        else {
            this.currentDate = 999;
        }
        var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
        for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
            this.daysInLastMonth.push(i);
            this.addWeek(i, -1);
        }
        var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        for (var j = 0; j < thisNumOfDays; j++) {
            this.daysInThisMonth.push(j + 1);
            var day = j + 1;
            this.addWeek(day, 0);
        }
        var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
        // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
        var indexLastday = 6 - lastDayThisMonth;
        for (var k = 0; k < (6 - lastDayThisMonth); k++) {
            this.daysInNextMonth.push(k + 1);
            this.addWeek(k + 1, 1);
        }
        var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
        if (totalDays < 36) {
            for (var l = (7 - lastDayThisMonth); l < ((7 - lastDayThisMonth) + 7); l++) {
                this.daysInNextMonth.push(l);
                this.addWeek(l, 1);
            }
            indexLastday = ((7 - lastDayThisMonth) + 7);
        }
        for (var lnm = indexLastday; lnm < indexLastday + 7; lnm++) {
            this.addWeek(lnm + 1, 1);
        }
    };
    WeekViewPage.prototype.addWeek = function (index, indexOfWeek) {
        if (this.indexOfWeek == 0) {
            this.weeksInThisMonth[this.indexOfWeek] = new Array();
            for (var j = 7; j >= 1; j--) {
                this.weeksInThisMonth[this.indexOfWeek].push({
                    day: index - j,
                    prevOrNextMonth: indexOfWeek
                });
            }
            this.indexOfWeek += 1;
        }
        if (this.weekCount == 0) {
            this.weeksInThisMonth[this.indexOfWeek] = new Array();
        }
        this.weeksInThisMonth[this.indexOfWeek].push({
            day: index,
            prevOrNextMonth: indexOfWeek
        });
        this.weekCount += 1;
        if (this.weekCount >= 7) {
            this.weekCount = 0;
            this.indexOfWeek += 1;
        }
    };
    WeekViewPage.prototype.addEvent = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__add_event_add_event__["a" /* AddEventPage */]);
    };
    WeekViewPage.prototype.slideChanged = function () {
        if (this.is_slide == true) {
            this.is_slide = false;
            return;
        }
        var currentIndex = this.slides.getActiveIndex();
        this.is_slide = true;
        if (currentIndex == 0) {
            this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 7);
            this.initDay();
        }
        else {
            this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 7);
            this.initDay();
        }
        this.slides.slideTo(1, 0);
    };
    WeekViewPage.prototype.goToLastMonth = function () {
        this.slides.slidePrev(500, true);
    };
    WeekViewPage.prototype.goToNextMonth = function () {
        this.slides.slideNext(500, true);
    };
    WeekViewPage.prototype.selectDate = function (day) {
        this.isSelected = false;
        var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
        var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
        var lunaDay = this.daysLunarInThisMonth[day - 1];
        var data = {
            day: day,
            month: this.date.getMonth() + 1,
            year: this.date.getFullYear(),
            dateStart: thisDate1,
            dateEnd: thisDate2,
            lunaDay: lunaDay,
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__day_modal_day_modal__["a" /* DayModalPage */], {
            data: data,
        });
    };
    WeekViewPage.prototype.loadEventThisMonth = function () {
        var _this = this;
        this.eventList = new Array();
        if (!this.loading) {
            return;
        }
        if (this.plt.is('android')) {
            var startDate = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
            var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        }
        else {
            var startDate = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
            var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        }
        this.calendar.listEventsInRange(startDate, endDate).then(function (msg) {
            msg.forEach(function (item) {
                if (!item.startDate && item.dtstart) {
                    item.startDate = item.dtstart;
                }
                if (!item.endDate && item.dtend) {
                    item.endDate = item.dtend;
                }
                if (!item.location && item.eventLocation) {
                    item.location = item.eventLocation;
                }
                if (_this.plt.is('ios')) {
                    // alert("base :"+item.startDate);
                    var timeArray = item.startDate.split(" ");
                    var timeA = timeArray[0].split("-");
                    var timeB = timeArray[1].split(":");
                    var SD = new Date(timeA[1] + "/" + timeA[2] + "/" + timeA[0] + " " + timeB[0] + ":" + timeB[1] + ":00");
                    //alert(SD);
                    item.timer_startDate = new Date(SD).getTime();
                    var timeArray = item.endDate.split(" ");
                    var timeC = timeArray[0].split("-");
                    var timeD = timeArray[1].split(":");
                    var ED = new Date(timeC[1] + "/" + timeC[2] + "/" + timeC[0] + " " + timeD[0] + ":" + timeD[1] + ":00");
                    item.timer_endDate = new Date(ED).getTime();
                }
                else {
                }
                // item.allDay                
                // this.printObject(item);
                _this.eventList.push(item);
            });
            // alert(JSON.stringify(this.eventList));
        }, function (err) {
            console.log(err);
        });
    };
    WeekViewPage.prototype.checkEvent = function (day) {
        if (!this.loading) {
            return false;
        }
        var month = this.date.getMonth();
        var year = this.date.getFullYear();
        var day = day.day;
        var hasEvent = false;
        if (this.plt.is('android')) {
            var thisDate1_1 = new Date(year + "-" + (month + 1) + "-" + day + " 00:00:00").getTime();
            var thisDate2_1 = new Date(year + "-" + (month + 1) + "-" + day + " 23:59:59").getTime();
            this.eventList.forEach(function (event) {
                if (((event.startDate >= thisDate1_1) && (event.startDate <= thisDate2_1)) || ((event.endDate >= thisDate1_1) && (event.endDate <= thisDate2_1))) {
                    // hasEvent = true;
                    if (event.allDay || event.allday) {
                        if (!(event.endDate <= thisDate2_1)) {
                            hasEvent = true;
                        }
                    }
                    else {
                        hasEvent = true;
                    }
                }
            });
        }
        else {
            // let thisDate1 = year+"-"+(month+1)+"-"+day+" 00:00:00";
            // let thisDate2 = year+"-"+(month+1)+"-"+day+" 23:59:59";
            var thisDate1_2 = new Date(month + 1 + "/" + day + "/" + year + " 00:00:00").getTime();
            var thisDate2_2 = new Date(month + 1 + "/" + day + "/" + year + " 23:59:59").getTime();
            this.eventList.forEach(function (event) {
                if (((event.timer_startDate >= thisDate1_2) && (event.timer_startDate <= thisDate2_2)) || ((event.timer_endDate >= thisDate1_2) && (event.timer_endDate <= thisDate2_2))) {
                    hasEvent = true;
                    // alert(hasEvent);
                }
            });
        }
        return hasEvent;
    };
    WeekViewPage.prototype.getBg = function (index) {
        var imageBg = "url(../assets/imgs/background/bg" + index + ".jpg)";
        return imageBg;
    };
    WeekViewPage.prototype.getActive = function (index) {
        if (index == this.currentMonth) {
            return 'animation';
        }
        return '';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */])
    ], WeekViewPage.prototype, "slides", void 0);
    WeekViewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-week-view',template:/*ion-inline-start:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\week-view\week-view.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle class="menu-button">\n      <ion-icon name="menu"></ion-icon>\n    </button>  	\n    <ion-title>\n      <img class="logo-header" alt="logo" height="40"   src="../assets/imgs/logo-header.png" > \n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addEvent()" class="add-button">\n        <ion-icon name="md-add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<div class="BG-image-view">\n	<div *ngFor="let month of monthNames; let i = index; trackBy: customTrackBy" class="BG-image-animation BG-image {{getActive(month)}}" [style.backgroundImage]="background_img[i]" ></div>\n</div>	\n\n<ion-content class="ion-content no-scroll">\n	<div class="month-count">\n		<img [src]="month_count" *ngIf="month_count">\n	</div>	\n	<div class="calendar-view">\n		<img class="air-logo" src="../assets/imgs/air.png">\n		<div class="blur-filter">		\n			<div class="background-filter" [style.backgroundImage]="background_img[currentMonth]" *ngIf="!is_lunaCalendar && loading"></div>\n\n			<div class="background-filter" [style.backgroundImage]="background_img[currentLunaMonth - 1]" *ngIf="is_lunaCalendar && loading"></div>\n\n		  	<div class="background-shadow">\n			  <div class="calendar-header" *ngIf="loading">\n			    <ion-row class="calendar-month">\n			      <ion-col col-2 (click)="goToLastMonth()"><ion-icon name="ios-arrow-back"></ion-icon></ion-col>\n						<ion-col col-8 *ngIf="!is_lunaCalendar">{{currentMonth | translate}} / {{currentYear}}</ion-col>\n						<ion-col col-8 *ngIf="is_lunaCalendar">{{monthLunaNames[currentLunaMonth - 1] | translate}} / {{currentLunaYear}}</ion-col>\n			      <ion-col col-2 (click)="goToNextMonth()"><ion-icon name="ios-arrow-forward"></ion-icon></ion-col>\n			    </ion-row>\n			  </div>\n			  <div class="calendar-body-slide">\n				<ion-slides *ngIf="!is_lunaCalendar" (ionSlideDidChange)="slideChanged()">	\n					<ion-slide>\n						<div class="calendar-body" *ngIf="loading">\n							<ion-grid>\n							  <ion-row class="calendar-weekday">\n							    <ion-col *ngFor="let dayname of dayNames">{{dayname | translate}}</ion-col>\n							  </ion-row>\n							  <ion-row class="calendar-date">\n							    <ion-col col-1 *ngFor="let day of daysInLastWeek" (click)="selectDate(day.day)">\n							      <span class="currentDate t{{day.dayWeek}} event-{{checkEvent(day)}}" *ngIf="currentDate === day.day; else otherDate"><span class="n-day">{{day.day}}</span> <span class="lunar-day">{{day.lunarDay}}</span></span>\n							      <ng-template #otherDate class="otherDate">\n							      	<span class="otherDate t{{day.dayWeek}} event-{{checkEvent(day)}}">\n							        <span class="n-day">{{day.day}}</span> <span class="lunar-day">{{day.lunarDay}}</span></span>\n							      </ng-template>\n							    </ion-col>\n							  </ion-row>\n							</ion-grid>\n						</div>	\n					</ion-slide>						\n					<ion-slide>\n						<div class="calendar-body" *ngIf="loading">\n							<ion-grid>\n							  <ion-row class="calendar-weekday">\n							    <ion-col *ngFor="let dayname of dayNames">{{dayname | translate}}</ion-col>\n							  </ion-row>\n							  <ion-row class="calendar-date">\n							    <ion-col col-1 *ngFor="let day of daysInThisWeek" (click)="selectDate(day.day)">\n							      <span class="currentDate t{{day.dayWeek}} event-{{checkEvent(day)}}" *ngIf="currentDate === day.day; else otherDate"><span class="n-day">{{day.day}}</span> <span class="lunar-day">{{day.lunarDay}}</span></span>\n							      <ng-template #otherDate class="otherDate">\n							      	<span class="otherDate t{{day.dayWeek}} event-{{checkEvent(day)}}">\n							        <span class="n-day">{{day.day}}</span> <span class="lunar-day">{{day.lunarDay}}</span></span>\n							      </ng-template>\n							    </ion-col>\n							  </ion-row>\n							</ion-grid>\n						</div>	\n					</ion-slide>						\n					<ion-slide>\n						<div class="calendar-body" *ngIf="loading">\n							<ion-grid>\n							  <ion-row class="calendar-weekday">\n							    <ion-col *ngFor="let dayname of dayNames">{{dayname | translate}}</ion-col>\n							  </ion-row>\n							  <ion-row class="calendar-date">\n							    <ion-col col-1 *ngFor="let day of daysInNextWeek" (click)="selectDate(day.day)">\n							      <span class="currentDate t{{day.dayWeek}} event-{{checkEvent(day)}}" *ngIf="currentDate === day.day; else otherDate"><span class="n-day">{{day.day}}</span> <span class="lunar-day">{{day.lunarDay}}</span></span>\n							      <ng-template #otherDate class="otherDate">\n							      	<span class="otherDate t{{day.dayWeek}} event-{{checkEvent(day)}}">\n							        <span class="n-day">{{day.day}}</span> <span class="lunar-day">{{day.lunarDay}}</span></span>\n							      </ng-template>\n							    </ion-col>\n							  </ion-row>\n							</ion-grid>\n						</div>	\n					</ion-slide>						\n				</ion-slides>\n				<ion-slides *ngIf="is_lunaCalendar" (ionSlideDidChange)="slideChanged()">	\n					<ion-slide>\n						<div class="calendar-body" *ngIf="loading">\n							<ion-grid>\n							  <ion-row class="calendar-weekday">\n							    <ion-col *ngFor="let dayname of dayNames">{{dayname | translate}}</ion-col>\n							  </ion-row>\n							  <ion-row class="calendar-date">\n							    <ion-col col-1 *ngFor="let day of daysInLastWeek" (click)="selectDate(day.day)">\n							      <span class="currentDate t{{day.dayWeek}} event-{{checkEvent(day)}}" *ngIf="currentDate === day.day; else otherDate"><span class="n-day">{{day.lunarDayDay}}</span> <span class="lunar-day">{{day.day}}</span></span>\n							      <ng-template #otherDate class="otherDate">\n							      	<span class="otherDate t{{day.dayWeek}} event-{{checkEvent(day)}}">\n							        <span class="n-day">{{day.lunarDayDay}}</span> <span class="lunar-day">{{day.day}}</span></span>\n							      </ng-template>\n							    </ion-col>\n							  </ion-row>\n							</ion-grid>\n						</div>	\n					</ion-slide>						\n					<ion-slide>\n						<div class="calendar-body" *ngIf="loading">\n							<ion-grid>\n							  <ion-row class="calendar-weekday">\n							    <ion-col *ngFor="let dayname of dayNames">{{dayname | translate}}</ion-col>\n							  </ion-row>\n							  <ion-row class="calendar-date">\n							    <ion-col col-1 *ngFor="let day of daysInThisWeek" (click)="selectDate(day.day)">\n							      <span class="currentDate t{{day.dayWeek}} event-{{checkEvent(day)}}" *ngIf="currentDate === day.day; else otherDate"><span class="n-day">{{day.lunarDayDay}}</span> <span class="lunar-day">{{day.day}}{{(day.day == 1)?("/"+currentMonthMonth):""}}</span></span>\n							      <ng-template #otherDate class="otherDate">\n							      	<span class="otherDate t{{day.dayWeek}} event-{{checkEvent(day)}}">\n							        <span class="n-day">{{day.lunarDayDay}}</span> <span class="lunar-day">{{day.day}}{{(day.day == 1)?("/"+currentMonthMonth):""}}</span></span>\n							      </ng-template>\n							    </ion-col>\n							  </ion-row>\n							</ion-grid>\n						</div>	\n					</ion-slide>						\n					<ion-slide>\n						<div class="calendar-body" *ngIf="loading">\n							<ion-grid>\n							  <ion-row class="calendar-weekday">\n							    <ion-col *ngFor="let dayname of dayNames">{{dayname | translate}}</ion-col>\n							  </ion-row>\n							  <ion-row class="calendar-date">\n							    <ion-col col-1 *ngFor="let day of daysInNextWeek" (click)="selectDate(day.day)">\n							      <span class="currentDate t{{day.dayWeek}} event-{{checkEvent(day)}}" *ngIf="currentDate === day.day; else otherDate"><span class="n-day">{{day.lunarDayDay}}</span> <span class="lunar-day">{{day.day}}</span></span>\n							      <ng-template #otherDate class="otherDate">\n							      	<span class="otherDate t{{day.dayWeek}} event-{{checkEvent(day)}}">\n							        <span class="n-day">{{day.lunarDayDay}}</span> <span class="lunar-day">{{day.day}}</span></span>\n							      </ng-template>\n							    </ion-col>\n							  </ion-row>\n							</ion-grid>\n						</div>	\n					</ion-slide>						\n				</ion-slides>				\n			  </div>\n		    </div>\n		</div>\n	</div>\n</ion-content>\n<img class="font-bg" src="../assets/imgs/font-bg.png">\n\n<svg class=\'svgfilter\' version="1.1" xmlns="http://www.w3.org/2000/svg">\n  <filter id="svgfilter" class="svgfilter-item">\n    <feGaussianBlur stdDeviation="2" />\n		<!-- comment out feComponentTransfer to remove the darkness -->\n    <feComponentTransfer>\n        <feFuncR type="linear" slope="0.9"/>\n        <feFuncG type="linear" slope="0.9"/>\n        <feFuncB type="linear" slope="0.9"/>\n    </feComponentTransfer>\n  </filter>\n </svg>\n <svg class=\'\' height="0" width="0"> \n  <defs>\n    <clipPath id="myClip" clipPathUnits="objectBoundingBox" transform="scale(0.00135 0.00300)">\n    >\n		<path d="M749.906,139.252V68.65c-13.18-14.72-35.135-22.648-57.432-22.648c-5.672,0-11.268,0.606-16.67,1.757c-15.943-19.634-41.707-31.895-70.102-30.342c-27.441,1.501-51.063,15.568-65.02,35.7c-17.848-19.25-48.047-31.024-81.605-29.189c-26.324,1.439-49.68,10.979-66.076,25.2c-11.238-18.415-31.516-30.709-54.668-30.709c-16.396,0-31.344,6.172-42.668,16.311C270.283,5.472,221.396-8.116,174.645,5.022c-23.131,6.5-42.639,19.042-57.089,34.717c-15.521-10.272-35.768-15.658-57.345-14.478C35.332,26.623,13.9,38.239,0,55.042v88.075v208.426h749.906V139.252z"/>\n    </clipPath>\n  </defs>  \n \n</svg>'/*ion-inline-end:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\week-view\week-view.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_calendar__["a" /* Calendar */], __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]])
    ], WeekViewPage);
    return WeekViewPage;
}());

//# sourceMappingURL=week-view.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateResourcePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_transfer__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_base64__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_photo_library__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_sqlite__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











// import { Network } from '@ionic-native/network';

var UpdateResourcePage = /** @class */ (function () {
    function UpdateResourcePage(alertCtrl, navCtrl, navParams, transfer, file, http, storage, plt, base64, photoLibrary, domSanitizer, sqlite
        // public network: Network
    ) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.transfer = transfer;
        this.file = file;
        this.http = http;
        this.storage = storage;
        this.plt = plt;
        this.base64 = base64;
        this.photoLibrary = photoLibrary;
        this.domSanitizer = domSanitizer;
        this.sqlite = sqlite;
        this.progress = 0;
        this.progressP = 0;
        this.ApiRouter = configApp.ApiRouter;
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        // this.navCtrl.setRoot(HomePage);
        this.fileTransfer = this.transfer.create();
        if (this.file.cacheDirectory) {
            configApp.file_path = this.file.cacheDirectory;
        }
        this.initDatabase();
        // this.initUpdate();
        // this.progress = 1;
        // if (this.plt.is('ios')) {
        //   this.getCensoredDefault();
        // }
        // else{
        //   this.initUpdate();
        // }
        // this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        //   alert('network was disconnected :-(');
        //   this.disconnectSubscription.unsubscribe();
        //   // this.navCtrl.setRoot(HomePage);
        // });
        // this.connectSubscription = this.network.onConnect().subscribe(() => {
        //   alert('network was connected :-(');
        //   this.connectSubscription.unsubscribe();
        //   this.initDatabase();
        // });    
        // document.addEventListener('offline', () => console.log('onDisconnect'));
        // document.addEventListener('online', () => alert('onDisconnect'));
        // this.appIsOnDevice = !this.plt.url().startsWith('http');
        // this.initNetworkMonitor();
        // var headers = new Headers();
        //   headers.append('Accept', 'application/json' );
        //   headers.append('Content-Type', 'application/json' );
        //   headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9iZXVuaWsuY29tLnZuXC9kZW1vXC9tZWRpY2FsLWFwcFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU1MjEwNTAzNCwiZXhwIjoxNTU0Njk3MDM0LCJuYmYiOjE1NTIxMDUwMzQsImp0aSI6IjF1NWpzbUJEdVZQYXMxMWgiLCJzdWIiOjEsInBydiI6IjQxMWM5MTdhMGZiNTFlMGE0MjdhN2UzZGVhYTVhNDllMjkyZGRiOWIifQ.O9MSrORYARsoLl6NR6BbLVkYGvAQQLPzRgTa3aovFJo' );
        //   const requestOptions = new RequestOptions({ headers: headers });
        //   var my_device = this.plt.is('ios')?"ios":"android";
        //   let postData = {
        //     name: 'ada'
        //   }    
        //  this.http.post('http://beunik.com.vn/demo/medical-app/api/customer/create', postData, requestOptions).map(res => res.json()).subscribe(data => {
        //   console.log(data);
        // }, error => {
        //     console.log(error);
        //     this.navCtrl.setRoot(HomePage);
        // });  
    }
    UpdateResourcePage.prototype.ionViewDidLoad = function () {
        // console.log("qwegggqe");
        // alert("qweqe");
    };
    UpdateResourcePage.prototype.initDatabase = function () {
        var _this = this;
        this.sqlite.create({
            name: 'vietjetecalendar.db',
            location: 'default'
        }).then(function (db) {
            _this.db = db;
            db.executeSql("\n        CREATE TABLE IF NOT EXISTS background_image \n          ( _id INTEGER PRIMARY KEY AUTOINCREMENT, year TEXT, \n            month TEXT, type TEXT, imageData BLOB, imageUrl TEXT\n        )", [])
                .then(function (res) {
                _this.initUpdate();
                // if (this.plt.is('ios')) {
                //   this.getCensoredDefault();
                // }
                // else{
                //   this.initUpdate();
                // }
            })
                .catch(function (e) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
                // alert(e);
            });
        }).catch(function (e) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
            // alert(e);
        });
    };
    UpdateResourcePage.prototype.getCensoredDefault = function () {
        var _this = this;
        this.http.get(this.ApiRouter + 'api/censored-default').map(function (res) { return res.json(); }).subscribe(function (data) {
            if (data && data.result) {
                configApp.censored_default = data.result;
                // this.storage.set('update_censored', data.result);
            }
            _this.initUpdate();
        });
    };
    UpdateResourcePage.prototype.initUpdate = function () {
        var _this = this;
        var date = new Date();
        var year = date.getFullYear();
        var allUpdatePromises = new Array();
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
        // headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var my_device = this.plt.is('ios') ? "ios" : "android";
        var postData = {
            device: my_device
        };
        this.http.post(configApp.ApiRouter + 'api/year-image', postData, requestOptions).map(function (res) { return res.json(); }).subscribe(function (data) {
            if (data && data.result && data.result.length > 0) {
                var allUpdateStorage = new Array();
                for (var i = 0; i < data.result.length; i++) {
                    allUpdateStorage.push(_this.storage.get('update_R_' + data.result[i].year));
                }
                Promise.all(allUpdateStorage).then(function (values) {
                    _this.UpdateAll(data.result, values, 0);
                });
            }
            else {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
            }
        }, function (error) {
            console.log(error);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
        });
    };
    UpdateResourcePage.prototype.UpdateAll = function (data, values, index) {
        var _this = this;
        if (data && values && values.length > index) {
            // console.log(values);
            // console.log(index);
            // console.log(data[index]);
            // alert(data[index].year);
            //   this.getUpdate(values[index],data[index]).then(() => {
            //       this.UpdateAll(data,values,index + 1);
            //   }); 
            if (data[index].year == "default_ios") {
                this.UpdateAll(data, values, index + 1);
            }
            else {
                this.getUpdate(values[index], data[index]).then(function () {
                    _this.UpdateAll(data, values, index + 1);
                });
            }
        }
        else {
            if (this.progress != -1) {
                this.progress = 100;
                var root_1 = this;
                setTimeout(function () { root_1.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]); }, 1000);
            }
            else {
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
            }
        }
    };
    UpdateResourcePage.prototype.getUpdate = function (version, data) {
        var _this = this;
        var year = data.year;
        return new Promise(function (resolve, reject) {
            if (data && data.version && data.version != version) {
                if (!_this.progress)
                    _this.progress = 1;
                _this.progressP += 36;
                _this.download(data).then(function (result) { resolve(); }).catch(function (e) { resolve(); });
            }
            else {
                _this.getBackgroundImageDataFromDatabase(year).then(function (result) {
                    if (result && result.rows && result.rows.length > 0) {
                        if (!database) {
                            database = {};
                        }
                        if (!database[year]) {
                            database[year] = {};
                        }
                        for (var i = 0; i < result.rows.length; i++) {
                            var rowItem = result.rows.item(i);
                            if (!database[year][rowItem.type]) {
                                database[year][rowItem.type] = {};
                            }
                            database[year][rowItem.type][rowItem.month] = rowItem.imageData;
                        }
                        resolve();
                    }
                    else {
                        resolve();
                    }
                }).catch(function (e) {
                    resolve();
                });
            }
        });
    };
    UpdateResourcePage.prototype.download = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (data) {
                var allPromises = new Array();
                for (var i = 0; i < data.gallery.length; i++) {
                    allPromises.push(_this.downloadBackgroundPromise(data.gallery[i], data.year, 0, i));
                }
                Promise.all(allPromises).then(function () {
                    var allPromises = new Array();
                    for (var i = 0; i < data.text.length; i++) {
                        allPromises.push(_this.downloadBackgroundPromise(data.text[i], data.year, 1, i));
                    }
                    Promise.all(allPromises).then(function () {
                        var allPromises = new Array();
                        for (var i = 0; i < data.gallery_detail.length; i++) {
                            allPromises.push(_this.downloadBackgroundPromise(data.gallery_detail[i], data.year, 2, i));
                        }
                        Promise.all(allPromises).then(function () {
                            _this.storage.set('update_R_' + data.year, data.version);
                            resolve();
                        });
                    });
                });
            }
            else {
                resolve();
            }
        });
    };
    UpdateResourcePage.prototype.downloadBackgroundPromise = function (item, year, type, index) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // let TIME_IN_MS = 1000;
            // let hideFooterTimeout = setTimeout( () => {
            //      resolve();
            //      // reject(null);
            // }, TIME_IN_MS); 
            // return;      
            var url = configApp.ApiRouter + item.path;
            var path = configApp.file_path + "imgs/background/bg" + _this.monthNames[index] + ".jpg";
            _this.fileTransfer.download(url, path).then(function (entry) {
                if (_this.plt.is('ios')) {
                    _this.getBase64StringByFilePath(entry.toURL()).then(function (base64File) {
                        _this.addbase64FileToDatabase(base64File, year, type, index);
                        resolve();
                    }, function (err) {
                        resolve();
                    });
                }
                else {
                    _this.base64.encodeFile(entry.toURL()).then(function (base64File) {
                        _this.addbase64FileToDatabase(base64File, year, type, index);
                        resolve();
                    }, function (err) {
                        resolve();
                    });
                }
            }).catch(function (e) {
                resolve();
            });
        });
    };
    UpdateResourcePage.prototype.getBase64StringByFilePath = function (fileURL) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var fileName = fileURL.substring(fileURL.lastIndexOf('/') + 1);
            var filePath = fileURL.substring(0, fileURL.lastIndexOf("/") + 1);
            _this.file.readAsDataURL(filePath, fileName).then(function (file64) {
                // console.log(file64); //base64url...
                resolve(file64);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    UpdateResourcePage.prototype.addbase64FileToDatabase = function (base64File, year, type, index) {
        var imageSrc = base64File.split(",");
        if (!database) {
            database = {};
        }
        if (!database[year]) {
            database[year] = {};
        }
        if (!database[year][type]) {
            database[year][type] = {};
        }
        database[year][type][index] = ("data:image/jpeg;base64," + imageSrc[1]).replace(/(\r\n|\n|\r)/gm, "");
        this.saveBackgroundImageDataToDatabase(year, index, type, ("data:image/jpeg;base64," + imageSrc[1]).replace(/(\r\n|\n|\r)/gm, ""), '');
        // let count_p = parseInt(100/this.progressP);
        var count_p = 100 / this.progressP;
        this.progress += count_p;
        if (this.progress > 100) {
            this.progress = 100;
        }
    };
    UpdateResourcePage.prototype.saveBackgroundImageDataToDatabase = function (year, month, type, imageData, imageUrl) {
        var _this = this;
        if (imageUrl === void 0) { imageUrl = ''; }
        if (!this.db) {
            console.log({ error: 'Database is not initialized' });
        }
        var sql = "SELECT year, month, type FROM background_image WHERE year = ? AND month = ? AND type = ?";
        this.db.executeSql(sql, [year, month, type]).then(function (data) {
            var sql = '';
            var sqlData = [];
            if (data && data.rows.length > 0) {
                sql = "UPDATE background_image SET imageData = ?, imageUrl = ? WHERE year = ? AND month = ? AND type = ?";
                sqlData = [imageData, imageUrl, year, month, type];
            }
            else {
                sql = "INSERT INTO background_image (year, month, type, imageData, imageUrl) VALUES (?, ?, ?, ?, ?)";
                sqlData = [year, month, type, imageData, imageUrl];
            }
            _this.db.executeSql(sql, sqlData).then(function (data) {
                // console.log(data);
                // alert(JSON.stringify(data));
                // this.getBackgroundImageDataFromDatabase(year);
            }, function (error) {
                alert(JSON.stringify(error));
            });
        });
    };
    UpdateResourcePage.prototype.getBackgroundImageDataFromDatabase = function (year) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.db) {
                reject({
                    error: 'Database is not initialized'
                });
            }
            var sql = "\n        SELECT year, month, type, imageData, imageUrl \n        FROM background_image \n        WHERE year = ?\n        ORDER BY month ASC\n        ";
            _this.db.executeSql(sql, [year]).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    UpdateResourcePage.prototype.getBg = function () {
        var imageBg = "url(../assets/imgs/screen.jpg)";
        return imageBg;
    };
    UpdateResourcePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-update-resource',template:/*ion-inline-start:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\update-resource\update-resource.html"*/'<ion-content padding>\n	<div class="background-filter" [style.background-image]="getBg()"></div>\n    <div class="progress-outer" *ngIf="progress>0 && progress<=100 && progress==-100">\n        <div class="progress-inner" [style.width]="progress + \'%\'">\n            {{progress}}%\n        </div>\n    </div>\n</ion-content>\n'/*ion-inline-end:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\update-resource\update-resource.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_base64__["a" /* Base64 */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_photo_library__["a" /* PhotoLibrary */],
            __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_sqlite__["a" /* SQLite */]
            // public network: Network
        ])
    ], UpdateResourcePage);
    return UpdateResourcePage;
}());

//# sourceMappingURL=update-resource.js.map

/***/ }),

/***/ 139:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 139;

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-event/add-event.module": [
		442,
		9
	],
	"../pages/convert-calendar/convert-calendar.module": [
		441,
		8
	],
	"../pages/day-modal/day-modal.module": [
		443,
		7
	],
	"../pages/edit-event/edit-event.module": [
		444,
		1
	],
	"../pages/gallery-category/gallery-category.module": [
		445,
		6
	],
	"../pages/gallery-modal/gallery-modal.module": [
		446,
		5
	],
	"../pages/gallery-view/gallery-view.module": [
		447,
		4
	],
	"../pages/guide-modal/guide-modal.module": [
		448,
		0
	],
	"../pages/update-resource/update-resource.module": [
		450,
		3
	],
	"../pages/week-view/week-view.module": [
		449,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 181;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectpikerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_calendar__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SelectpikerPage = /** @class */ (function () {
    function SelectpikerPage(translate, calendar, viewCtrl, navParams, plt) {
        this.translate = translate;
        this.calendar = calendar;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.plt = plt;
        this.currentMonth = "January";
        this.allDay = false;
        this.is_lunaCalendar = false;
        mobiscroll.settings = {
            lang: 'en',
            theme: 'ios',
            buttons: [
                {
                    text: 'Hide1',
                    handler: 'set',
                    cssClass: 'calendar-btn'
                },
                {
                    text: 'Hide',
                    handler: 'cancel',
                    cssClass: 'calendar-btn'
                }
            ]
        };
        this.translate.get('cancel').subscribe(function (value) {
            mobiscroll.settings.buttons[1].text = value;
        });
        this.translate.get('Set').subscribe(function (value) {
            mobiscroll.settings.buttons[0].text = value;
        });
        // this.instance = mobiscroll.time('#time-hms', {
        //     timeFormat: 'HH:ii:ss',
        //     headerText: 'Time: {value}',
        //     onInit: function (event, inst) {
        //         inst.setVal(now, true);
        //     }
        // }); 
        // this.is_lunaCalendar = true;
        // console.log(this.navParams);
        var date = this.navParams.get('date');
        var time = this.navParams.get('time');
        var lunaCalendar = this.navParams.get('lunaCalendar');
        var startDate = this.navParams.get('startDate');
        var endDate = this.navParams.get('endDate');
        var type = this.navParams.get('type');
        this.allDay = this.navParams.get('allDay');
        if (time) {
            this.myTime = time;
        }
        else {
            this.myTime = time;
        }
        var mytime = this.myTime.split(":");
        if (mytime[0].length == 1) {
            mytime[0] = "0" + mytime[0];
        }
        if (mytime[1].length == 1) {
            mytime[1] = "0" + mytime[1];
        }
        this.myTime = mytime[0] + ":" + mytime[1];
        if (lunaCalendar) {
            this.is_lunaCalendar = lunaCalendar;
        }
        if (type) {
            this.type = type;
        }
        if (date) {
            this.myDate = date;
        }
        else {
            this.myDate = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
        }
        if (startDate) {
            this.startDate = startDate;
            if (this.type == "start") {
                this.myDate = startDate.date;
            }
        }
        if (endDate) {
            if (this.type == "end") {
                this.endDate = endDate;
                this.myDate = endDate.date;
            }
        }
        this.callback = this.navParams.get('callback');
        this.initView();
    }
    SelectpikerPage.prototype.ngAfterViewInit = function () {
        this.slides.centeredSlides = false;
    };
    SelectpikerPage.prototype.ionViewWillEnter = function () {
        this.loadEventThisMonth();
        this.slides.slideTo(1, 0);
        var startDate = this.startDate;
        var root = this;
        var type = this.type;
        this.instance = mobiscroll.time('#time-hms', {
            timeFormat: 'HH:ii',
            onShow: function (event, inst) {
                var element = document.getElementsByClassName("mbsc-fr")[0];
                element.classList.remove("disabled");
                if (type == "end") {
                    if ((root.myDate == startDate.date && event.valueText < startDate.time) || root.myDate < startDate.date) {
                        element.classList.add("disabled");
                    }
                }
            },
            onChange: function (event, inst) {
                var element = document.getElementsByClassName("mbsc-fr")[0];
                element.classList.remove("disabled");
                if (type == "end") {
                    if ((root.myDate == startDate.date && event.valueText < startDate.time) || root.myDate < startDate.date) {
                        element.classList.add("disabled");
                    }
                }
            },
        });
    };
    SelectpikerPage.prototype.myTimeChange = function (data) {
        this.myTime = data;
        // console.log(this.myTime);
        if (this.myDate && this.myTime) {
            var data_1 = {
                date: this.myDate,
                time: this.myTime
            };
            this.callback(data_1).then(function () { });
        }
    };
    SelectpikerPage.prototype.initView = function () {
        console.log(this.myDate);
        if (this.myDate) {
            this.date = new Date(this.myDate);
        }
        else {
            this.date = new Date();
        }
        if (this.plt.is("ios")) {
            if (this.myDate) {
                var dateSplit = this.myDate.split("-");
                this.date = new Date(dateSplit[0], (parseInt(dateSplit[1]) - 1), (parseInt(dateSplit[2]) + 1));
            }
            else {
                this.date = new Date();
            }
        }
        this.dayday = this.date.getDate();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();
        var currentLunaDate = getLunarDate(this.dayday, this.month + 1, this.year);
        this.currentLunaMonth = currentLunaDate.month;
        this.currentLunaYear = currentLunaDate.year;
        this.LunaMonth = currentLunaDate.month;
        this.LunaYear = currentLunaDate.year;
        this.calendarPerv_Next = new Array();
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.monthLunaNames = ["thang_gieng", "thang_2", "thang_3", "thang_4", "thang_5", "thang_6", "thang_7", "thang_8", "thang_9", "thang_10", "thang_11", "thang_chap"];
        // this.monthNames = ["1","2","3","4","5","6","7","8","9","10","11","12"];
        // this.dayNames = ["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"];
        // this.dayNames = ["CN","T.2","T.3","T.4","T.5","T.6","T.7"];
        this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.getDaysOfMonth();
        this.initSlide();
        this.loadEventThisMonth();
        this.is_slide = true;
        // this.slides.slideTo(1, 0);
    };
    SelectpikerPage.prototype.initSlide = function () {
        this.calendarPerv_Next[0] = new Array();
        if (!this.is_lunaCalendar) {
            this.calendarPerv_Next[0].date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        }
        else {
            this.calendarPerv_Next[0].date = this.addLunarPrevMonth(this.date);
        }
        this.getMonth(0);
        this.calendarPerv_Next[1] = new Array();
        this.calendarPerv_Next[1].date = this.date;
        this.getMonth(1);
        this.calendarPerv_Next[2] = new Array();
        if (!this.is_lunaCalendar) {
            this.calendarPerv_Next[2].date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        }
        else {
            this.calendarPerv_Next[2].date = this.addLunarNextMonth(this.date);
        }
        this.getMonth(2);
    };
    SelectpikerPage.prototype.getMonth = function (index) {
        this.calendarPerv_Next[index].daysInThisMonth = new Array();
        this.calendarPerv_Next[index].daysLunarInThisMonth = new Array();
        this.calendarPerv_Next[index].daysInLastMonth = new Array();
        this.calendarPerv_Next[index].daysInNextMonth = new Array();
        if (!this.is_lunaCalendar) {
            // this.calendarPerv_Next[index].currentMonth = this.monthNames[this.calendarPerv_Next[index].date.getMonth()];
            this.calendarPerv_Next[index].currentMonth = this.calendarPerv_Next[index].date.getMonth();
            this.calendarPerv_Next[index].currentYear = this.calendarPerv_Next[index].date.getFullYear();
            // if(this.calendarPerv_Next[index].date.getMonth() === new Date().getMonth()) {
            //   this.calendarPerv_Next[index].currentDate = new Date().getDate();
            // } else {
            //   this.calendarPerv_Next[index].currentDate = 999;
            // }
            this.calendarPerv_Next[index].currentDate = this.calendarPerv_Next[index].date.getDate();
            var firstDayThisMonth = new Date(this.calendarPerv_Next[index].date.getFullYear(), this.calendarPerv_Next[index].date.getMonth(), 1).getDay();
            var prevNumOfDays = new Date(this.calendarPerv_Next[index].date.getFullYear(), this.calendarPerv_Next[index].date.getMonth(), 0).getDate();
            for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
                this.calendarPerv_Next[index].daysInLastMonth.push(i);
            }
            var thisNumOfDays = new Date(this.calendarPerv_Next[index].date.getFullYear(), this.calendarPerv_Next[index].date.getMonth() + 1, 0).getDate();
            for (var j = 0; j < thisNumOfDays; j++) {
                this.calendarPerv_Next[index].daysInThisMonth.push(j + 1);
                var day = j + 1;
                var month = this.calendarPerv_Next[index].date.getMonth() + 1;
                var year = this.calendarPerv_Next[index].date.getFullYear();
                var lunarDays = getLunarDate(day, month, year);
                var lunarDay = lunarDays.day;
                if (j == 0 || lunarDays.day == 1) {
                    lunarDay = lunarDays.day + "/" + lunarDays.month;
                }
                var dayWeek = new Date(year, month - 1, day).getDay();
                var lunarDayArray = [lunarDay, dayWeek];
                this.calendarPerv_Next[index].daysLunarInThisMonth.push(lunarDayArray);
            }
            var lastDayThisMonth = new Date(this.calendarPerv_Next[index].date.getFullYear(), this.calendarPerv_Next[index].date.getMonth() + 1, 0).getDay();
            // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
            for (var k = 0; k < (6 - lastDayThisMonth); k++) {
                this.calendarPerv_Next[index].daysInNextMonth.push(k + 1);
            }
            var totalDays = this.calendarPerv_Next[index].daysInLastMonth.length + this.calendarPerv_Next[index].daysInThisMonth.length + this.calendarPerv_Next[index].daysInNextMonth.length;
            if (totalDays < 36) {
                for (var l = (7 - lastDayThisMonth); l < ((7 - lastDayThisMonth) + 7); l++) {
                    this.calendarPerv_Next[index].daysInNextMonth.push(l);
                }
            }
        }
        else {
            this.convertLunaCalendar(this.calendarPerv_Next[index], index);
        }
    };
    SelectpikerPage.prototype.getDaysOfMonth = function () {
        this.currentMonth = this.monthNames[this.date.getMonth()];
        this.currentYear = this.date.getFullYear();
        // if (this.date.getMonth() === new Date().getMonth()) {
        //   this.currentDate = new Date().getDate();
        // } else {
        //   this.currentDate = 999;
        // }
    };
    SelectpikerPage.prototype.convertLunaCalendar = function (calendar_item, index) {
        calendar_item.currentMonth = calendar_item.date.getMonth();
        calendar_item.currentYear = calendar_item.date.getFullYear();
        // let lunarDate = getLunarDate(this.dayday, calendar_item.currentMonth + 1, calendar_item.currentYear);
        // let date = new Date(calendar_item.currentYear, calendar_item.currentMonth, this.dayday - lunarDate.day + 1);
        var lunarDate = getLunarDate(calendar_item.date.getDate(), calendar_item.currentMonth + 1, calendar_item.currentYear);
        var date = new Date(calendar_item.currentYear, calendar_item.currentMonth, calendar_item.date.getDate() - lunarDate.day + 1);
        // let lunarDate = getLunarDate(this.dayday, this.month + 1, this.year);
        // let date = new Date(this.year, this.month, this.dayday - lunarDate.day + 1);
        // let totalDays = this.calculateDayInLunarMonth(lunarDate.month);
        // let totalDays = getMaxDayOfMonth(calendar_item.currentMonth + 1 ,calendar_item.currentYear);
        var totalDays = getMaxDayOfMonth(calendar_item.date.getDate(), calendar_item.currentMonth, calendar_item.currentYear);
        if (index == 1) {
            // console.log(calendar_item.date.getDate());
            // console.log(calendar_item.date.getDay());
            // console.log(calendar_item.currentMonth);
            // console.log(totalDays);
        }
        var firstDayInMonth = date.getDay();
        var dayInLastMonth = [];
        for (var i = 0; i < date.getDay(); i++) {
            dayInLastMonth.push(0);
        }
        var dayInMonth = [];
        var dayLunarInMonth = [];
        for (var i = 1; i <= totalDays; i++) {
            dayInMonth.push(i);
            var sonarDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i - 1);
            dayLunarInMonth.push([((sonarDate.getDate()) == 1 || i == 1) ? sonarDate.getDate() + "/" + (sonarDate.getMonth() + 1) : sonarDate.getDate(), firstDayInMonth % 7, sonarDate.getDate(), sonarDate.getMonth() + 1, sonarDate.getFullYear()]);
            firstDayInMonth++;
        }
        calendar_item.daysInLastMonth = dayInLastMonth;
        calendar_item.daysInThisMonth = dayInMonth;
        calendar_item.daysLunarInThisMonth = dayLunarInMonth;
        calendar_item.lunarDate = lunarDate.day;
        calendar_item.lunarMonth = lunarDate.month;
        calendar_item.lunarLeap = lunarDate.leap;
        calendar_item.lunarYear = lunarDate.year;
        // console.log(calendar_item);
        // var currentLunaDate = 
        // var currentLunaDate = getLunarDate(day,month,year);
        // var month = getMonth(this.month + 1,this.year);
        // console.log(month);
        if (index == 1) {
            // console.log(calendar_item);
        }
        // daysInLastMonth = new Array();
        return calendar_item;
    };
    SelectpikerPage.prototype.calculateDayInLunarMonth = function (month) {
        var daysInMonth = {
            1: 29,
            2: 30,
            3: 29,
            4: 30,
            5: 29,
            6: 30,
            7: 29,
            8: 30,
            9: 29,
            10: 30,
            11: 29,
            12: 30
        };
        return daysInMonth[month];
    };
    SelectpikerPage.prototype.goToLastMonth = function () {
        this.slides.slidePrev(500, true);
    };
    SelectpikerPage.prototype.goToNextMonth = function () {
        this.slides.slideNext(500, true);
    };
    SelectpikerPage.prototype.loadEventThisMonth = function () {
        var _this = this;
        this.eventList = new Array();
        var startDate = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
        var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        this.calendar.listEventsInRange(startDate, endDate).then(function (msg) {
            msg.forEach(function (item) {
                if (!item.startDate && item.dtstart) {
                    item.startDate = new Date(item.dtstart);
                }
                if (!item.endDate && item.dtend) {
                    item.endDate = new Date(item.dtend);
                }
                if (!item.location && item.eventLocation) {
                    item.location = item.eventLocation;
                }
                // item.allDay                
                // this.printObject(item);
                _this.eventList.push(item);
            });
        }, function (err) {
            console.log(err);
        });
    };
    SelectpikerPage.prototype.checkEvent = function (day, calendar_item) {
        var hasEvent = false;
        // var dateSelect = new Date(this.date.getFullYear(), this.date.getMonth() + dayPrev_Next, day);
        if (!this.is_lunaCalendar) {
            var dateSelect = this.date.getFullYear() + "-" + (calendar_item.currentMonth + 1) + "-" + day;
            if (dateSelect == this.myDate) {
                hasEvent = true;
            }
            // dateSelect = new Date(dateSelect);
            if (this.type == "end" && this.startDate && dateSelect == this.startDate.date) {
                hasEvent = true;
            }
            if (this.type == "start" && this.endDate && dateSelect == this.endDate.date) {
                hasEvent = true;
            }
        }
        else {
            var myDay = calendar_item.daysLunarInThisMonth[day - 1][2];
            var mymonth = calendar_item.daysLunarInThisMonth[day - 1][3];
            var myyear = calendar_item.daysLunarInThisMonth[day - 1][4];
            var dateSelect = myyear + "-" + mymonth + "-" + myDay;
            if (dateSelect == this.myDate) {
                hasEvent = true;
            }
            if (this.type == "end" && this.startDate && dateSelect == this.startDate.date) {
                hasEvent = true;
            }
            if (this.type == "start" && this.endDate && dateSelect == this.endDate.date) {
                hasEvent = true;
            }
        }
        return hasEvent;
    };
    SelectpikerPage.prototype.selectDate = function (day, calendar_item) {
        // this.isSelected = false;
        // var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
        // var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";
        // var lunaDay = this.daysLunarInThisMonth[day - 1];
        // let data = {
        //   day : day,
        //   month: this.date.getMonth()+1,
        //   year: this.date.getFullYear(),
        //   dateStart: thisDate1,
        //   dateEnd: thisDate2,
        //   lunaDay: lunaDay,
        // };
        if (!this.is_lunaCalendar) {
            this.myDate = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day;
        }
        else {
            var myDay = calendar_item.daysLunarInThisMonth[day - 1][2];
            var mymonth = calendar_item.daysLunarInThisMonth[day - 1][3];
            var myyear = calendar_item.daysLunarInThisMonth[day - 1][4];
            this.myDate = myyear + "-" + mymonth + "-" + myDay;
        }
        var data = {
            date: this.myDate,
            time: this.myTime
        };
        this.callback(data).then(function () { });
        // this.myDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, day);
    };
    SelectpikerPage.prototype.saveEvent = function () {
        var data = {
            date: this.myDate,
            time: this.myTime
        };
        this.viewCtrl.dismiss(data);
    };
    SelectpikerPage.prototype.closeEvent = function () {
        this.viewCtrl.dismiss();
    };
    SelectpikerPage.prototype.slideChanged = function () {
        if (this.is_slide == true) {
            this.is_slide = false;
            return;
        }
        var currentIndex = this.slides.getActiveIndex();
        this.is_slide = true;
        if (currentIndex == 0) {
            if (!this.is_lunaCalendar) {
                this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
            }
            else {
                this.date = this.addLunarPrevMonth(this.date);
            }
            this.getDaysOfMonth();
            this.initSlide();
            // this.loadEventThisMonth();
        }
        else {
            if (!this.is_lunaCalendar) {
                this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
            }
            else {
                this.date = this.addLunarNextMonth(this.date);
            }
            this.getDaysOfMonth();
            this.initSlide();
            // this.loadEventThisMonth();
        }
        this.slides.slideTo(1, 0);
    };
    SelectpikerPage.prototype.addLunarNextMonth = function (date) {
        var dd = date.getDate();
        var mm = date.getMonth();
        var yy = date.getFullYear();
        var curen_lunar_date = getLunarDate(dd, mm + 1, yy);
        var MaxDayOfMonth = getMaxDayOfMonth(dd, mm, yy);
        var days = (MaxDayOfMonth - curen_lunar_date.day) + 1;
        return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    };
    SelectpikerPage.prototype.addLunarPrevMonth = function (date) {
        var dd = date.getDate();
        var mm = date.getMonth();
        var yy = date.getFullYear();
        var curen_lunar_date = getLunarDate(dd, mm + 1, yy);
        var days = curen_lunar_date.day + 1;
        return new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
    };
    SelectpikerPage.prototype.customTrackBy = function (index, obj) {
        return index;
    };
    SelectpikerPage.prototype.getBg = function (index) {
        var imageBg = "url(../assets/imgs/background/bg" + index + ".jpg)";
        return imageBg;
    };
    SelectpikerPage.prototype.getActive = function (index) {
        if (index == this.currentMonth && !this.is_lunaCalendar) {
            return 'animation';
        }
        if (index == this.monthNames[this.calendarPerv_Next[1].lunarMonth - 1] && this.is_lunaCalendar) {
            return 'animation';
        }
        return '';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */])
    ], SelectpikerPage.prototype, "slides", void 0);
    SelectpikerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-selectpiker',template:/*ion-inline-start:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\selectpiker\selectpiker.html"*/'<!-- <ion-header>\n  <ion-navbar>\n      <ion-buttons left class="back-btn">\n       <button ion-button navPop icon-only>\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n      </ion-buttons> 	\n    <ion-title>\n      <img class="logo-header" alt="logo" height="40" src="../assets/imgs/logo-header.png" > \n    </ion-title>\n	    <ion-buttons end>\n	      <button ion-button icon-only (click)="saveEvent()" class="add-button">\n	        <img height="25" src="../assets/imgs/icon/save_icon.png">\n	      </button>    \n	    </ion-buttons>	  \n  </ion-navbar>\n</ion-header> -->\n\n<!-- <div class="BG-image-view">\n	<div *ngFor="let month of monthNames" class="BG-image-animation BG-image {{getActive(month)}}" [style.background-image]="getBg(month)"></div>\n</div>	 -->\n\n<ion-content class="ion-content no-scroll">	\n	<div class="BG-image-view {{plt.is(\'ios\')?\'ios\':\'android\'}}" (click)="saveEvent()">\n	</div>	\n	<div class="month-count">\n		<img src="../assets/imgs/month/{{currentMonth?currentMonth:bgApril}}.png" *ngIf="!is_lunaCalendar">\n		<img src="../assets/imgs/month/{{calendarPerv_Next?monthNames[calendarPerv_Next[1].lunarMonth - 1]:monthNames[0]}}.png" *ngIf="is_lunaCalendar">\n	</div>\n	<div class="calendar-time" *ngIf="!allDay">\n		<ion-item>\n		  <ion-label>{{\'Time\' | translate}}:</ion-label>\n		  <ion-label >		    	\n		  	<input id="time-hms" [(ngModel)]="myTime" (change)="myTimeChange($event.target.value)">\n		  </ion-label>	\n		</ion-item>	\n\n<!-- 		<ion-item>\n		  <ion-label>{{\'Time\' | translate}}:</ion-label>\n		  <ion-datetime displayFormat="hh:mm A" [(ngModel)]="myTime" (ionChange)="myTimeChange()"></ion-datetime>\n		</ion-item>	 -->	\n			\n	</div>\n	<div class="calendar-view">\n		<div class="blur-filter">\n			<div class="background-filter" [style.background-image]="getBg(currentMonth)" *ngIf="!is_lunaCalendar"></div>\n			<div class="background-filter" [style.background-image]="getBg(calendarPerv_Next?monthNames[calendarPerv_Next[1].lunarMonth - 1]:monthNames[0])" *ngIf="is_lunaCalendar"></div>\n		  	<div class="background-shadow">\n			  <div class="calendar-header">\n			    <ion-row class="calendar-month">\n			      <ion-col col-2 (click)="goToLastMonth()"><ion-icon name="ios-arrow-back"></ion-icon></ion-col>\n						<ion-col col-8 *ngIf="!is_lunaCalendar">{{currentMonth | translate}} / {{currentYear}}</ion-col>\n						<ion-col col-8 *ngIf="is_lunaCalendar">{{monthLunaNames[calendarPerv_Next[1].lunarMonth - 1] | translate}} / {{calendarPerv_Next[1].lunarYear}}</ion-col>\n			      <ion-col col-2 (click)="goToNextMonth()"><ion-icon name="ios-arrow-forward"></ion-icon></ion-col>\n			    </ion-row>\n			  </div>\n			  <div class="calendar-body-slide">\n				<ion-slides (ionSlideDidChange)="slideChanged()">\n					<ion-slide *ngFor="let calendar_item of calendarPerv_Next">\n						<div class="calendar-body">\n							<ion-grid>\n								<ion-row class="calendar-weekday">\n									<ion-col *ngFor="let dayname of dayNames">{{dayname | translate}}</ion-col>\n								</ion-row>\n								<ion-row class="calendar-date">\n									<ion-col col-1 *ngFor="let lastDay of calendar_item.daysInLastMonth" class="last-month" (click)="goToLastMonth()"></ion-col>\n									<ion-col col-1 *ngFor="let day of calendar_item.daysInThisMonth ; let i = index; trackBy: customTrackBy" (click)="selectDate(day,calendar_item)">\n										<span class="currentDate t{{calendar_item.daysLunarInThisMonth[i][1]}} event-{{checkEvent(day,calendar_item)}}" \n											*ngIf="(\n													(is_lunaCalendar && day == calendar_item.lunarDate && LunaMonth == calendar_item.lunarMonth && LunaYear == calendar_item.lunarYear) || \n													(!is_lunaCalendar && dayday === day && month === calendar_item.currentMonth && year === calendar_item.currentYear)\n												); \n												else otherDate\n											">\n											<span class="n-day">{{day}}</span> \n											<span class="lunar-day">{{calendar_item.daysLunarInThisMonth[i][0]}}</span>\n										</span>										\n										<ng-template #otherDate class="otherDate">\n											<span class="otherDate t{{calendar_item.daysLunarInThisMonth[i][1]}} event-{{checkEvent(day,calendar_item)}}">\n											<span class="n-day">{{day}}</span> <span class="lunar-day">{{calendar_item.daysLunarInThisMonth[i][0]}}</span></span>\n											<!-- <br><div class="event-bullet" *ngIf="checkEvent(day)"></div> -->\n										</ng-template>\n									</ion-col>\n									<ion-col col-1 *ngFor="let nextDay of calendar_item.daysInNextMonth" class="next-month" (click)="goToNextMonth()"></ion-col>\n								</ion-row>\n							</ion-grid>\n						</div>\n					</ion-slide>								\n				</ion-slides>\n			  </div>\n		    </div>\n		</div>\n	</div>\n	<div class="calendar-submit">\n		<button (click)="saveEvent()">{{\'xac_nhan\' | translate}}</button>\n	</div>\n	\n</ion-content>\n<img class="font-bg" src="../assets/imgs/font-bg.png">\n<svg class=\'svgfilter\' version="1.1" xmlns="http://www.w3.org/2000/svg">\n  <filter id="svgfilter" class="svgfilter-item">\n    <feGaussianBlur stdDeviation="2" />\n		<!-- comment out feComponentTransfer to remove the darkness -->\n    <feComponentTransfer>\n        <feFuncR type="linear" slope="0.9"/>\n        <feFuncG type="linear" slope="0.9"/>\n        <feFuncB type="linear" slope="0.9"/>\n    </feComponentTransfer>\n  </filter>\n</svg>'/*ion-inline-end:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\selectpiker\selectpiker.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_calendar__["a" /* Calendar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]])
    ], SelectpikerPage);
    return SelectpikerPage;
}());

//# sourceMappingURL=selectpiker.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_setting_interface__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DATA_BASE_NAME = 'vietjet.db';
var DatabaseService = /** @class */ (function () {
    function DatabaseService(sqlite, platform) {
        var _this = this;
        this.sqlite = sqlite;
        this.platform = platform;
        this.ready = this.platform.ready()
            .then(function () { return _this.initializeDatabase(); })
            .then(function () { return _this.bootstrapTables(); });
        // .then(() => this.bootstrapData())
    }
    DatabaseService.prototype.bootstrapData = function () {
        if (this.database && this.database.sqlBatch) {
            return this.database.sqlBatch(__WEBPACK_IMPORTED_MODULE_0__models_setting_interface__["a" /* SQL_BATCH_INSERT_INTO_SETTINGS_TABLE */]).then(function () {
                console.log("Data bootstrapped: " + __WEBPACK_IMPORTED_MODULE_0__models_setting_interface__["a" /* SQL_BATCH_INSERT_INTO_SETTINGS_TABLE */]);
            }).catch(function (error) { return console.log(error); });
        }
        return null;
    };
    DatabaseService.prototype.bootstrapTables = function () {
        // return this.database.executeSql(SQL_CREATE_CUSTOMERS_TABLE, []).then(() => {
        //     console.log("Table boostrapped: " + SQL_CREATE_SETTINGS_TABLE);
        // });
        // console.log(SQL_CREATE_CUSTOMERS_TABLE);
        if (this.database && this.database.sqlBatch) {
            return this.database.sqlBatch(__WEBPACK_IMPORTED_MODULE_0__models_setting_interface__["b" /* SQL_CREATE_TABLES */]).then(function () {
                console.log("Table boostrapped: " + __WEBPACK_IMPORTED_MODULE_0__models_setting_interface__["b" /* SQL_CREATE_TABLES */]);
            }).catch(function (error) { return console.log(error); });
        }
        return null;
    };
    DatabaseService.prototype.initializeDatabase = function () {
        var _this = this;
        return this.sqlite.create({
            name: DATA_BASE_NAME,
            location: 'default'
        }).then(function (database) {
            _this.database = database;
            console.log("Database initialized");
        }).catch(function (error) { return console.log(error); });
    };
    DatabaseService.prototype.getDatabase = function () {
        var _this = this;
        return this.ready.then(function () {
            return _this.database;
        });
    };
    DatabaseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]])
    ], DatabaseService);
    return DatabaseService;
}());

//# sourceMappingURL=database.service.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SQL_BATCH_INSERT_INTO_SETTINGS_TABLE; });
/* unused harmony export SQL_SELECT_ALL_SETTINGS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SQL_CREATE_TABLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SQL_SAVE_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return SQL_UPDATE_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SQL_DELETE_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SQL_DELETE_EVENT_BY_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SQL_SELECT_ALL_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return SQL_SELECT_EVENT_BY_ID; });
/* unused harmony export SQL_SELECT_EVENT_BY_DAY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SQL_SELECT_EVENT_BY_DAY_REPEAT_MONTH_AND_YEAR; });
// export const SQL_CREATE_SETTINGS_TABLE: string = "CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY, key VARCHAR UNIQUE, value VARCHAR);";
var SQL_BATCH_INSERT_INTO_SETTINGS_TABLE = [
    "INSERT OR IGNORE INTO settings VALUES(NULL, 'key1', 'value1'); ",
    "INSERT OR IGNORE INTO settings VALUES(NULL, 'key2', 'value2'); ",
    "INSERT OR IGNORE INTO settings VALUES(NULL, 'keyX', 'valueX'); "
];
var SQL_SELECT_ALL_SETTINGS = "SELECT * FROM customer;";
var SQL_CREATE_TABLES = [
    "CREATE TABLE IF NOT EXISTS event ( _id INTEGER PRIMARY KEY AUTOINCREMENT, startDate TEXT, endDate TEXT, week TEXT, day TEXT, month TEXT, year TEXT, leap TEXT, jd TEXT, week_end TEXT, day_end TEXT, month_end TEXT, year_end TEXT, leap_end TEXT, jd_end TEXT, title TEXT, location TEXT, message TEXT, repeat TEXT, reminder TEXT, allDay TEXT, id TEXT)"
];
var SQL_SAVE_EVENT = "INSERT INTO event (startDate, endDate, week, day, month, year,leap,jd, week_end, day_end, month_end, year_end,leap_end,jd_end, title, location, message, repeat, reminder, allDay,id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?, ?, ?, ?,?, ?,?)";
var SQL_UPDATE_EVENT = "UPDATE event SET startDate = ?, endDate = ?, week = ?, day = ?, month = ?, year = ?, title = ?, location = ?, message = ?, repeat = ?, reminder = ?, allDay = ?, id = ? WHERE _id = ?";
var SQL_DELETE_EVENT = "DELETE FROM event WHERE _id = ?";
var SQL_DELETE_EVENT_BY_ID = "DELETE FROM event WHERE id = ?";
var SQL_SELECT_ALL_EVENT = "SELECT * FROM event";
var SQL_SELECT_EVENT_BY_ID = "SELECT * FROM event WHERE id = ?";
var SQL_SELECT_EVENT_BY_DAY = "SELECT * FROM event WHERE " +
    "_id IN (SELECT _id FROM event WHERE startDate <= ? AND endDate >= ? AND repeat = 0)" +
    "OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND repeat = 1)" +
    "OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND week = ? AND repeat = 2)" +
    "OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND day = ? AND month = ? AND repeat = 3)" +
    "OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND day = ? AND month = ?  AND year = ? AND repeat = 4)";
var SQL_SELECT_EVENT_BY_DAY_REPEAT_MONTH_AND_YEAR = "SELECT * FROM event WHERE " +
    "_id IN (SELECT _id FROM event WHERE startDate <= ? AND repeat = 3)" +
    "OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND repeat = 4)";
// export const  SQL_SELECT_EVENT_BY_DAY_REPEAT_MONTH_AND_YEAR: string = "SELECT * FROM event WHERE "+
// "_id IN (SELECT _id FROM event WHERE startDate <= ? AND day <= ? AND day_end >= ? AND month = month_end  AND repeat = 3)"+
// "OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND day <= ? AND month = ? AND month < month_end  AND repeat = 3)"+
// "OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND month < ? AND month_end > ? AND month < month_end  AND repeat = 3)"+
// "OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND day_end >= ? AND month_end = ? AND month < month_end  AND repeat = 3)"+
// "OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND day = ? AND month = ?  AND repeat = 4)";
//# sourceMappingURL=setting.interface.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AmlichService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_amlich_model__ = __webpack_require__(412);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AmlichService = /** @class */ (function () {
    function AmlichService() {
    }
    AmlichService.prototype.getAmlich = function (dd, mm, yy) {
        var amlich = new __WEBPACK_IMPORTED_MODULE_1__models_amlich_model__["a" /* AmlichModel */]();
        var lunar_day = getLunarDate(dd, mm, yy);
        amlich.day = lunar_day.day;
        amlich.month = lunar_day.month;
        amlich.year = lunar_day.year;
        amlich.leap = lunar_day.leap;
        amlich.jd = lunar_day.jd;
        var jd = amlich.jd;
        amlich.canchi = getCanChi(lunar_day);
        amlich.tietkhi = TIETKHI[getSunLongitude(jd + 1, 7.0)];
        amlich.GioHoangDao = getGioHoangDao(jd);
        amlich.GioDauNgay = getCanHour0(jd) + " " + CHI[0];
        amlich.DayOfWeek = TUAN[(lunar_day.jd + 1) % 7];
        amlich.LunaDayName = amlich.canchi[0];
        amlich.LunaMonthName = amlich.canchi[1];
        amlich.LunaYearName = amlich.canchi[2];
        // console.log(amlich);
        return amlich;
    };
    AmlichService.prototype.getCanChiGio = function (Std, dd, mm, yy, jd) {
        var chiGio = (Std >= 23) ? 0 : Math.floor((Std + 1) / 2);
        // var jd = jdn(dd,mm,yy);
        var canGio = ((jd - 1) * 2 + Math.floor((Std + 1) / 2)) % 10;
        var gio = CAN[canGio] + ' ' + CHI[chiGio];
        // console.log(gio);
        return gio;
    };
    AmlichService.prototype.getEventMainOfLunaDay = function (dd, mm) {
        var amLichEvents = [
            { day: 1, month: 1, info: 'Tết Nguyên Đán' },
            { day: 15, month: 1, info: 'Tết Nguyên Tiêu (Lễ Thượng Nguyên)' },
            { day: 3, month: 3, info: 'Tết Hàn Thực' },
            { day: 10, month: 3, info: 'Giỗ Tổ Hùng Vương' },
            { day: 15, month: 4, info: 'Lễ Phật Đản' },
            { day: 5, month: 5, info: 'Tết Đoan Ngọ' },
            { day: 15, month: 7, info: 'Lễ Vu Lan' },
            { day: 15, month: 8, info: 'Tết Trung Thu' },
            { day: 9, month: 9, info: 'Tết Trùng Cửu' },
            { day: 10, month: 10, info: 'Tết Thường Tân' },
            { day: 15, month: 11, info: 'Tết Hạ Nguyên' },
            { day: 23, month: 12, info: 'Tiễn Táo Quân về trời' },
        ];
        return this.findEvents(dd, mm, amLichEvents);
    };
    AmlichService.prototype.getEventMainOfDay = function (dd, mm) {
        var duongLichEvents = [
            { day: 1, month: 1, info: 'Tết Dương Lịch' },
            { day: 14, month: 2, info: 'Lễ tình nhân (Valentine)' },
            { day: 27, month: 2, info: 'Ngày thầy thuốc Việt Nam' },
            { day: 8, month: 3, info: 'Ngày Quốc tế Phụ nữ' },
            { day: 26, month: 3, info: 'Ngày thành lập Đoàn TNCS Hồ Chí Minh' },
            { day: 1, month: 4, info: 'Ngày Cá tháng Tư' },
            { day: 30, month: 4, info: 'Ngày giải phóng miền Nam' },
            { day: 1, month: 5, info: 'Ngày Quốc tế Lao động' },
            { day: 7, month: 5, info: 'Ngày chiến thắng Điện Biên Phủ' },
            { day: 13, month: 5, info: 'Ngày của mẹ' },
            { day: 19, month: 5, info: 'Ngày sinh chủ tịch Hồ Chí Minh' },
            { day: 1, month: 6, info: 'Ngày Quốc tế thiếu nhi' },
            { day: 17, month: 6, info: 'Ngày của cha' },
            { day: 21, month: 6, info: 'Ngày báo chí Việt Nam' },
            { day: 28, month: 6, info: 'Ngày gia đình Việt Nam' },
            { day: 11, month: 7, info: 'Ngày dân số thế giới' },
            { day: 27, month: 7, info: 'Ngày Thương binh liệt sĩ' },
            { day: 28, month: 7, info: 'Ngày thành lập công đoàn Việt Nam' },
            { day: 19, month: 8, info: 'Ngày tổng khởi nghĩa' },
            { day: 2, month: 9, info: 'Ngày Quốc Khánh' },
            { day: 10, month: 9, info: 'Ngày thành lập Mặt trận Tổ quốc Việt Nam' },
            { day: 1, month: 10, info: 'Ngày quốc tế người cao tuổi' },
            { day: 10, month: 10, info: 'Ngày giải phóng thủ đô' },
            { day: 13, month: 10, info: 'Ngày doanh nhân Việt Nam' },
            { day: 20, month: 10, info: 'Ngày Phụ nữ Việt Nam' },
            { day: 31, month: 10, info: 'Ngày Hallowen' },
            { day: 9, month: 11, info: 'Ngày pháp luật Việt Nam' },
            { day: 20, month: 11, info: 'Ngày Nhà giáo Việt Nam' },
            { day: 23, month: 11, info: 'Ngày thành lập Hội chữ thập đỏ Việt Nam' },
            { day: 1, month: 12, info: 'Ngày thế giới phòng chống AIDS' },
            { day: 19, month: 12, info: 'Ngày toàn quốc kháng chiến' },
            { day: 22, month: 12, info: 'Ngày lễ Giáng sinh' },
            { day: 24, month: 12, info: 'Ngày thành lập quân đội nhân dân Việt Nam' },
        ];
        return this.findEvents(dd, mm, duongLichEvents);
    };
    AmlichService.prototype.findEvents = function (dd, mm, events) {
        var ret = new Array();
        for (var i = 0; i < events.length; i++) {
            var evt = events[i];
            if (evt.day == dd && evt.month == mm) {
                ret.push(evt);
            }
        }
        return ret;
    };
    AmlichService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], AmlichService);
    return AmlichService;
}());

//# sourceMappingURL=amlich.service.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendartypeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendartypeService = /** @class */ (function () {
    function CalendartypeService() {
        this.calendartype = new Array();
        this.calendartype.push({ name: "Dương Lịch", code: "duonglich", name_en: "Solar Calendar" }, { name: "Âm Lịch", code: "amlich", name_en: "Lunar Calendar" });
    }
    CalendartypeService.prototype.getCalendartype = function () {
        return this.calendartype;
    };
    CalendartypeService.prototype.getDefaultCalendarTyle = function () {
        return "duonglich";
    };
    CalendartypeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], CalendartypeService);
    return CalendartypeService;
}());

//# sourceMappingURL=calendartype.service.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(373);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DayModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_event_add_event__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_calendar__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_amlich_service__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_language_service__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_setting_setting_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var DayModalPage = /** @class */ (function () {
    function DayModalPage(plt, navCtrl, calendar, navParams, viewCtrl, AmlichService, translate, languageService, settingService, domSanitizer, http) {
        var _this = this;
        this.plt = plt;
        this.navCtrl = navCtrl;
        this.calendar = calendar;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.AmlichService = AmlichService;
        this.translate = translate;
        this.languageService = languageService;
        this.settingService = settingService;
        this.domSanitizer = domSanitizer;
        this.http = http;
        this.events = new Array();
        this.getData = function (data) {
            return new Promise(function (resolve, reject) {
                _this.getDayEvent();
                resolve();
            });
        };
        this.ReinitView();
    }
    DayModalPage.prototype.ReinitView = function () {
        var _this = this;
        this.ApiRouter = configApp.ApiRouter;
        this.monthNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        this.monthNames_day = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.flowerNames = ["Flower1", "Flower2", "Flower3", "Flower4", "Flower5", "Flower6", "Flower7", "Flower8", "Flower9", "Flower10", "Flower11", "Flower12"];
        this.data = this.navParams.get('data');
        this.date = new Date();
        this.hour = this.date.getHours();
        this.minus = this.date.getMinutes();
        var h = this.hour;
        var m = this.minus;
        if (this.hour < 10) {
            h = "0" + this.hour;
        }
        if (this.minus < 10) {
            m = "0" + this.minus;
        }
        this.time = h + ':' + m;
        // this.time = this.hour + ':' + this.minus;
        //this.canChiList = ['Tý','Sửu','Dần','Mão','Thìn','Tị','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
        if (this.data != null) {
            this.day = this.data.day;
            this.month = this.data.month;
            this.year = this.data.year;
        }
        else {
            this.day = this.date.getDate();
            this.month = this.date.getMonth() + 1;
            this.year = this.date.getFullYear();
            // console.log(this.day+','+this.month+','+this.year);
        }
        this.translate.get('allday').subscribe(function (value) {
            _this.alldaytext = value;
        });
        this.translate.get('lang').subscribe(function (value) {
            _this.langguage = value;
        });
        this.currentDate = "THÁNG " + this.month + " NĂM " + this.year;
        this.initView();
        this.startTimer();
    };
    DayModalPage.prototype.getHttpData = function () {
        var _this = this;
        // var headers = new Headers();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded' );
        // const requestOptions = new RequestOptions({ headers: headers });
        var my_device = this.plt.is('ios') ? "ios" : "android";
        // let postData = {
        //   year:this.year,
        //   month:this.month,
        //   device:my_device
        // }        
        this.http.get(this.ApiRouter + 'api/day_info?year=' + this.year + '&month=' + this.month + '&device=' + my_device).map(function (res) { return res.json(); }).subscribe(function (data) {
            if (data && data.result && data.result.meta) {
                if (_this.langguage == "vn") {
                    _this.titleData = data.result.meta.title;
                }
                else {
                    _this.titleData = data.result.meta.title_en;
                }
                // console.log(this.titleData);
            }
        });
    };
    DayModalPage.prototype.initView = function () {
        var amlich = this.AmlichService.getAmlich(this.day, this.month, this.year);
        switch (amlich.DayOfWeek) {
            case 'Thứ hai':
                this.dayOfWeek = 1;
                break;
            case 'Thứ ba':
                this.dayOfWeek = 2;
                break;
            case 'Thứ tư':
                this.dayOfWeek = 3;
                break;
            case 'Thứ năm':
                this.dayOfWeek = 4;
                break;
            case 'Thứ sáu':
                this.dayOfWeek = 5;
                break;
            case 'Thứ bảy':
                this.dayOfWeek = 6;
                break;
            case 'Chủ nhật':
                this.dayOfWeek = 0;
                break;
            default:
        }
        // this.dayOfWeek = amlich.DayOfWeek;
        this.dayOfWeek = this.dayOfWeek + "day";
        this.ngayAm = amlich.day;
        this.thangAm = amlich.month;
        this.jd = amlich.jd;
        this.ngayCanChi = amlich.LunaDayName;
        this.thangCanChi = amlich.LunaMonthName;
        //this.flowerName = flowerNames[this.month-1];
        this.flowerName = this.flowerNames[this.month - 1];
        this.gioHoangDao = "Giờ hoàng đạo: " + amlich.GioHoangDao;
        this.getImageDay();
        this.hour = this.date.getHours();
        this.gioCanChi = this.AmlichService.getCanChiGio(this.hour, this.day, this.month, this.year, this.jd);
        if (this.langguage == "en") {
            this.ngayCanChi = this.xoa_dau(this.ngayCanChi);
            this.thangCanChi = this.xoa_dau(this.thangCanChi);
            this.gioCanChi = this.xoa_dau(this.gioCanChi);
        }
        this.convertToCanChiHour();
        this.getDayEvent();
        this.setBGDatabase();
        this.getHttpData();
    };
    DayModalPage.prototype.ionViewDidLoad = function () {
        // this.getDayEvent();
        // console.log('ionViewDidLoad AddEventPage');
    };
    DayModalPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    DayModalPage.prototype.save = function () {
        // this.viewCtrl.dismiss(this.event);
    };
    DayModalPage.prototype.addEvent = function () {
        // this.navCtrl.push(AddEventPage);
        // var event = {};
        // event.startDate =  this.year + "-" + this.month + "-" + this.day;
        // event.endDate =  this.year + "-" + this.month + "-" + this.day;
        // item.endDate =  this.year + "-" + this.month + "-" + this.day;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__add_event_add_event__["a" /* AddEventPage */], {
            data: {
                status: "add",
                date: this.year + "-" + this.month + "-" + this.day
            },
            callback: this.getData
        });
    };
    DayModalPage.prototype.swipe = function (event) {
        // Next
        if (event.direction === 2) {
            this.date = new Date(this.year, this.month - 1, this.day + 1);
        }
        // Prev
        if (event.direction === 4) {
            this.date = new Date(this.year, this.month - 1, this.day - 1);
        }
        this.day = this.date.getDate();
        this.month = this.date.getMonth() + 1;
        this.year = this.date.getFullYear();
        this.currentDate = "THÁNG " + this.month + " NĂM " + this.year;
        this.initView();
    };
    DayModalPage.prototype.next = function () {
        this.date = new Date(this.year, this.month - 1, this.day - 1);
        this.day = this.date.getDate();
        this.month = this.date.getMonth() + 1;
        this.year = this.date.getFullYear();
        this.currentDate = "THÁNG " + this.month + " NĂM " + this.year;
        this.initView();
    };
    DayModalPage.prototype.prev = function () {
        this.date = new Date(this.year, this.month - 1, this.day + 1);
        this.day = this.date.getDate();
        this.month = this.date.getMonth() + 1;
        this.year = this.date.getFullYear();
        this.currentDate = "THÁNG " + this.month + " NĂM " + this.year;
        this.initView();
    };
    DayModalPage.prototype.setBGDatabase = function () {
        var year = this.year;
        var month = this.month - 1;
        var type = 2;
        if (!this.background_img || month == 12 || month == 1) {
            if (!this.background_img) {
                this.background_img = new Array();
            }
            for (var i = 0; i < 12; i++) {
                if (database && database[year] && database[year][type] && database[year][type][i]) {
                    this.background_img[i] = this.domSanitizer.bypassSecurityTrustResourceUrl(database[year][type][i]);
                }
                else if (database && database["default"] && database["default"][type] && database["default"][type][i]) {
                    this.background_img[i] = this.domSanitizer.bypassSecurityTrustResourceUrl(database["default"][type][i]);
                }
                else {
                    this.background_img[i] = this.getBg(this.monthNames[i]);
                }
            }
        }
    };
    DayModalPage.prototype.startTimer = function () {
        var _this = this;
        setInterval(function () {
            _this.date = new Date();
            _this.hour = _this.date.getHours();
            _this.minus = _this.date.getMinutes();
            // this.time = this.hour + ':' + this.minus;
            var h = _this.hour;
            var m = _this.minus;
            if (_this.hour < 10) {
                h = "0" + _this.hour;
            }
            if (_this.minus < 10) {
                m = "0" + _this.minus;
            }
            _this.time = h + ':' + m;
            //alert('aaa');
            _this.convertToCanChiHour();
        }, 15000);
    };
    DayModalPage.prototype.getImageDay = function () {
        // this.backgroundImage = '../assets/imgs/daybackground/thang-'+this.month+'.jpg';    
        this.dayImage = '../assets/imgs/daybackground/day/' + this.day + '.png';
        this.flowerImage = '../assets/imgs/daybackground/day/Flower-' + this.month + '.png';
    };
    DayModalPage.prototype.getBg = function (index) {
        // console.log(index);
        var imageBg = "../assets/imgs/daybackground/thang-" + index + ".jpg";
        // let imageBg = "url(../assets/imgs/background/bg"+index+".jpg)";
        // console.log(imageBg);
        return imageBg;
    };
    DayModalPage.prototype.getActive = function (index) {
        if (index == this.month) {
            return 'animation';
        }
        return '';
    };
    DayModalPage.prototype.convertToCanChiHour = function () {
        this.gioCanChi = this.AmlichService.getCanChiGio(this.hour, this.day, this.month, this.year, this.jd);
        if (this.langguage == "en") {
            this.gioCanChi = this.xoa_dau(this.gioCanChi);
        }
    };
    DayModalPage.prototype.getDayEvent = function () {
        // this.eventList = new Array();
        // this.eventList.push(
        //   { time: '09:10', title: 'unde',startDate:'2019-1-19 9:10' },
        //   { time: '01:55', title: 'sdfdfs sdfsd erqwer ertert 245 2 3245 etwe rt wfdg qr q er' },
        //   { time: '13:50', title: 'sdfdfswerwrwerwerwerewrwerwerwerwerwrewrwerwewerwerwerwer' },
        //   { time: '12:50', title: 'sdfdfswerwrwerwerwerewrwerwerwerwerwrewrwerwewerwerwerwer' },
        //   { time: '10:50', title: 'sdfdfswerwrwerwerwerewrwerwerwerwerwrewrwerwewerwerwerwer' },
        //   { time: '13:50', title: 'sdfdfswerwrwerwerwerewrwerwerwerwerwrewrwerwewerwerwerwer' },
        // );
        var _this = this;
        if (this.plt.is('android')) {
            var nowStartDate = new Date(this.month + "/" + this.day + "/" + this.year + " 00:00:00");
            var nowEndtDate = new Date(this.month + "/" + this.day + "/" + this.year + " 23:59:59");
            this.calendar.findEvent("", "", "", nowStartDate, nowEndtDate).then(function (msg) {
                _this.eventList = new Array();
                console.log(msg);
                // msg = this.getUnique(msg,'title')
                msg.forEach(function (item) {
                    if (!_this.checkDuplicate(item, _this.eventList)) {
                        _this.gEvent(item);
                    }
                });
                _this.getLocalEvent(nowStartDate, nowEndtDate);
                // this.eventList.sort(this.compare);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            var nowStartDate = new Date(this.month + "/" + this.day + "/" + this.year + " 00:00:00");
            var nowEndtDate = new Date(this.month + "/" + this.day + "/" + this.year + " 23:59:59");
            this.calendar.findEvent("", "", "", nowStartDate, nowEndtDate).then(function (msg) {
                _this.eventList = new Array();
                msg.forEach(function (item) {
                    _this.gEvent(item);
                });
                _this.getLocalEvent(nowStartDate, nowEndtDate);
                // this.eventList.sort(this.compare);
            }, function (err) {
                console.log(err);
            });
        }
    };
    DayModalPage.prototype.checkDuplicate = function (item, array) {
        var rt = false;
        if (item.access_level == "3") {
            array.forEach(function (item_array) {
                if (item_array.access_level == "3" && item_array.title == item.title) {
                    rt = true;
                    return true;
                }
            });
        }
        else {
            array.forEach(function (item_array) {
                if (item_array.id == item.id) {
                    rt = true;
                    return true;
                }
            });
        }
        return rt;
    };
    DayModalPage.prototype.getUnique = function (arr, comp) {
        var unique = arr
            .map(function (e) { return e[comp]; })
            .map(function (e, i, final) { return final.indexOf(e) === i && i; })
            .filter(function (e) { return arr[e]; }).map(function (e) { return arr[e]; });
        return unique;
    };
    DayModalPage.prototype.gEvent = function (item) {
        if (!item.startDate && item.dtstart) {
            item.startDate = item.dtstart;
        }
        if (!item.endDate && item.dtend) {
            item.endDate = item.dtend;
        }
        if (!item.location && item.eventLocation) {
            item.location = item.eventLocation;
        }
        // item.startDate = new Date(item.startDate);
        // item.endDate = new Date(item.endDate); 
        if (this.plt.is('android')) {
            var startDate = new Date(item.startDate);
            var endDate = new Date(item.endDate);
            // if (item.allDay) {
            //   endDate = new Date(endDate.getTime() - 86400000);
            // }
            var h = startDate.getHours().toString();
            if (startDate.getHours() < 10) {
                h = ("0" + startDate.getHours());
            }
            ;
            var m = startDate.getMinutes().toString();
            if (startDate.getMinutes() < 10) {
                m = ("0" + m);
            }
            ;
            item.time = h + ":" + m;
            if (h == "00" && m == "00") {
                // item.time = this.alldaytext;
            }
            var he = endDate.getHours().toString();
            if (endDate.getHours() < 10) {
                he = ("0" + endDate.getHours());
            }
            ;
            var me = endDate.getMinutes().toString();
            if (endDate.getMinutes() < 10) {
                me = ("0" + me);
            }
            ;
            item.time_end = he + ":" + me;
            // item.startDate = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate()+" "+startDate.getHours()+":"+startDate.getMinutes()+":"+startDate.getSeconds();
            // console.log(item);
            if (item.allDay || item.allday) {
                if (!(this.day == endDate.getDate() && startDate.getDate() != endDate.getDate())) {
                    endDate = new Date(endDate.getTime() - 86400000);
                    item.endDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate() + " " + endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds();
                    this.eventList.push(item);
                }
            }
            else {
                this.eventList.push(item);
            }
        }
        else {
            var startDate = new Date(item.startDate.replace(/\s/, 'T'));
            var endDate = new Date(item.endDate.replace(/\s/, 'T'));
            var h = startDate.getUTCHours().toString();
            if (startDate.getUTCHours() < 10) {
                h = ("0" + startDate.getUTCHours());
            }
            ;
            var m = startDate.getMinutes().toString();
            if (startDate.getMinutes() < 10) {
                m = ("0" + m);
            }
            ;
            item.time = h + ":" + m;
            if (h == "00" && m == "00") {
                // item.time = this.alldaytext;
            }
            var he = endDate.getUTCHours().toString();
            if (endDate.getUTCHours() < 10) {
                he = ("0" + endDate.getUTCHours());
            }
            ;
            var me = endDate.getMinutes().toString();
            if (endDate.getMinutes() < 10) {
                me = ("0" + me);
            }
            ;
            item.time_end = he + ":" + me;
            this.eventList.push(item);
        }
        // this.eventList.push(item);
        // this.eventList.push(item);
        // alert(JSON.stringify(item));
    };
    DayModalPage.prototype.getLocalEvent = function (nowStartDate, nowEndtDate) {
        var _this = this;
        // this.settingService.getAllEvent().then((data_local: any) => {
        //   console.log(data_local);
        // })
        // .catch(error => {
        //     console.log(error);
        // });     
        this.settingService.getEventByDayRepeatMonthAndYear(nowStartDate, nowEndtDate).then(function (data_local) {
            console.log(data_local);
            if (data_local && data_local.length > 0) {
                data_local.forEach(function (item) {
                    _this.gEvent(item);
                });
            }
            _this.eventList.sort(_this.compare);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    DayModalPage.prototype.editEvent = function (event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__add_event_add_event__["a" /* AddEventPage */], {
            data: {
                status: "edit",
                data: event
            },
            callback: this.getData
        });
    };
    DayModalPage.prototype.compare = function (a, b) {
        if (a.time < b.time)
            return -1;
        if (a.time > b.time)
            return 1;
        return 0;
    };
    DayModalPage.prototype.customTrackBy = function (index, obj) {
        return index;
    };
    DayModalPage.prototype.xoa_dau = function (str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    };
    DayModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-day-modal',template:/*ion-inline-start:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\day-modal\day-modal.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle class="menu-button">\n      <ion-icon name="menu"></ion-icon>\n    </button>   	\n    <ion-title> <img class="logo-header" alt="logo" height="40"   src="../assets/imgs/logo-header.png" > </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addEvent()" class="add-button">\n        <ion-icon name="md-add"></ion-icon>\n      </button>\n    </ion-buttons>   \n  </ion-navbar>\n</ion-header>\n \n<ion-content class=\'content\'>	\n	<div class="main-content" (swipe)="swipe($event)">\n		<div class="bg-image">\n			<img *ngFor="let month of monthNames; let i = index; trackBy: customTrackBy" class=\'background {{getActive(month)}}\' [src]="background_img[i]">\n		</div>\n		\n		<ion-icon class=\'left-arrow\' name="ios-arrow-back" (click)="next()"></ion-icon>\n		<div class=\'day\'> \n			<div >\n				<img class=\'dayImage\' src={{dayImage}}>\n				<!-- <img class=\'flowerImage month-{{month}}\' src={{flowerImage}}> -->\n			</div>\n			<br><div class="yellowLine"></div>\n			<br><div class="dayOfWeek {{translate.store.currentLang}}">{{dayOfWeek | translate}}</div>		\n		</div>\n		<!-- <div class=\'currentDate\'>{{currentDate}}</div> -->\n		<div class=\'currentDate\'>{{\'thang_day\' | translate}} {{monthNames_day[month-1] | translate}} {{\'nam_day\' | translate}} {{year}}</div>\n		<div class="date">\n				<div class=\'hour\'>\n				<span class=\'time-title\'>{{\'hours\' | translate}}</span> \n				<br><span class=\'timeNumber\'>{{time}} </span>\n				<br> {{gioCanChi}}\n			</div>\n			<div class=\'lunarDay\'>\n				<span class=\'time-title\'>{{\'DAY\' | translate}}</span>  \n				<br> <span class=\'timeNumber\'>{{ngayAm}}</span>\n				<br> {{ngayCanChi}} \n			</div>\n			<div class=\'month\'>\n				<span class=\'time-title\'>{{\'MONTH\' | translate}}</span><br>	\n				<span class=\'timeNumber\'>{{thangAm}}</span>\n				<br> {{thangCanChi}}\n			</div>\n		</div>\n		<ion-icon class=\'right-arrow\' name="ios-arrow-forward" (click)="prev()"></ion-icon>\n\n		<div class=\'eventbackground\'>\n			<img src=\'../assets/imgs/daybackground/footer.png\'>\n\n		</div>\n		<div class=\'event\'>\n			\n			<div class="event-sub">{{gioHoangDao}}</div>\n			<span class="event-tittle">{{titleData?titleData:(flowerName | translate)}}</span>\n			<div class="event-content">\n				<ion-list class=\'event-list\'>		\n			    	<ion-item text-wrap class=\'event-modul\' ion-item *ngFor="let p of eventList" (click)="editEvent(p)">\n			        	<span class =\'event-time\'>{{ (p.time == \'00:00\' || p.allDay || p.allday)?alldaytext:p.time}}</span><span class=\'event-text\'>{{ p.title}}</span>\n			    	</ion-item>	      \n				</ion-list>\n			</div>	\n		</div>\n	</div>\n	\n</ion-content>'/*ion-inline-end:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\day-modal\day-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_calendar__["a" /* Calendar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4__providers_amlich_service__["a" /* AmlichService */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_6__providers_language_service__["a" /* LanguageService */],
            __WEBPACK_IMPORTED_MODULE_9__providers_setting_setting_service__["a" /* SettingService */],
            __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_8__angular_http__["b" /* Http */]])
    ], DayModalPage);
    return DayModalPage;
}());

//# sourceMappingURL=day-modal.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_calendar__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_add_event_add_event__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_convert_calendar_convert_calendar__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_update_resource_update_resource__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_day_modal_day_modal__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_week_view_week_view__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_gallery_modal_gallery_modal__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_gallery_view_gallery_view__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_gallery_category_gallery_category__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_selectpiker_selectpiker__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_file_transfer__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_file__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_base64__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_sqlite__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_common_http__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ngx_translate_core__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ngx_translate_http_loader__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_language_service__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_amlich_service__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_calendartype_service__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_wallpaper_service__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_local_notifications__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_photo_library__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_storage__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_setting_setting_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_database_database_service__ = __webpack_require__(186);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















// import { Network } from '@ionic-native/network';













function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_23__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_add_event_add_event__["a" /* AddEventPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_convert_calendar_convert_calendar__["a" /* ConvertCalendarPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_update_resource_update_resource__["a" /* UpdateResourcePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_day_modal_day_modal__["a" /* DayModalPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_week_view_week_view__["a" /* WeekViewPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_gallery_view_gallery_view__["a" /* GalleryViewPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_gallery_category_gallery_category__["a" /* GalleryCategoryPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_gallery_modal_gallery_modal__["a" /* GalleryModalPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_selectpiker_selectpiker__["a" /* SelectpikerPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_21__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_31__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/convert-calendar/convert-calendar.module#ConvertCalendarPageModule', name: 'ConvertCalendarPage', segment: 'convert-calendar', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/add-event/add-event.module#AddEventPageModule', name: 'AddEventPage', segment: 'add-event', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/day-modal/day-modal.module#DayModalPageModule', name: 'DayModalPage', segment: 'day-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/edit-event/edit-event.module#EditEventPageModule', name: 'EditEventPage', segment: 'edit-event', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/gallery-category/gallery-category.module#GalleryCategoryPageModule', name: 'GalleryCategoryPage', segment: 'gallery-category', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/gallery-modal/gallery-modal.module#GalleryModalPageModule', name: 'GalleryModalPage', segment: 'gallery-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/gallery-view/gallery-view.module#GalleryViewPageModule', name: 'GalleryViewPage', segment: 'gallery-view', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/guide-modal/guide-modal.module#GuideModalPageModule', name: 'GuideModalPage', segment: 'guide-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/week-view/week-view.module#WeekViewPageModule', name: 'WeekViewPage', segment: 'week-view', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/update-resource/update-resource.module#UpdateResourcePageModule', name: 'UpdateResourcePage', segment: 'update-resource', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_30__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_22__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_22__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (createTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_21__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_add_event_add_event__["a" /* AddEventPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_convert_calendar_convert_calendar__["a" /* ConvertCalendarPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_update_resource_update_resource__["a" /* UpdateResourcePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_day_modal_day_modal__["a" /* DayModalPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_week_view_week_view__["a" /* WeekViewPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_gallery_view_gallery_view__["a" /* GalleryViewPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_gallery_category_gallery_category__["a" /* GalleryCategoryPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_gallery_modal_gallery_modal__["a" /* GalleryModalPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_selectpiker_selectpiker__["a" /* SelectpikerPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_24__providers_language_service__["a" /* LanguageService */],
                __WEBPACK_IMPORTED_MODULE_26__providers_calendartype_service__["a" /* CalendartypeService */],
                __WEBPACK_IMPORTED_MODULE_25__providers_amlich_service__["a" /* AmlichService */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_local_notifications__["a" /* LocalNotifications */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_calendar__["a" /* Calendar */],
                __WEBPACK_IMPORTED_MODULE_27__providers_wallpaper_service__["a" /* WallpaperService */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_photo_library__["a" /* PhotoLibrary */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_base64__["a" /* Base64 */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_32__providers_setting_setting_service__["a" /* SettingService */],
                __WEBPACK_IMPORTED_MODULE_33__providers_database_database_service__["a" /* DatabaseService */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AmlichModel; });
var AmlichModel = /** @class */ (function () {
    function AmlichModel() {
    }
    return AmlichModel;
}());

//# sourceMappingURL=amlich.model.js.map

/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 189,
	"./af.js": 189,
	"./ar": 190,
	"./ar-dz": 191,
	"./ar-dz.js": 191,
	"./ar-kw": 192,
	"./ar-kw.js": 192,
	"./ar-ly": 193,
	"./ar-ly.js": 193,
	"./ar-ma": 194,
	"./ar-ma.js": 194,
	"./ar-sa": 195,
	"./ar-sa.js": 195,
	"./ar-tn": 196,
	"./ar-tn.js": 196,
	"./ar.js": 190,
	"./az": 197,
	"./az.js": 197,
	"./be": 198,
	"./be.js": 198,
	"./bg": 199,
	"./bg.js": 199,
	"./bm": 200,
	"./bm.js": 200,
	"./bn": 201,
	"./bn.js": 201,
	"./bo": 202,
	"./bo.js": 202,
	"./br": 203,
	"./br.js": 203,
	"./bs": 204,
	"./bs.js": 204,
	"./ca": 205,
	"./ca.js": 205,
	"./cs": 206,
	"./cs.js": 206,
	"./cv": 207,
	"./cv.js": 207,
	"./cy": 208,
	"./cy.js": 208,
	"./da": 209,
	"./da.js": 209,
	"./de": 210,
	"./de-at": 211,
	"./de-at.js": 211,
	"./de-ch": 212,
	"./de-ch.js": 212,
	"./de.js": 210,
	"./dv": 213,
	"./dv.js": 213,
	"./el": 214,
	"./el.js": 214,
	"./en-au": 215,
	"./en-au.js": 215,
	"./en-ca": 216,
	"./en-ca.js": 216,
	"./en-gb": 217,
	"./en-gb.js": 217,
	"./en-ie": 218,
	"./en-ie.js": 218,
	"./en-il": 219,
	"./en-il.js": 219,
	"./en-nz": 220,
	"./en-nz.js": 220,
	"./eo": 221,
	"./eo.js": 221,
	"./es": 222,
	"./es-do": 223,
	"./es-do.js": 223,
	"./es-us": 224,
	"./es-us.js": 224,
	"./es.js": 222,
	"./et": 225,
	"./et.js": 225,
	"./eu": 226,
	"./eu.js": 226,
	"./fa": 227,
	"./fa.js": 227,
	"./fi": 228,
	"./fi.js": 228,
	"./fo": 229,
	"./fo.js": 229,
	"./fr": 230,
	"./fr-ca": 231,
	"./fr-ca.js": 231,
	"./fr-ch": 232,
	"./fr-ch.js": 232,
	"./fr.js": 230,
	"./fy": 233,
	"./fy.js": 233,
	"./gd": 234,
	"./gd.js": 234,
	"./gl": 235,
	"./gl.js": 235,
	"./gom-latn": 236,
	"./gom-latn.js": 236,
	"./gu": 237,
	"./gu.js": 237,
	"./he": 238,
	"./he.js": 238,
	"./hi": 239,
	"./hi.js": 239,
	"./hr": 240,
	"./hr.js": 240,
	"./hu": 241,
	"./hu.js": 241,
	"./hy-am": 242,
	"./hy-am.js": 242,
	"./id": 243,
	"./id.js": 243,
	"./is": 244,
	"./is.js": 244,
	"./it": 245,
	"./it.js": 245,
	"./ja": 246,
	"./ja.js": 246,
	"./jv": 247,
	"./jv.js": 247,
	"./ka": 248,
	"./ka.js": 248,
	"./kk": 249,
	"./kk.js": 249,
	"./km": 250,
	"./km.js": 250,
	"./kn": 251,
	"./kn.js": 251,
	"./ko": 252,
	"./ko.js": 252,
	"./ku": 253,
	"./ku.js": 253,
	"./ky": 254,
	"./ky.js": 254,
	"./lb": 255,
	"./lb.js": 255,
	"./lo": 256,
	"./lo.js": 256,
	"./lt": 257,
	"./lt.js": 257,
	"./lv": 258,
	"./lv.js": 258,
	"./me": 259,
	"./me.js": 259,
	"./mi": 260,
	"./mi.js": 260,
	"./mk": 261,
	"./mk.js": 261,
	"./ml": 262,
	"./ml.js": 262,
	"./mn": 263,
	"./mn.js": 263,
	"./mr": 264,
	"./mr.js": 264,
	"./ms": 265,
	"./ms-my": 266,
	"./ms-my.js": 266,
	"./ms.js": 265,
	"./mt": 267,
	"./mt.js": 267,
	"./my": 268,
	"./my.js": 268,
	"./nb": 269,
	"./nb.js": 269,
	"./ne": 270,
	"./ne.js": 270,
	"./nl": 271,
	"./nl-be": 272,
	"./nl-be.js": 272,
	"./nl.js": 271,
	"./nn": 273,
	"./nn.js": 273,
	"./pa-in": 274,
	"./pa-in.js": 274,
	"./pl": 275,
	"./pl.js": 275,
	"./pt": 276,
	"./pt-br": 277,
	"./pt-br.js": 277,
	"./pt.js": 276,
	"./ro": 278,
	"./ro.js": 278,
	"./ru": 279,
	"./ru.js": 279,
	"./sd": 280,
	"./sd.js": 280,
	"./se": 281,
	"./se.js": 281,
	"./si": 282,
	"./si.js": 282,
	"./sk": 283,
	"./sk.js": 283,
	"./sl": 284,
	"./sl.js": 284,
	"./sq": 285,
	"./sq.js": 285,
	"./sr": 286,
	"./sr-cyrl": 287,
	"./sr-cyrl.js": 287,
	"./sr.js": 286,
	"./ss": 288,
	"./ss.js": 288,
	"./sv": 289,
	"./sv.js": 289,
	"./sw": 290,
	"./sw.js": 290,
	"./ta": 291,
	"./ta.js": 291,
	"./te": 292,
	"./te.js": 292,
	"./tet": 293,
	"./tet.js": 293,
	"./tg": 294,
	"./tg.js": 294,
	"./th": 295,
	"./th.js": 295,
	"./tl-ph": 296,
	"./tl-ph.js": 296,
	"./tlh": 297,
	"./tlh.js": 297,
	"./tr": 298,
	"./tr.js": 298,
	"./tzl": 299,
	"./tzl.js": 299,
	"./tzm": 300,
	"./tzm-latn": 301,
	"./tzm-latn.js": 301,
	"./tzm.js": 300,
	"./ug-cn": 302,
	"./ug-cn.js": 302,
	"./uk": 303,
	"./uk.js": 303,
	"./ur": 304,
	"./ur.js": 304,
	"./uz": 305,
	"./uz-latn": 306,
	"./uz-latn.js": 306,
	"./uz.js": 305,
	"./vi": 307,
	"./vi.js": 307,
	"./x-pseudo": 308,
	"./x-pseudo.js": 308,
	"./yo": 309,
	"./yo.js": 309,
	"./zh-cn": 310,
	"./zh-cn.js": 310,
	"./zh-hk": 311,
	"./zh-hk.js": 311,
	"./zh-tw": 312,
	"./zh-tw.js": 312
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 414;

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_week_view_week_view__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_convert_calendar_convert_calendar__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_gallery_category_gallery_category__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_day_modal_day_modal__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_update_resource_update_resource__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_language_service__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_calendartype_service__ = __webpack_require__(354);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var MyApp = /** @class */ (function () {
    function MyApp(storage, platform, translate, calendartypeService, languageService, menu, statusBar, splashScreen) {
        var _this = this;
        this.storage = storage;
        this.platform = platform;
        this.translate = translate;
        this.calendartypeService = calendartypeService;
        this.languageService = languageService;
        this.menu = menu;
        this.statusBar = statusBar;
        this.textDir = "ltr";
        this.languageSelected = 'vn';
        this.root_text = '';
        translate.setDefaultLang('vn');
        translate.use('vn');
        this.languages = this.languageService.getLanguages();
        this.setLanguage();
        this.calendartypes = this.calendartypeService.getCalendartype();
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_update_resource_update_resource__["a" /* UpdateResourcePage */];
            // this.rootPage = HomePage;
            _this.getCalendartype();
            //statusBar.styleDefault();
            // statusBar.backgroundColorByHexString('#ffffff');
            // splashScreen.hide();
            if (_this.platform.is('ios')) {
                _this.statusBar.overlaysWebView(true);
                //this.statusBar.backgroundColorByName("white");
                //this.statusBar.backgroundColorByHexString('#33000000');
                _this.statusBar.backgroundColorByHexString('#ffffff');
            }
            else {
                statusBar.styleDefault();
                statusBar.backgroundColorByHexString('#ffffff');
            }
            _this.translate.onLangChange.subscribe(function (event) {
                _this.textDir = event.lang == 'ar' ? 'rtl' : 'ltr';
            });
        });
        // set our app's pages
        this.pages = [
            { title: 'Calendar_Month', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], icon: 'icon/month-icon.png' },
            { title: 'Week_Schedule', component: __WEBPACK_IMPORTED_MODULE_5__pages_week_view_week_view__["a" /* WeekViewPage */], icon: 'icon/week-icon.png' },
            { title: 'Day_Schedule', component: __WEBPACK_IMPORTED_MODULE_8__pages_day_modal_day_modal__["a" /* DayModalPage */], icon: 'icon/date-icon.png' },
            { title: 'Gallery', component: __WEBPACK_IMPORTED_MODULE_7__pages_gallery_category_gallery_category__["a" /* GalleryCategoryPage */], icon: 'icon/image-icon.png' },
            { title: 'lunar_calendar_converter', component: __WEBPACK_IMPORTED_MODULE_6__pages_convert_calendar_convert_calendar__["a" /* ConvertCalendarPage */], icon: 'icon/Am-Lich.png' },
        ];
    }
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        var _this = this;
        this.menu.close();
        // navigate to the new page if it is not the current page
        if (this.root_text == '') {
            this.root_text = 'Calendar_Month';
        }
        if (this.root_text != page.title) {
            this.root_text = page.title;
            setTimeout(function () {
                _this.nav.setRoot(page.component, {}, { animate: false, direction: 'back' });
            }, 50);
            // this.nav.setRoot(page.component);
        }
        // if (page.title == 'Day_Schedule') {
        //   // this.navCtrl.push(page.component);       
        // }
        // else{
        //   this.nav.setRoot(page.component);
        // }
    };
    MyApp.prototype.goBack = function () {
        this.menu.close();
    };
    MyApp.prototype.setLanguage = function () {
        var defaultLanguage = this.translate.getDefaultLang();
        if (this.languageSelected) {
            this.translate.setDefaultLang(this.languageSelected);
            this.translate.use(this.languageSelected);
        }
        else {
            this.languageSelected = defaultLanguage;
            this.translate.use(defaultLanguage);
        }
    };
    MyApp.prototype.setCalendartype = function () {
        if (!this.calendartypeSelected) {
            this.calendartypeSelected = this.calendartypeService.getDefaultCalendarTyle();
        }
        configApp.is_lunaCalendar = (this.calendartypeSelected == "amlich") ? true : false;
        this.storage.set('calendartype', this.calendartypeSelected);
        this.nav.setRoot(this.nav.getActive().component);
        this.menu.close();
    };
    MyApp.prototype.getCalendartype = function () {
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
    };
    MyApp.prototype.refresh = function () {
        this.nav.setRoot(this.nav.getActive().component);
        this.menu.close();
        // console.log('ddd');
        // console.log('Begin async operation', refresher);
        // setTimeout(() => {
        //   console.log('Async operation has ended');
        //   refresher.complete();
        // }, 2000);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\xampp\htdocs\ecalendar-vietjet\src\app\app.html"*/'<ion-menu [content]="content">\n  <img class="air-logo {{platform.is(\'ios\')?\'ios\':\'android\'}}" src="../assets/imgs/air.png">\n  <ion-header>\n    <ion-toolbar>\n      \n      <ion-title><img class="logo-header" alt="logo" height="40" src="../assets/imgs/logo-header.png" ></ion-title>\n      <ion-buttons end>\n        <button ion-button icon-only (click)="goBack()" class="close-button">\n          <ion-icon class="close-btn" name="md-close"></ion-icon>\n        </button>\n      </ion-buttons>      \n    </ion-toolbar>\n  </ion-header>\n  <ion-content class="list-menu">\n    <ion-list>\n      <button ion-item *ngFor="let p of pages" tappable (click)="openPage(p)">\n        <img class="icon-item" src="../assets/imgs/{{p.icon}}"> <span>{{ p.title | translate }}</span>\n      </button>\n      <button ion-item (click)="refresh()">\n        <img class="icon-item" src="../assets/imgs/icon/syn-icon.png"> <span>{{ \'sync\' | translate }}</span>\n      </button>\n      <button ion-item >\n        <ion-label><img class="icon-item" src="../assets/imgs/icon/lan-icon.png"> <span>{{ \'SELECT_LANGUAGE\' | translate }}</span></ion-label>\n        <ion-select [(ngModel)]="languageSelected" (ionChange)=\'setLanguage()\' [cancelText]="\'CANCEL\' | translate">\n          <ion-option *ngFor="let item of languages" [value]="item.code">{{item.name}}</ion-option>\n        </ion-select>\n      </button>\n      <button ion-item style="display: none" >\n        <ion-label><img class="icon-item" src="../assets/imgs/icon/date-icon.png"> <span>{{ \'SELECT_CALENDAR_TYLE\' | translate }}</span></ion-label>\n        <ion-select *ngIf="calendartypeSelected" \n        [(ngModel)]="calendartypeSelected" \n        name="calendartypeSelected"\n        (ionChange)=\'setCalendartype()\' \n        [cancelText]="\'CANCEL\' | translate"\n            [selectedText]="(calendartypeSelected == \'\') ?\n            (\'duonglich\' | translate) : (calendartypeSelected | translate)"     \n        >\n          <ion-option value="amlich">{{\'amlich\'|translate}}</ion-option>\n          <ion-option value="duonglich">{{\'duonglich\'|translate}}</ion-option>\n        </ion-select>\n      </button>      \n    </ion-list>\n  </ion-content>\n</ion-menu>\n<!-- <ion-nav [root]="rootPage"></ion-nav> -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false" ></ion-nav>'/*ion-inline-end:"C:\xampp\htdocs\ecalendar-vietjet\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_12__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_13__providers_calendartype_service__["a" /* CalendartypeService */], __WEBPACK_IMPORTED_MODULE_11__providers_language_service__["a" /* LanguageService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WallpaperService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WallpaperService = /** @class */ (function () {
    function WallpaperService(platform) {
    }
    WallpaperService.prototype.setWallpaper = function (url) {
        console.log('In');
        /*
                this.platform.ready().then(() => {
                window.plugins.wallpaper.setImage(url);
                console.log('Success setting wallpaper.');
                console.log("Set Background END");
                });
        */
        // window["wallpaper"].setImage('url', function(error) {
        //   if (error) {
        //     console.error(error);
        //   }
        //   else {
        //     console.log('Success setting wallpaper.');
        //   }
        // });
        // this.platform.ready().then(() => {
        // 	console.log('----');
        // 	console.log(window);
        // 	console.log('----');
        //      window.plugins.wallpaper.setImage(url);
        // var cordovaCall =   (<any>window).setImage(url);
        //   console.log("values of call",cordovaCall)
        //cordovaCall.call('Michele Verratti');
        // });
        // 	window.plugins.wallpaper.setImage('url', function(error) {
        //   if (error) {
        //     console.error(error);
        //   }
        //   else {
        //     console.log('Success setting wallpaper.');
        //   }
        // });
    };
    WallpaperService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]])
    ], WallpaperService);
    return WallpaperService;
}());

//# sourceMappingURL=wallpaper.service.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_calendar__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectpiker_selectpiker__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_setting_setting_service__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AddEventPage = /** @class */ (function () {
    function AddEventPage(plt, alertCtrl, navCtrl, navParams, translate, calendar, modalCtrl, localNotifications, settingService) {
        var _this = this;
        this.plt = plt;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.calendar = calendar;
        this.modalCtrl = modalCtrl;
        this.localNotifications = localNotifications;
        this.settingService = settingService;
        this.is_lunaCalendar = false;
        this.event = {
            id: "",
            title: "",
            location: "",
            message: "",
            startDate: "",
            endDate: "",
            calendarType: 1,
            repeat: 0,
            alert: 0,
            allDay: false,
            firstReminderMinutesText: '',
            _id: "",
        };
        this.getDataStart = function (data) {
            return new Promise(function (resolve, reject) {
                if (_this.event.endDate && data.date > _this.event.endDate.date) {
                    // this.lunaStartDate = ''; 
                    // this.event.startDate = {};
                }
                else {
                    _this.event.startDate = data;
                    var timeA = _this.event.startDate.date.split("-");
                    var timeB = _this.event.startDate.time.split(":");
                    // var SD = new Date(timeA[0],timeA[1]-1,timeA[2],timeB[0],timeB[1],0);
                    var SD = new Date(timeA[1] + "/" + timeA[2] + "/" + timeA[0] + " " + timeB[0] + ":" + timeB[1] + ":00");
                    //let mydate = new Date(this.event.startDate.date);
                    var mydate = SD;
                    //alert(JSON.stringify(mydate));
                    _this.lunaStartDate = getLunarDate(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear());
                }
                resolve();
            });
        };
        this.getDataEnd = function (data) {
            return new Promise(function (resolve, reject) {
                if (_this.event.startDate && data.date < _this.event.startDate.date) {
                    // this.lunaStartDate = ''; 
                    // this.event.startDate = {};            
                }
                else {
                    _this.event.endDate = data;
                    var timeA = _this.event.endDate.date.split("-");
                    var timeB = _this.event.endDate.time.split(":");
                    // var ED = new Date(timeA[0],timeA[1]-1,timeA[2],timeB[0],timeB[1],0);
                    var ED = new Date(timeA[1] + "/" + timeA[2] + "/" + timeA[0] + " " + timeB[0] + ":" + timeB[1] + ":00");
                    var mydate = ED;
                    //alert(JSON.stringify(mydate));
                    //let mydate = new Date(this.event.endDate.date);
                    _this.lunaEndDate = getLunarDate(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear());
                }
                //this.locationInput.setFocus();
                resolve();
            });
        };
        this.is_lunaCalendar = configApp.is_lunaCalendar;
        this.translate.get('Event_saved_successfully').subscribe(function (value) {
            _this.Event_saved_successfully = value;
        });
        this.translate.get('Event_update_successfully').subscribe(function (value) {
            _this.Event_update_successfully = value;
        });
        this.translate.get('Event_date_error').subscribe(function (value) {
            _this.Event_date_error = value;
        });
        this.translate.get('delete_event').subscribe(function (value) {
            _this.delete_event = value;
        });
        this.translate.get('delete_all_event').subscribe(function (value) {
            _this.delete_all_event = value;
        });
        this.translate.get('delete_this_event').subscribe(function (value) {
            _this.delete_this_event = value;
        });
        this.translate.get('delete_this_and_future_event').subscribe(function (value) {
            _this.delete_this_and_future_event = value;
        });
        this.translate.get('day_la_su_kien_lap_lai').subscribe(function (value) {
            _this.day_la_su_kien_lap_lai = value;
        });
        this.translate.get('cancel').subscribe(function (value) {
            _this.cancel = value;
        });
        this.translate.get('Failed').subscribe(function (value) {
            _this.failed_error = value;
        });
        this.translate.get('ok').subscribe(function (value) {
            _this.ok = value;
        });
        this.translate.get('error_alert').subscribe(function (value) {
            _this.error_alert = value;
        });
        this.translate.get('title_error').subscribe(function (value) {
            _this.title_error = value;
        });
        this.translate.get('start_date_error').subscribe(function (value) {
            _this.start_date_error = value;
        });
        this.translate.get('end_date_error').subscribe(function (value) {
            _this.end_date_error = value;
        });
        if (!this.is_lunaCalendar) {
            this.event.calendarType = 2;
        }
        this.date = new Date();
        this.callback = this.navParams.get('callback');
        this.data = this.navParams.get('data') || [];
        console.log(this.data);
        // alert(JSON.stringify(this.data));
        if (this.data && this.data.data) {
            this.initData();
        }
        else {
            var hour = this.date.getHours();
            var minus = this.date.getMinutes();
            var h = hour;
            var m = minus;
            if (hour < 10) {
                h = "0" + hour;
            }
            if (minus < 10) {
                m = "0" + minus;
            }
            var time = h + ':' + m;
            this.event.startDate = {};
            this.event.startDate.time = h + ':' + m;
            if (this.data && this.data.date) {
                this.event.startDate.date = this.data.date;
            }
            else {
                this.event.startDate.date = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
            }
            this.event.endDate = {};
            this.event.endDate.date = this.event.startDate.date;
            var hourend = parseInt(hour) + 1;
            if (hour >= 24) {
                hour = 23;
            }
            if (hourend < 10) {
                this.event.endDate.time = "0" + hourend + ":" + m;
            }
            else {
                this.event.endDate.time = hourend + ":" + m;
            }
            var timeA = this.event.startDate.date.split("-");
            var timeB = this.event.startDate.time.split(":");
            var SD = new Date(timeA[1] + "/" + timeA[2] + "/" + timeA[0] + " " + timeB[0] + ":" + timeB[1] + ":00");
            this.lunaStartDate = getLunarDate(SD.getDate(), SD.getMonth() + 1, SD.getFullYear());
            var timeC = this.event.endDate.date.split("-");
            var timeD = this.event.endDate.time.split(":");
            var ED = new Date(timeC[1] + "/" + timeC[2] + "/" + timeC[0] + " " + timeD[0] + ":" + timeD[1] + ":00");
            this.lunaEndDate = getLunarDate(ED.getDate(), ED.getMonth() + 1, ED.getFullYear());
        }
    }
    AddEventPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad AddEventPage');
    };
    AddEventPage.prototype.initData = function () {
        var _this = this;
        // alert(JSON.stringify(this.data)); // check data từ calendar
        this.event.id = this.data.data.id;
        this.event._id = this.data.data._id;
        this.event.title = this.data.data.title;
        this.event.location = this.data.data.location;
        this.event.message = this.data.data.message;
        if (this.event.id) {
            this.settingService.getEventById(this.event.id).then(function (data_local) {
                if (data_local && data_local.length > 0) {
                    _this.event.calendarType = 1;
                    _this.event._id = data_local[0]._id;
                    _this.data.data._id = data_local[0]._id;
                }
            })
                .catch(function (error) {
                console.log(error);
            });
        }
        else if (this.event._id) {
            this.event.calendarType = 1;
        }
        if (!this.data.data.startDate && this.data.data.dtstart) {
            this.data.data.startDate = this.data.data.dtstart;
        }
        if (!this.data.data.endDate && this.data.data.dtend) {
            this.data.data.endDate = this.data.data.dtend;
        }
        if (this.data.data.startDate) {
            this.event.startDate = {};
            this.event.startDate.date = this.data.data.startDate.split(" ")[0];
            if (this.data.data.time == " ") {
                this.event.startDate.time = "00:00";
            }
            else {
                this.event.startDate.time = this.data.data.time;
            }
            var timeA = this.event.startDate.date.split("-");
            var timeB = this.event.startDate.time.split(":");
            var SD = new Date(timeA[1] + "/" + timeA[2] + "/" + timeA[0] + " " + timeB[0] + ":" + timeB[1] + ":00");
            var mydate = SD;
            this.lunaStartDate = getLunarDate(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear());
        }
        if (this.data.data.endDate) {
            this.event.endDate = {};
            this.event.endDate.date = this.data.data.endDate.split(" ")[0];
            // if (this.data.data.time == "allday" || this.data.data.time == "Cả ngày") {
            //   this.event.endDate.time = "00:00";
            // }
            // else{
            this.event.endDate.time = this.data.data.time_end;
            // }
            var timeC = this.event.endDate.date.split("-");
            var timeD = this.event.endDate.time.split(":");
            var ED = new Date(timeC[1] + "/" + timeC[2] + "/" + timeC[0] + " " + timeD[0] + ":" + timeD[1] + ":00");
            var mydate = ED;
            this.lunaEndDate = getLunarDate(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear());
        }
        // alert(JSON.stringify(this.data));
        // this.event.repeat = this.data.data.repeat;
        this.event.repeat = 0;
        this.event.alert = this.data.data.alert;
        this.event.allDay = this.data.data.allDay;
        if (this.event.endDate.time == "00:00" || this.event.startDate.time == "00:00") {
            this.event.allDay = true;
        }
        if (this.data.data.allday) {
            this.event.allDay = this.data.data.allday;
        }
        if (this.data.data.recurrence) {
            if (this.data.data.recurrence.freq == "DAILY") {
                this.event.repeat = 1;
            }
            if (this.data.data.recurrence.freq == "WEEKLY") {
                this.event.repeat = 2;
            }
            if (this.data.data.recurrence.freq == "MONTHLY") {
                this.event.repeat = 3;
            }
            if (this.data.data.recurrence.freq == "YEARLY") {
                this.event.repeat = 4;
            }
        }
        if (this.data.data.rrule) {
            if (this.data.data.rrule.freq == "daily") {
                this.event.repeat = 1;
            }
            if (this.data.data.rrule.freq == "weekly") {
                this.event.repeat = 2;
            }
            if (this.data.data.rrule.freq == "monthly") {
                this.event.repeat = 3;
            }
            if (this.data.data.rrule.freq == "yearly") {
                this.event.repeat = 4;
            }
        }
        //alert(this.data.data.message);
        if (this.data.data.message) {
            this.event.message = this.data.data.message;
        }
        if (this.data.data.reminder) {
            if (this.data.data.reminder == 0) {
                this.event.alert = 0;
            }
            if (this.data.data.reminder == 15) {
                this.event.alert = 1;
            }
            if (this.data.data.reminder == 30) {
                this.event.alert = 2;
            }
            if (this.data.data.reminder == 60) {
                this.event.alert = 3;
            }
            if (this.data.data.reminder == 120) {
                this.event.alert = 4;
            }
            if (this.data.data.reminder == 1440) {
                this.event.alert = 5;
            }
            if (this.data.data.reminder == 2880) {
                this.event.alert = 6;
            }
        }
        else {
            this.event.alert = 0;
        }
    };
    AddEventPage.prototype.changeAllday = function (ev) {
        if (this.event.startDate && this.event.endDate) {
            if (this.plt.is('ios')) {
                if (this.event.allDay) {
                    this.event.startDate.time = "00:00";
                    this.event.endDate.time = "23:59";
                }
                else {
                    var h = this.date.getHours().toString();
                    if (this.date.getHours() < 10) {
                        h = ("0" + this.date.getHours());
                    }
                    ;
                    var m = this.date.getMinutes().toString();
                    var m_end = this.date.getMinutes() + 1;
                    var h_end = h;
                    if (this.date.getMinutes() < 10) {
                        m = ("0" + m);
                    }
                    ;
                    if (this.date.getMinutes() < 10) {
                        m = ("0" + m);
                    }
                    ;
                    if (m_end > 59) {
                        m_end = "00";
                        if (this.date.getMinutes() > 22) {
                            h_end = "01";
                        }
                    }
                    this.event.startDate.time = h + ":" + m;
                    this.event.endDate.time = h_end + ":" + m_end;
                }
            }
            if (this.plt.is('android') || (this.data.data._id && !this.data.data.id)) {
                if (this.event.allDay) {
                    this.event.startDate.time = "00:00";
                    this.event.endDate.time = "00:00";
                }
            }
        }
        else {
            this.event.startDate = {};
            this.event.endDate = {};
            this.event.startDate.time = "00:00";
            this.event.endDate.time = "00:00";
            // this.event.endDate.time = "23:59";      
        }
    };
    AddEventPage.prototype.openCalendarModal = function (type) {
        var _this = this;
        var data = {
            date: this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate(),
            time: this.date.getHours() + ":" + this.date.getMinutes(),
            lunaCalendar: this.event.calendarType == 1,
            startDate: this.event.startDate,
            endDate: this.event.endDate,
            allDay: this.event.allDay,
            type: type,
            callback: this.getDataStart,
        };
        if (type == 'start') {
            data.callback = this.getDataStart;
            if (this.event && this.event.startDate) {
                var splitDate = this.event.startDate.date.split("-");
                if (parseInt(splitDate[1]) < 10) {
                    splitDate[1] = parseInt(splitDate[1]);
                }
                if (parseInt(splitDate[2]) < 10) {
                    splitDate[2] = parseInt(splitDate[2]);
                }
                this.event.startDate.date = splitDate[0] + "-" + splitDate[1] + "-" + splitDate[2];
                data.date = this.event.startDate.date;
                // alert(data.date);
            }
            if (this.event && this.event.startDate) {
                data.time = this.event.startDate.time;
            }
        }
        else {
            data.callback = this.getDataEnd;
            if (this.event && this.event.endDate) {
                var splitDate = this.event.endDate.date.split("-");
                if (parseInt(splitDate[1]) < 10) {
                    splitDate[1] = parseInt(splitDate[1]);
                }
                if (parseInt(splitDate[2]) < 10) {
                    splitDate[2] = parseInt(splitDate[2]);
                }
                this.event.endDate.date = splitDate[0] + "-" + splitDate[1] + "-" + splitDate[2];
                data.date = this.event.endDate.date;
            }
            if (this.event && this.event.endDate) {
                data.time = this.event.endDate.time;
            }
        }
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__selectpiker_selectpiker__["a" /* SelectpikerPage */], data);
        profileModal.onDidDismiss(function (data) {
            // console.log(data);
            if (data) {
                _this.scrollNext("2");
                if (type == 'start') {
                    // if (this.event.endDate && this.validateTime(data,this.event.endDate)) {
                    //   const alertSuccess = this.alertCtrl.create({
                    //     title: `Lỗi!`,
                    //     subTitle: `Ngày bắt đầu không vượt quá ngày kết thúc!`,
                    //     buttons: ['Ok']
                    //   });
                    //   this.event.startDate = "";
                    //   alertSuccess.present();  
                    // }
                    // else{
                    _this.event.startDate = data;
                    var timeA = _this.event.startDate.date.split("-");
                    var timeB = _this.event.startDate.time.split(":");
                    var SD = new Date(timeA[1] + "/" + timeA[2] + "/" + timeA[0] + " " + timeB[0] + ":" + timeB[1] + ":00");
                    var mydate = SD;
                    //alert(JSON.stringify(mydate));
                    _this.lunaStartDate = getLunarDate(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear());
                    // if (!this.event.endDate) {
                    _this.event.endDate = {};
                    _this.event.endDate.date = data.date;
                    // this.event.endDate.time = data.time;
                    timeB[0] = parseInt(timeB[0]) + 1;
                    timeB[1] = parseInt(timeB[1]);
                    if (timeB[0] >= 24) {
                        timeB[0] = 23;
                    }
                    var h_end = timeB[0] + '';
                    if (timeB[0] < 10) {
                        h_end = '0' + h_end;
                    }
                    var m_end = timeB[1] + '';
                    if (timeB[1] < 10) {
                        m_end = '0' + m_end;
                    }
                    _this.event.endDate.time = h_end + ":" + m_end;
                    var timeA = _this.event.endDate.date.split("-");
                    var timeB = _this.event.endDate.time.split(":");
                    var ED = new Date(timeA[1] + "/" + timeA[2] + "/" + timeA[0] + " " + timeB[0] + ":" + timeB[1] + ":00");
                    mydate = ED;
                    _this.lunaEndDate = getLunarDate(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear());
                    // } 
                    // }
                }
                else {
                    if (_this.event.startDate && _this.validateTime(_this.event.startDate, data)) {
                        var alertSuccess = _this.alertCtrl.create({
                            title: _this.error_alert,
                            subTitle: _this.Event_date_error,
                            buttons: [_this.ok]
                        });
                        _this.event.endDate = "";
                        alertSuccess.present();
                    }
                    else {
                        _this.event.endDate = data;
                        var timeA = _this.event.endDate.date.split("-");
                        var timeB = _this.event.endDate.time.split(":");
                        // var ED = new Date(timeA[0],timeA[1]-1,timeA[2],timeB[0],timeB[1],0);
                        var ED = new Date(timeA[1] + "/" + timeA[2] + "/" + timeA[0] + " " + timeB[0] + ":" + timeB[1] + ":00");
                        var mydate = ED;
                        //alert(JSON.stringify(mydate));
                        //let mydate = new Date(this.event.endDate.date);
                        _this.lunaEndDate = getLunarDate(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear());
                    }
                }
            }
        });
        profileModal.present();
    };
    AddEventPage.prototype.validateTime = function (startDate, endDate) {
        if (startDate && endDate) {
            var timeA = startDate.date.split("-");
            var timeB = startDate.time.split(":");
            var SD = new Date(timeA[1] + "/" + timeA[2] + "/" + timeA[0] + " " + timeB[0] + ":" + timeB[1] + ":00");
            var timeC = endDate.date.split("-");
            var timeD = endDate.time.split(":");
            var ED = new Date(timeC[1] + "/" + timeC[2] + "/" + timeC[0] + " " + timeD[0] + ":" + timeD[1] + ":00");
            if (SD.getTime() > ED.getTime())
                return true;
            else
                return false;
        }
        return false;
    };
    AddEventPage.prototype.scrollNext = function (object) {
        var startDateInput = document.getElementById("startDateInput");
        var endDateInput = document.getElementById("endDateInput");
        var radioButton = document.getElementById("radioButton");
        var locationField = document.getElementById("location");
        var noteField = document.getElementById("note");
        if (object == "1") {
            var yOffset = endDateInput.offsetTop;
            var rect = radioButton.getBoundingClientRect();
            //this.content.scrollTo(0,yOffset.top,800);
            // alert(rect.top);
            // if(rect.top>100)
            {
                this.content.scrollTo(0, rect.top / 2, 800);
            }
        }
        else if (object == "2") {
            var yOffset = endDateInput.offsetTop;
            var rect = startDateInput.getBoundingClientRect();
            //this.content.scrollTo(0,yOffset.top,800);
            // if(rect.top>100)
            {
                this.content.scrollTo(0, rect.top / 2, 800);
            }
        }
        else if (object == "3") {
            var yOffset = endDateInput.offsetTop;
            //var rect = object.getBoundingClientRect();
            var rect = endDateInput.getBoundingClientRect();
            //this.content.scrollTo(0,yOffset,4000);
            // if(rect.top>100)
            {
                this.content.scrollTo(0, rect.top / 2, 800);
            }
        }
        else if (object == "4") {
            var yOffset = endDateInput.offsetTop;
            //var rect = object.getBoundingClientRect();
            var rect = locationField.getBoundingClientRect();
            //this.content.scrollTo(0,yOffset,4000);
            // alert(rect.bottom);
            // if(rect.bottom>500)
            {
                this.content.scrollTo(0, rect.bottom / 2 + 200, 800);
            }
        }
        else if (object == "5") {
            var yOffset = endDateInput.offsetTop;
            //var rect = object.getBoundingClientRect();
            var rect = noteField.getBoundingClientRect();
            //this.content.scrollTo(0,yOffset,4000);
            // alert(rect.bottom);
            // if(rect.bottom>500)
            {
                this.content.scrollTo(0, rect.bottom / 2 + 200, 800);
            }
        }
    };
    AddEventPage.prototype.scrollBottom = function () {
        this.content.scrollToBottom();
        // let dimensions = this.content.getContentDimensions();
        // this.content.scrollTo(0, dimensions.scrollBottom, 0);
        // this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    };
    AddEventPage.prototype.save = function () {
        var _this = this;
        if (this.validateEventData()) {
            var options = this.calendar.getCalendarOptions();
            if (this.event.repeat > 0) {
                if (this.event.repeat == 1) {
                    options.recurrence = "daily";
                    options.recurrenceInterval = 1;
                }
                if (this.event.repeat == 2) {
                    options.recurrence = "weekly";
                    options.recurrenceInterval = 1;
                }
                if (this.event.repeat == 3) {
                    options.recurrence = "monthly";
                    options.recurrenceInterval = 1;
                }
                if (this.event.repeat == 4) {
                    options.recurrence = "yearly";
                    options.recurrenceInterval = 1;
                }
            }
            if (this.event.allDay) {
                options.allday = true;
                if (this.plt.is('ios')) {
                    var startDateSplit = this.event.startDate.date.split("-");
                    var endDateSplit = this.event.endDate.date.split("-");
                    if (this.event.startDate.date == this.event.endDate.date) {
                        var date = new Date(startDateSplit[0], (parseInt(startDateSplit[1]) - 1), (parseInt(startDateSplit[2]) + 1));
                        // alert(date);
                        this.event.endDate.date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                        this.event.endDate.time = this.event.startDate.time;
                        // alert(this.event.startDate.date);
                    }
                    else {
                        this.event.endDate.time = this.event.startDate.time;
                    }
                    // this.event.endDate.date = startDateSplit[0]+"-"+startDateSplit[1]+"-"+(parseInt(startDateSplit[2])+1).toString();
                    // this.event.startDate.time = "00:00";
                    // this.event.endDate.time = "00:00";
                    // this.event.endDate.time = this.event.startDate.time;
                }
            }
            if (this.event.alert >= 0) {
                if (this.event.alert == 0) {
                    options.firstReminderMinutes = 0;
                }
                if (this.event.alert == 1) {
                    options.firstReminderMinutes = 15;
                }
                if (this.event.alert == 2) {
                    options.firstReminderMinutes = 30;
                }
                if (this.event.alert == 3) {
                    options.firstReminderMinutes = 60;
                }
                if (this.event.alert == 4) {
                    options.firstReminderMinutes = 120;
                }
                if (this.event.alert == 5) {
                    options.firstReminderMinutes = 1440;
                }
                if (this.event.alert == 6) {
                    options.firstReminderMinutes = 2880;
                }
            }
            if (this.plt.is('android')) {
                var SD = new Date(this.event.startDate.date + " " + this.event.startDate.time + ":00");
                var ED = new Date(this.event.endDate.date + " " + this.event.endDate.time + ":00");
            }
            else {
                var dateStartString = this.event.startDate.date + "T" + this.event.startDate.time + ":00";
                var timeA = this.event.startDate.date.split("-");
                var timeB = this.event.startDate.time.split(":");
                //var SD = new Date(dateStartString);
                var SD = new Date(timeA[1] + "/" + timeA[2] + "/" + timeA[0] + " " + timeB[0] + ":" + timeB[1] + ":00");
                // var SD = new Date(timeA[0],timeA[1]-1,timeA[2],timeB[0],timeB[1],0);
                // var SD = new Date(year, month, day, hours, minutes, seconds, milliseconds)
                var dateEndString = this.event.endDate.date + "T" + this.event.endDate.time + ":00";
                // dateEndString()
                //var ED = new Date(dateEndString);        
                var timeC = this.event.endDate.date.split("-");
                var timeD = this.event.endDate.time.split(":");
                // if(timeB[0] == timeD[0] && timeB[1] == timeD[1])
                // {
                //   let min = parseInt(timeD[1]);
                //   //alert(min);
                //   min = min + 1;
                //   timeD[1] = min.toString();
                // }
                var ED = new Date(timeC[1] + "/" + timeC[2] + "/" + timeC[0] + " " + timeD[0] + ":" + timeD[1] + ":00");
                // if (this.event.allDay == true) {          
                //   ED = new Date(`${timeC[1]}/${timeC[2]}/${timeC[0]} ${timeB[0]}:${timeB[1]}:00`);
                // }
                // var ED = new Date(timeC[0],timeC[1]-1,timeC[2],timeD[0],timeD[1],0);  
            }
            // if(SD < ED)
            if (!this.validateTime(this.event.startDate, this.event.endDate)) {
                if (this.event.calendarType == 1 && this.event.repeat > 2) {
                    this.settingService.saveEvent(this.event, SD, ED, '').then(function (data_local) {
                        _this.addNotifications(data_local.insertId, _this.event, SD, ED);
                        if ((_this.data && _this.data.status == "edit") || _this.data.status == "add") {
                            _this.callback(_this.data).then(function () { _this.navCtrl.pop(); });
                        }
                        else {
                            _this.navCtrl.pop();
                        }
                    })
                        .catch(function (error) {
                        console.log(error);
                    });
                }
                else {
                    this.calendar.createEventWithOptions(this.event.title, this.event.location, this.event.message, SD, ED, options).then(function (result) {
                        var title = _this.Event_saved_successfully;
                        if (_this.data.status == "edit") {
                            title = _this.Event_update_successfully;
                        }
                        var alert = _this.alertCtrl.create({
                            title: title,
                            buttons: [_this.ok]
                        });
                        alert.present();
                        if (_this.event.calendarType == 1)
                            _this.settingService.saveEvent(_this.event, SD, ED, result);
                        if ((_this.data && _this.data.status == "edit") || _this.data.status == "add") {
                            _this.callback(_this.data).then(function () { _this.navCtrl.pop(); });
                        }
                        else {
                            _this.navCtrl.pop();
                        }
                    }, function (err) {
                        var alert = _this.alertCtrl.create({
                            title: _this.failed_error,
                            subTitle: err,
                            buttons: [_this.ok]
                        });
                        alert.present();
                    });
                }
            }
            else {
                var alertSuccess = this.alertCtrl.create({
                    title: this.error_alert,
                    subTitle: this.Event_date_error,
                    buttons: [this.ok]
                });
                alertSuccess.present();
            }
        }
        // this.calendar.createEvent(this.event.title, this.event.location, this.event.message, new Date(this.event.startDate), new Date(this.event.endDate)).then(
        //   (msg) => {
        //     this.addNotifications(this.event.startDate);
        //     let alert = this.alertCtrl.create({
        //       title: 'Success!',
        //       subTitle: 'Event saved successfully',
        //       buttons: ['OK']
        //     });
        //     alert.present();
        //     this.navCtrl.pop();
        //   },
        //   (err) => {
        //     let alert = this.alertCtrl.create({
        //       title: 'Failed!',
        //       subTitle: err,
        //       buttons: ['OK']
        //     });
        //     alert.present();
        //   }
        // );
    };
    AddEventPage.prototype.moveFocus = function (nextElement) {
        nextElement.setFocus();
    };
    AddEventPage.prototype.editEvent = function () {
        var _this = this;
        if (this.data && this.data.data && this.data.data.id) {
            var evt = this.data.data;
            if (this.data.data._id) {
                this.settingService.deleteEventById(this.data.data.id);
            }
            if (this.plt.is('android')) {
                if (evt) {
                    // this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(evt.startDate.replace(/\s/, 'T')), new Date(evt.endDate.replace(/\s/, 'T'))).then(
                    //   (msg) => {
                    //       this.save();
                    //   },
                    //   (err) => {
                    //     console.log(err);
                    //   }
                    // )
                    var root = this;
                    window['plugins'].calendar.deleteEventById(evt.id, null, function () {
                        root.save();
                    }, function () {
                        console.log('error!');
                    });
                }
            }
            else {
                var startDate = evt.startDate.replace(/-/g, '\/');
                var endDate = evt.endDate.replace(/-/g, '\/');
                // var timeB = evt.startDate.split(":"); 
                // alert(startDate);
                // var SD = new Date(`${timeA[1]}/${timeA[2]}/${timeA[0]} ${timeB[0]}:${timeB[1]}:00`); 
                // var startDate = new Date(`${this.month}/${this.day}/${this.year} 00:00:00 AM`);
                // var endDate = new Date(`${this.month}/${this.day}/${this.year} 23:59:59 PM`);              
                this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(startDate), new Date(endDate)).then(function (msg) {
                    _this.save();
                }, function (err) {
                    console.log(err);
                });
            }
        }
        else {
            if (this.data.data._id) {
                this.settingService.deleteEvent(this.data.data._id).then(function (data_local) {
                    _this.clearNotifications(_this.data.data._id);
                    _this.save();
                })
                    .catch(function (error) {
                    console.log(error);
                });
            }
        }
    };
    AddEventPage.prototype.deleteEvent = function () {
        var _this = this;
        if (this.data && this.data.data && this.data.data.id) {
            var evt_1 = this.data.data;
            if (this.plt.is('android')) {
                var root = this;
                var repeat = this.event.repeat;
                if (repeat == -100) {
                    var alert_pup = this.alertCtrl.create({
                        message: this.delete_event,
                        cssClass: 'popup_delete',
                        buttons: [
                            {
                                text: this.delete_all_event,
                                handler: function (data) {
                                    if (evt_1) {
                                        _this.deleteEventById(evt_1.id, null);
                                    }
                                }
                            },
                            {
                                text: this.delete_this_and_future_event,
                                handler: function (data) {
                                    if (evt_1) {
                                        // alert(JSON.stringify(this.data.data));
                                        var date = (new Date(evt_1.startDate.replace(/\s/, 'T')));
                                        _this.deleteEventById(evt_1.id, date);
                                        // var startDate = evt.startDate.replace(/-/g, '\/');
                                        // var endDate = evt.endDate.replace(/-/g, '\/');                      
                                        // this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(startDate), new Date(endDate)).then(
                                        //   (msg) => {
                                        //     if ((this.data && this.data.status == "edit") || this.data.status == "add") {
                                        //       this.callback(this.data).then( () => { this.navCtrl.pop() });
                                        //     }
                                        //     else{
                                        //       this.navCtrl.pop();
                                        //     }
                                        //   },
                                        //   (err) => {
                                        //     console.log(err);
                                        //   }
                                        // )
                                    }
                                }
                            },
                            {
                                text: this.cancel,
                                role: 'cancel',
                                handler: function (data) {
                                    console.log('Cancel clicked');
                                }
                            }
                        ]
                    });
                    alert_pup.present();
                }
                else {
                    var alert_1 = this.alertCtrl.create({
                        message: this.delete_event,
                        cssClass: 'popup_delete',
                        buttons: [
                            {
                                text: this.cancel,
                                role: 'cancel',
                                handler: function (data) {
                                }
                            },
                            {
                                text: this.ok,
                                handler: function (data) {
                                    if (evt_1) {
                                        _this.deleteEventById(evt_1.id, null);
                                        if (_this.data.data._id) {
                                            _this.clearNotifications(_this.data.data._id);
                                            _this.settingService.deleteEvent(_this.data.data._id);
                                        }
                                    }
                                }
                            }
                        ]
                    });
                    alert_1.present();
                }
                // if (evt) {
                //   this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(evt.startDate.replace(/\s/, 'T')), new Date(evt.endDate.replace(/\s/, 'T'))).then(
                //     (msg) => {
                //       if ((this.data && this.data.status == "edit") || this.data.status == "add") {
                //         this.callback(this.data).then( () => { this.navCtrl.pop() });
                //       }
                //       else{
                //         this.navCtrl.pop();
                //       }
                //     },
                //     (err) => {
                //       console.log(err);
                //     }
                //   )
                // } 
            }
            else {
                var startDate = evt_1.startDate.replace(/-/g, '\/');
                var endDate = evt_1.endDate.replace(/-/g, '\/');
                if (this.event.repeat) {
                    var alertPopup = this.alertCtrl.create({
                        message: this.day_la_su_kien_lap_lai,
                        cssClass: 'popup_delete',
                        buttons: [
                            {
                                text: this.delete_this_event,
                                handler: function (data) {
                                    evt_1.notes += "~0"; // ~0 : delete this event , ~1 : delete this and future event;
                                    _this.calendar.deleteEvent(evt_1.title, evt_1.location, evt_1.notes, new Date(startDate), new Date(endDate)).then(function (msg) {
                                        if ((_this.data && _this.data.status == "edit") || _this.data.status == "add") {
                                            _this.callback(_this.data).then(function () { _this.navCtrl.pop(); });
                                        }
                                        else {
                                            _this.navCtrl.pop();
                                        }
                                    }, function (err) {
                                        console.log(err);
                                    });
                                }
                            },
                            {
                                text: this.delete_this_and_future_event,
                                handler: function (data) {
                                    evt_1.notes += "~1"; // ~0 : delete this event , ~1 : delete this and future event;
                                    _this.calendar.deleteEvent(evt_1.title, evt_1.location, evt_1.notes, new Date(startDate), new Date(endDate)).then(function (msg) {
                                        if (_this.data.data._id) {
                                            _this.settingService.deleteEventById(_this.data.data.id);
                                        }
                                        if ((_this.data && _this.data.status == "edit") || _this.data.status == "add") {
                                            _this.callback(_this.data).then(function () { _this.navCtrl.pop(); });
                                        }
                                        else {
                                            _this.navCtrl.pop();
                                        }
                                    }, function (err) {
                                        console.log(err);
                                    });
                                }
                            },
                            {
                                text: this.cancel,
                                role: 'cancel',
                                handler: function (data) {
                                    console.log('Cancel clicked');
                                }
                            }
                        ]
                    });
                    alertPopup.present();
                }
                else {
                    var alertPopup = this.alertCtrl.create({
                        message: this.delete_event,
                        cssClass: 'popup_delete',
                        buttons: [
                            {
                                // text: 'Chỉ xóa sự kiện này',
                                text: this.ok,
                                handler: function (data) {
                                    evt_1.notes += "~0"; // ~0 : delete this event , ~1 : delete this and future event;
                                    _this.calendar.deleteEvent(evt_1.title, evt_1.location, evt_1.notes, new Date(startDate), new Date(endDate)).then(function (msg) {
                                        if (_this.data.data._id) {
                                            _this.settingService.deleteEventById(_this.data.data.id);
                                        }
                                        if ((_this.data && _this.data.status == "edit") || _this.data.status == "add") {
                                            _this.callback(_this.data).then(function () { _this.navCtrl.pop(); });
                                        }
                                        else {
                                            _this.navCtrl.pop();
                                        }
                                    }, function (err) {
                                        console.log(err);
                                    });
                                }
                            },
                            {
                                text: this.cancel,
                                role: 'cancel',
                                handler: function (data) {
                                    console.log('Cancel clicked');
                                }
                            }
                        ]
                    });
                    alertPopup.present();
                }
            }
        }
        else {
            if (this.data.data._id) {
                var alert_2 = this.alertCtrl.create({
                    message: this.delete_event,
                    cssClass: 'popup_delete',
                    buttons: [
                        {
                            text: this.cancel,
                            role: 'cancel',
                            handler: function (data) {
                            }
                        },
                        {
                            text: this.ok,
                            handler: function (data) {
                                _this.settingService.deleteEvent(_this.data.data._id).then(function (data_local) {
                                    _this.clearNotifications(_this.data.data._id);
                                    if ((_this.data && _this.data.status == "edit") || _this.data.status == "add") {
                                        _this.callback(_this.data).then(function () { _this.navCtrl.pop(); });
                                    }
                                    else {
                                        _this.navCtrl.pop();
                                    }
                                })
                                    .catch(function (error) {
                                    console.log(error);
                                });
                            }
                        }
                    ]
                });
                alert_2.present();
            }
        }
    };
    AddEventPage.prototype.deleteEventById = function (id, fromTime) {
        var root = this;
        window['plugins'].calendar.deleteEventById(id, fromTime, function () {
            if ((root.data && root.data.status == "edit") || root.data.status == "add") {
                root.callback(root.data).then(function () { root.navCtrl.pop(); });
            }
            else {
                root.navCtrl.pop();
            }
        }, function () {
            console.log('error!');
        });
    };
    AddEventPage.prototype.validateEventData = function () {
        var success = true;
        if (!this.event.title) {
            success = false;
            this.alertError(this.error_alert, this.title_error);
        }
        else if (!this.event.startDate) {
            success = false;
            this.alertError(this.error_alert, this.start_date_error);
        }
        else if (!this.event.endDate) {
            success = false;
            this.alertError(this.error_alert, this.end_date_error);
        }
        // if (!this.event.calendarType) {
        //   success = false;
        // }
        return success;
    };
    AddEventPage.prototype.addNotifications = function (id, event, SD, ED) {
        // var startDate = new Date(this.event.startDate.replace(/\s/, 'T'));
        // var endDate = new Date(this.event.endDate.replace(/\s/, 'T')).toISOString();
        var list_noti = this.createNotiLunar(id, event, SD, ED);
        this.localNotifications.schedule(list_noti);
    };
    AddEventPage.prototype.clearNotifications = function (id) {
        var list_noti = new Array();
        for (var i = 0; i < 10; i++) {
            list_noti.push(id + "" + i);
        }
        this.localNotifications.clear(list_noti);
    };
    AddEventPage.prototype.createNotiLunar = function (id, event, startDate, endDate) {
        var array = new Array();
        var startLunaDate = getLunarDate(startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear());
        var date = startDate;
        var reminder = 0;
        if (event.alert) {
            if (event.alert == 1) {
                reminder = 900000;
            }
            if (event.alert == 2) {
                reminder = 1800000;
            }
            if (event.alert == 3) {
                reminder = 3600000;
            }
            if (event.alert == 4) {
                reminder = 7200000;
            }
            if (event.alert == 5) {
                reminder = 86400000;
            }
            if (event.alert == 6) {
                reminder = 172800000;
            }
        }
        for (var i = 0; i < 10; i++) {
            var obj = {
                id: id + "" + i,
                title: event.title,
                text: event.message,
                trigger: { at: new Date(date.getTime() - reminder) },
                // trigger: { every: { month: 10, day: 27, hour: 9, minute: 0 } }
                led: 'E51F20',
                sound: null,
                // icon: 'assets://imgs/air.png',
                smallIcon: 'res://icon',
                // smallIcon: 'file://assets/imgs/air.png',
                icon: 'file://assets/imgs/icon.png'
            };
            array.push(obj);
            if (event.repeat == 3 || event.repeat == '3') {
                date = new Date(date.getTime() + (86400000 * getMaxDayOfMonth(date.getDate(), date.getMonth(), date.getFullYear())));
            }
            else if (event.repeat == 4 || event.repeat == '4') {
                startLunaDate.year = startLunaDate.year + 1;
                var solar = convertLunar2Solar(startLunaDate.day, startLunaDate.month, startLunaDate.year, 0, 7);
                // month/date/year
                date = new Date(solar[1] + "/" + solar[0] + "/" + solar[2] + " " + event.startDate.time + ":00");
            }
        }
        return array;
    };
    AddEventPage.prototype.alertError = function (title, subTitle) {
        var alertSuccess = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: [this.ok]
        });
        alertSuccess.present();
    };
    AddEventPage.prototype.reverseDate = function (date) {
        var my_date = date.split("-").reverse();
        var day = my_date[0];
        if (day.length == 1) {
            day = "0" + day;
        }
        var month = my_date[1];
        if (month.length == 1) {
            month = "0" + month;
        }
        return day + "-" + month + "-" + my_date[2];
        // return date.split("-").reverse().join('-');
        // this.event.startDateText = .valueText.split(/\//).reverse().join('/');
    };
    AddEventPage.prototype.reverseLunarDate = function (date) {
        var my_date = date.split("-");
        var day = my_date[0];
        if (day.length == 1) {
            day = "0" + day;
        }
        var month = my_date[1];
        if (month.length == 1) {
            month = "0" + month;
        }
        return day + "-" + month + "-" + my_date[2];
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", Object)
    ], AddEventPage.prototype, "content", void 0);
    AddEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-event',template:/*ion-inline-start:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\add-event\add-event.html"*/'<!--\n  Generated template for the AddEventPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <!-- <img class="logo-header" alt="logo" height="40" src="../assets/imgs/logo-header.png"> -->\n    <!--      <div>\n       <img src="../assets/imgs/save_icon.png"></img>\n     </div> -->\n<!--     <button ion-item type="submit" class="save_button" (click)="save()">\n      <img class="icon-item" src="../assets/imgs/icon/save_icon.png">\n    </button> -->\n      <ion-title> <img class="logo-header" alt="logo" height="40"   src="../assets/imgs/logo-header.png" > </ion-title>    \n      <ion-buttons style="display: none;" end>\n        <button ion-button icon-only (click)="save()" class="add-button" *ngIf="!(data && data.status == \'edit\')">\n          <img height="25" src="../assets/imgs/icon/save_icon.png">\n        </button>   \n        <button ion-button icon-only (click)="editEvent()" class="add-button" *ngIf="data && data.status == \'edit\'">\n          <img height="25" src="../assets/imgs/icon/save_icon.png">\n        </button>          \n      </ion-buttons> \n  </ion-navbar>\n</ion-header>\n\n<ion-content #content>\n  <ion-list class="form-wrapper">\n    <ion-item class="title-item mt-1">\n      <ion-icon style=\'color: gray\' item-start>T</ion-icon>\n      <ion-input type="text" [(ngModel)]="event.title" name="event.title" (keyup.enter)="scrollNext(1)" (keyup)="setFocus" placeholder="{{\'Title_event\' | translate}}"></ion-input>\n    </ion-item>\n    <ion-grid class="p-0 mt-1" radio-group [(ngModel)]="event.calendarType">\n      <ion-row>\n        <ion-col>\n          <ion-item>\n            <ion-label>{{ \'Luna_Calendar\' | translate }}</ion-label>\n            <ion-radio id="radioButton" mode="md" class="item-radio" color="secondary" value="1"></ion-radio>\n          </ion-item>\n        </ion-col>\n        <ion-col>\n          <ion-item>\n            <ion-label>{{ \'Solar_Calendar\' | translate }}</ion-label>\n            <ion-radio mode="md" class="item-radio" color="secondary" value="2"></ion-radio>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <div class="input-block-container mt-1">\n      <div class="input-block-item">\n        <ion-icon name="ios-time-outline" item-start></ion-icon>\n        <ion-label>{{ \'Time\' | translate }}</ion-label>\n      </div>\n      <div class="input-block-item grid-2">\n        <ion-label>{{ \'All_Day\' | translate }}</ion-label>\n        <ion-checkbox color="secondary" [(ngModel)]="event.allDay" (ionChange)="changeAllday(ev)"></ion-checkbox>\n      </div>\n      <div class="input-block-item">\n        <ion-grid class="p-0">\n          <ion-row>\n            <ion-col class="p-0 b-r" col-4>\n              <ion-label>{{\'Start_Date\'|translate}}</ion-label>\n            </ion-col>\n            <ion-col id="startDateInput" class="p-0" col-8 (click)="openCalendarModal(\'start\')">\n              <div class="date-input {{is_lunaCalendar}}" *ngIf="event.startDate && event.calendarType == 2">{{reverseDate(event.startDate.date) + (event.allDay?\'\':(\' \' + event.startDate.time))}}</div>\n              <div class="date-input " *ngIf="event.startDate && lunaStartDate && event.calendarType == 1">{{reverseLunarDate(lunaStartDate.day + \'-\' + lunaStartDate.month + \'-\' + lunaStartDate.year) + (event.allDay?\'\':(\' \' + event.startDate.time))}}</div>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </div>\n      <div class="input-block-item">\n        <ion-grid class="p-0">\n          <ion-row>\n            <ion-col class="p-0 b-r" col-4>\n              <ion-label>{{\'End_Date\'|translate}}</ion-label>\n            </ion-col>\n            <ion-col id="endDateInput" class="p-0" col-8 (click)="openCalendarModal(\'end\')">\n              <div class="date-input" *ngIf="event.endDate && event.calendarType == 2">{{reverseDate(event.endDate.date) + (event.allDay?\'\':(\' \' + event.endDate.time))}}</div>\n              <div class="date-input " *ngIf="event.endDate && lunaEndDate && event.calendarType == 1">{{reverseLunarDate(lunaEndDate.day + \'-\' + lunaEndDate.month + \'-\' + lunaEndDate.year) + \' \' + (event.allDay?\'\':(event.endDate.time))}}</div>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </div>\n    </div>\n\n    <div class="input-block-container mt-3">\n      <div class="input-block-item grid-3">\n        <ion-icon name="ios-refresh-outline" style="transform: rotateY(180deg);" item-start></ion-icon>\n        <ion-label>{{\'Repeat\'|translate}}</ion-label>\n        <ion-select [(ngModel)]="event.repeat" name="event.repeat">\n          <ion-option value="0">{{\'Repeat_0\'|translate}}</ion-option>\n          <ion-option value="1">{{\'Repeat_1\'|translate}}</ion-option>\n          <ion-option value="2">{{\'Repeat_2\'|translate}}</ion-option>\n          <ion-option value="3">{{\'Repeat_3\'|translate}}</ion-option>\n          <ion-option value="4">{{\'Repeat_4\'|translate}}</ion-option>\n        </ion-select>\n      </div>\n      <div class="input-block-item grid-3">\n        <ion-icon name="ios-notifications-outline" item-start></ion-icon>\n        <ion-label>{{\'Alert\'|translate}}</ion-label>\n        <ion-select [(ngModel)]="event.alert" name="event.alert">\n          <ion-option value="0">{{\'Alert_0\'|translate}}</ion-option>\n          <ion-option value="1">{{\'Alert_1\'|translate}}</ion-option>\n          <ion-option value="2">{{\'Alert_2\'|translate}}</ion-option>\n          <ion-option value="3">{{\'Alert_3\'|translate}}</ion-option>\n          <ion-option value="4">{{\'Alert_4\'|translate}}</ion-option>\n          <ion-option value="5">{{\'Alert_5\'|translate}}</ion-option>\n          <ion-option value="6">{{\'Alert_6\'|translate}}</ion-option>\n        </ion-select>\n      </div>\n      <div class="input-block-item grid-3">\n        <ion-icon name=\'ios-pin-outline\' item-start></ion-icon>\n        <ion-label>{{\'Location\'|translate}}</ion-label>\n        <ion-input #b id="location" (keyup.enter)="moveFocus(c)" (click)="scrollNext(4)"  text-wrap type="text" [(ngModel)]="event.location" name="event.location" placeholder="{{\'Not_Required\'|translate}}"></ion-input>\n      </div>\n      <div class="input-block-item grid-3">\n        <ion-icon name=\'ios-create-outline\' item-start></ion-icon>\n        <ion-label>{{\'Note\'|translate}}</ion-label>\n        <ion-input #c id="note" (click)="scrollNext(5)"   text-wrap type="text" [(ngModel)]="event.message" name="event.message" placeholder="{{\'Not_Required\'|translate}}"></ion-input>\n      </div>\n    </div>\n\n\n\n    <ion-item class="action-calendar" *ngIf="!(data && data.data && data.data.canModify == \'0\')">\n\n        <button ion-button icon-only (click)="save()" class="add-button" *ngIf="!(data && data.status == \'edit\')">\n          {{\'Save\'|translate}}\n        </button>   \n        <button ion-button icon-only (click)="editEvent()" class="add-button" *ngIf="data && data.status == \'edit\'">\n          {{\'Update\'|translate}}\n        </button>\n\n        <button ion-button icon-only (click)="deleteEvent()" color="danger" class="add-button remove-button" *ngIf="(data && data.status == \'edit\')">\n          {{\'Delete\'|translate}}\n        </button>         \n    </ion-item>\n  </ion-list>\n\n</ion-content>\n  <div class=\'footer\'>\n    <img src=\'../assets/imgs/event/footer.png\'>\n  </div>'/*ion-inline-end:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\add-event\add-event.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_calendar__["a" /* Calendar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_6__providers_setting_setting_service__["a" /* SettingService */]])
    ], AddEventPage);
    return AddEventPage;
}());

//# sourceMappingURL=add-event.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__database_database_service__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_setting_interface__ = __webpack_require__(187);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { Setting } from './../../models/setting.interface';




var SettingService = /** @class */ (function () {
    function SettingService(databaseService, plt) {
        this.databaseService = databaseService;
        this.plt = plt;
    }
    // CUSTOMER
    SettingService.prototype.saveEvent = function (datasave, startDate, endDate, id) {
        var sqlData = [];
        console.log(datasave);
        var startLunaDate = getLunarDate(startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear());
        var week = startDate.getDay();
        var day = startLunaDate.day;
        var month = startLunaDate.month;
        var year = startLunaDate.year;
        var leap = startLunaDate.leap;
        var jd = startLunaDate.jd;
        // var time_allday = 0;
        if (datasave.allDay) {
            // time_allday = 86400000;
            endDate = new Date(endDate.getTime() + 86400000);
        }
        var endLunaDate = getLunarDate(endDate.getDate(), endDate.getMonth() + 1, endDate.getFullYear());
        var week_end = endDate.getDay();
        var day_end = endLunaDate.day;
        var month_end = endLunaDate.month;
        var year_end = endLunaDate.year;
        var leap_end = endLunaDate.leap;
        var jd_end = endLunaDate.jd;
        var reminder = 0;
        if (datasave.alert) {
            if (datasave.alert == 1) {
                reminder = 15;
            }
            if (datasave.alert == 2) {
                reminder = 30;
            }
            if (datasave.alert == 3) {
                reminder = 60;
            }
            if (datasave.alert == 4) {
                reminder = 120;
            }
            if (datasave.alert == 5) {
                reminder = 1440;
            }
            if (datasave.alert == 6) {
                reminder = 2880;
            }
        }
        sqlData = [startDate.getTime(), endDate.getTime(), week, day, month, year, leap, jd, week_end, day_end, month_end, year_end, leap_end, jd_end, datasave.title, datasave.location, datasave.message, datasave.repeat, reminder, datasave.allDay, id];
        return this.databaseService.getDatabase().then(function (database) {
            return database.executeSql(__WEBPACK_IMPORTED_MODULE_3__models_setting_interface__["e" /* SQL_SAVE_EVENT */], sqlData).then(function (data) {
                return data;
            });
        });
    };
    SettingService.prototype.updateEvent = function (datasave, _id) {
        var sqlData = [];
        sqlData = [datasave.startDate, datasave.endDate, datasave.week, datasave.day, datasave.month, datasave.year, datasave.title, datasave.location, datasave.message, datasave.repeat, datasave.reminder, datasave.allDay, _id];
        return this.databaseService.getDatabase().then(function (database) {
            return database.executeSql(__WEBPACK_IMPORTED_MODULE_3__models_setting_interface__["i" /* SQL_UPDATE_EVENT */], sqlData).then(function (data) {
                return data;
            });
        });
    };
    SettingService.prototype.deleteEvent = function (_id) {
        var sqlData = [_id];
        return this.databaseService.getDatabase().then(function (database) {
            return database.executeSql(__WEBPACK_IMPORTED_MODULE_3__models_setting_interface__["c" /* SQL_DELETE_EVENT */], sqlData).then(function (data) {
                return data;
            });
        });
    };
    SettingService.prototype.deleteEventById = function (id) {
        var sqlData = [];
        sqlData = [id];
        return this.databaseService.getDatabase().then(function (database) {
            return database.executeSql(__WEBPACK_IMPORTED_MODULE_3__models_setting_interface__["d" /* SQL_DELETE_EVENT_BY_ID */], sqlData).then(function (data) {
                return data;
            });
        });
    };
    SettingService.prototype.getAllEvent = function () {
        return this.databaseService.getDatabase().then(function (database) {
            var query = __WEBPACK_IMPORTED_MODULE_3__models_setting_interface__["f" /* SQL_SELECT_ALL_EVENT */];
            var sql = [];
            return database.executeSql(query, sql).then(function (data) {
                var rs = new Array();
                for (var i = 0; i < data.rows.length; i++) {
                    rs.push({
                        _id: data.rows.item(i)._id,
                        startDate: data.rows.item(i).startDate,
                        endDate: data.rows.item(i).endDate,
                        // week: data.rows.item(i).week,
                        // day: data.rows.item(i).day,
                        // month: data.rows.item(i).month,
                        // year: data.rows.item(i).year,
                        title: data.rows.item(i).title,
                        location: data.rows.item(i).location,
                        message: data.rows.item(i).message,
                        repeat: data.rows.item(i).repeat,
                        reminder: data.rows.item(i).reminder,
                        allDay: data.rows.item(i).allDay,
                        id: data.rows.item(i).id,
                    });
                }
                ;
                return rs;
            });
        });
    };
    SettingService.prototype.getEventById = function (id) {
        return this.databaseService.getDatabase().then(function (database) {
            var query = __WEBPACK_IMPORTED_MODULE_3__models_setting_interface__["h" /* SQL_SELECT_EVENT_BY_ID */];
            var sql = [id];
            return database.executeSql(query, sql).then(function (data) {
                var rs = new Array();
                for (var i = 0; i < data.rows.length; i++) {
                    rs.push({
                        _id: data.rows.item(i)._id,
                        startDate: data.rows.item(i).startDate,
                        endDate: data.rows.item(i).endDate,
                        // week: data.rows.item(i).week,
                        // day: data.rows.item(i).day,
                        // month: data.rows.item(i).month,
                        // year: data.rows.item(i).year,
                        title: data.rows.item(i).title,
                        location: data.rows.item(i).location,
                        message: data.rows.item(i).message,
                        repeat: data.rows.item(i).repeat,
                        reminder: data.rows.item(i).reminder,
                        allDay: data.rows.item(i).allDay,
                        id: data.rows.item(i).id,
                    });
                }
                ;
                return rs;
            });
        });
    };
    SettingService.prototype.getEventByDayRepeatMonthAndYear = function (startDate, endDate) {
        var _this = this;
        return this.databaseService.getDatabase().then(function (database) {
            var query = __WEBPACK_IMPORTED_MODULE_3__models_setting_interface__["g" /* SQL_SELECT_EVENT_BY_DAY_REPEAT_MONTH_AND_YEAR */];
            var startLunaDate = getLunarDate(startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear());
            var day = startLunaDate.day;
            var month = startLunaDate.month;
            var endLunaDate = getLunarDate(endDate.getDate(), endDate.getMonth() + 1, endDate.getFullYear());
            var day_end = endLunaDate.day;
            var month_end = endLunaDate.month;
            // let sql = [
            // endDate.getTime(),day,day,
            // endDate.getTime(),day,month,
            // endDate.getTime(),month,month,
            // endDate.getTime(),day,month,
            // endDate.getTime(),day,month
            // ];
            var sql = [
                endDate.getTime(),
                endDate.getTime()
            ];
            return database.executeSql(query, sql).then(function (data) {
                var rs = new Array();
                for (var i = 0; i < data.rows.length; i++) {
                    var item = _this.inDateRangeByDayRepeatMonthAndYear(data.rows.item(i), startDate, endDate, startLunaDate, endLunaDate);
                    if (item) {
                        rs.push({
                            _id: data.rows.item(i)._id,
                            // startDate: data.rows.item(i).startDate,
                            startDate: _this.convertTimerToDate(data.rows.item(i).startDate, item[0]),
                            endDate: _this.convertTimerToDate(data.rows.item(i).endDate, item[1]),
                            // endDate: data.rows.item(i).endDate,
                            week: data.rows.item(i).week,
                            day: data.rows.item(i).day,
                            month: data.rows.item(i).month,
                            year: data.rows.item(i).year,
                            title: data.rows.item(i).title,
                            location: data.rows.item(i).location,
                            message: data.rows.item(i).message,
                            // repeat: +data.rows.item(i).repeat,
                            recurrence: {
                                freq: (data.rows.item(i).repeat == '3') ? 'MONTHLY' : 'YEARLY',
                            },
                            reminder: data.rows.item(i).reminder,
                            allDay: (data.rows.item(i).allDay == 'false') ? false : true,
                            id: data.rows.item(i).id,
                        });
                    }
                }
                ;
                return rs;
            });
        });
    };
    SettingService.prototype.inDateRangeByDayRepeatMonthAndYear = function (day, startDate, endDate, startLunaDate, endLunaDate) {
        // console.log(day);
        var year = day.year;
        var repeat = day.repeat;
        var month = day.month;
        if (repeat == '3')
            month = startLunaDate.month;
        var month_end = day.month_end;
        if (repeat == '3')
            month_end = endLunaDate.month;
        var my_solar = convertLunar2Solar(parseInt(day.day), parseInt(month), parseInt(startLunaDate.year), 0, 7);
        var my_solar_end = convertLunar2Solar(parseInt(day.day_end), parseInt(month_end), parseInt(endLunaDate.year), 0, 7);
        var my_jdn = jdn(my_solar[0], my_solar[1], my_solar[2]);
        var my_jdn_end = jdn(my_solar_end[0], my_solar_end[1], my_solar_end[2]);
        // console.log(startLunaDate);
        // console.log(endLunaDate);
        // // console.log(day.day);        
        // // console.log(month);        
        // // console.log(startLunaDate.year);        
        // console.log(my_solar);        
        // console.log(my_solar_end);        
        // console.log(my_jdn);        
        // console.log(my_jdn_end);        
        if (my_jdn >= startLunaDate.jd && my_jdn <= endLunaDate.jd || my_jdn_end >= startLunaDate.jd && my_jdn_end <= endLunaDate.jd) {
            var my_jdn_end = my_jdn + (day.jd_end - day.jd);
            var my_solar_end = jdToDate(my_jdn_end);
            return [my_solar, my_solar_end];
        }
        if (my_jdn <= startLunaDate.jd && my_jdn_end >= startLunaDate.jd || my_jdn <= endLunaDate.jd && my_jdn_end >= endLunaDate.jd) {
            var my_jdn_end = my_jdn + (day.jd_end - day.jd);
            var my_solar_end = jdToDate(my_jdn_end);
            return [my_solar, my_solar_end];
        }
        return false;
        // return false;
    };
    SettingService.prototype.listEventsInRangeMonth = function (startDate, endDate, month) {
        var _this = this;
        return this.databaseService.getDatabase().then(function (database) {
            var query = __WEBPACK_IMPORTED_MODULE_3__models_setting_interface__["g" /* SQL_SELECT_EVENT_BY_DAY_REPEAT_MONTH_AND_YEAR */];
            var startLunaDate = getLunarDate(startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear());
            var day = startLunaDate.day;
            var month = startLunaDate.month;
            var endLunaDate = getLunarDate(endDate.getDate(), endDate.getMonth() + 1, endDate.getFullYear());
            var day_end = endLunaDate.day;
            var month_end = endLunaDate.month;
            // let sql = [
            // endDate.getTime(),day,day,
            // endDate.getTime(),day,month,
            // endDate.getTime(),month,month,
            // endDate.getTime(),day,month,
            // endDate.getTime(),day,month
            // ];
            var sql = [
                endDate.getTime(),
                endDate.getTime()
            ];
            return database.executeSql(query, sql).then(function (data) {
                var rs = new Array();
                for (var i = 0; i < data.rows.length; i++) {
                    var item = _this.inDateRangeByDayRepeatMonthAndYear(data.rows.item(i), startDate, endDate, startLunaDate, endLunaDate);
                    if (item) {
                        rs.push({
                            _id: data.rows.item(i)._id,
                            // startDate: data.rows.item(i).startDate,
                            startDate: _this.convertTimerToDate(data.rows.item(i).startDate, item[0]),
                            endDate: _this.convertTimerToDate(data.rows.item(i).endDate, item[1]),
                            // endDate: data.rows.item(i).endDate,
                            week: data.rows.item(i).week,
                            day: data.rows.item(i).day,
                            month: data.rows.item(i).month,
                            year: data.rows.item(i).year,
                            title: data.rows.item(i).title,
                            location: data.rows.item(i).location,
                            message: data.rows.item(i).message,
                            // repeat: +data.rows.item(i).repeat,
                            recurrence: {
                                freq: (data.rows.item(i).repeat == '3') ? 'MONTHLY' : 'YEARLY',
                            },
                            reminder: data.rows.item(i).reminder,
                            allDay: (data.rows.item(i).allDay == 'false') ? false : true,
                            id: data.rows.item(i).id,
                        });
                    }
                }
                ;
                return rs;
            });
        });
    };
    SettingService.prototype.convertTimerToDate = function (time, item) {
        var mydate = new Date(+time);
        // return mydate.getFullYear()+"-"+(mydate.getMonth()+1)+"-"+mydate.getDate()+" "+mydate.getHours()+":"+mydate.getMinutes()+":"+mydate.getSeconds();
        if (this.plt.is('ios')) {
            return item[2] + "-" + item[1] + "-" + item[0] + "T" + mydate.getHours() + ":" + mydate.getMinutes() + ":" + mydate.getSeconds();
        }
        else {
            return item[2] + "-" + item[1] + "-" + item[0] + " " + mydate.getHours() + ":" + mydate.getMinutes() + ":" + mydate.getSeconds();
        }
    };
    SettingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__database_database_service__["a" /* DatabaseService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Platform */]])
    ], SettingService);
    return SettingService;
}());

//# sourceMappingURL=setting.service.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LanguageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LanguageService = /** @class */ (function () {
    function LanguageService() {
        this.languages = new Array();
        this.languages.push({ name: "English", code: "en" }, { name: "Việt Nam", code: "vn" });
    }
    LanguageService.prototype.getLanguages = function () {
        return this.languages;
    };
    LanguageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], LanguageService);
    return LanguageService;
}());

//# sourceMappingURL=language.service.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_event_add_event__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_calendar__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__day_modal_day_modal__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_setting_setting_service__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var HomePage = /** @class */ (function () {
    function HomePage(storage, alertCtrl, translate, navCtrl, calendar, domSanitizer, splashScreen, plt, settingService) {
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.calendar = calendar;
        this.domSanitizer = domSanitizer;
        this.splashScreen = splashScreen;
        this.plt = plt;
        this.settingService = settingService;
        this.currentMonth = "January";
        this.is_lunaCalendar = false;
        this.loading = true;
        this.file_path = configApp.file_path;
        this.is_lunaCalendar = configApp.is_lunaCalendar;
        this.initView();
        // this.storage.get('calendartype').then((val) => {
        //   if (val && val == "amlich") {
        //     this.is_lunaCalendar = true;
        //     this.getDaysOfMonth();
        //     this.initSlide();          
        //   }
        // });
        // calendar.hasReadWritePermission().then(
        //   (msg) => { console.log(msg); 
        //     alert(msg);
        //   },
        //   (err) => { console.log(err); }
        // ); 
    }
    HomePage.prototype.ngAfterViewInit = function () {
        // this.slides.centeredSlides = false;
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var TIME_IN_MS = 1000;
        var hideFooterTimeout = setTimeout(function () {
            _this.splashScreen.hide();
        }, TIME_IN_MS);
        // this.initView();
        // let timmrr = 0;
        // if (this.plt.is('android')) { 
        //   timmrr = 0;
        // }
        // setTimeout( () => {
        //     // this.initView(); 
        //     this.loading = true; 
        //     this.loadEventThisMonth();  
        //     // this.setSlide();
        // }, timmrr);      
    };
    HomePage.prototype.ionViewWillEnter = function () {
        // this.splashScreen.hide();
        this.loadEventThisMonth();
        this.slides.slideTo(1, 0);
    };
    HomePage.prototype.ionViewDidLeave = function () {
        // this.loading = false; 
    };
    HomePage.prototype.setSlide = function () {
        var _this = this;
        if (this.slides) {
            console.log(this.slides);
            this.slides.slideTo(1, 0);
        }
        else {
            setTimeout(function () {
                _this.setSlide();
            }, 400);
        }
    };
    HomePage.prototype.initView = function () {
        this.date = new Date();
        this.dayday = this.date.getDate();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();
        var currentLunaDate = getLunarDate(this.dayday, this.month + 1, this.year);
        this.currentLunaMonth = currentLunaDate.month;
        this.currentLunaYear = currentLunaDate.year;
        this.LunaMonth = currentLunaDate.month;
        this.LunaYear = currentLunaDate.year;
        this.calendarPerv_Next = new Array();
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.monthLunaNames = ["thang_gieng", "thang_2", "thang_3", "thang_4", "thang_5", "thang_6", "thang_7", "thang_8", "thang_9", "thang_10", "thang_11", "thang_chap"];
        // this.monthNames = ["1","2","3","4","5","6","7","8","9","10","11","12"];
        // this.dayNames = ["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"];
        // this.dayNames = ["CN","T.2","T.3","T.4","T.5","T.6","T.7"];
        this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.getDaysOfMonth();
        this.initSlide();
        this.loadEventThisMonth();
        this.is_slide = true;
        // this.slides.slideTo(1, 0);
    };
    HomePage.prototype.initSlide = function () {
        this.calendarPerv_Next[0] = new Array();
        this.calendarPerv_Next[0].date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        if (this.loading) {
            this.getMonth(0);
        }
        this.calendarPerv_Next[1] = new Array();
        this.calendarPerv_Next[1].date = this.date;
        this.getMonth(1);
        this.setBGDatabase();
        this.calendarPerv_Next[2] = new Array();
        this.calendarPerv_Next[2].date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        if (this.loading) {
            this.getMonth(2);
        }
    };
    HomePage.prototype.setBGDatabase = function () {
        var year = this.calendarPerv_Next[1].currentYear;
        var month = this.calendarPerv_Next[1].currentMonth;
        var type = 0;
        if (!this.background_img || month == 11 || month == 0) {
            if (!this.background_img) {
                this.background_img = new Array();
            }
            for (var i = 0; i < 12; i++) {
                if (database && database[year] && database[year][type] && database[year][type][i]) {
                    this.background_img[i] = this.domSanitizer.bypassSecurityTrustStyle('url(' + database[year][type][i] + ')');
                }
                else if (database && database["default"] && database["default"][type] && database["default"][type][i]) {
                    this.background_img[i] = this.domSanitizer.bypassSecurityTrustStyle('url(' + database["default"][type][i] + ')');
                }
                else {
                    this.background_img[i] = this.getBg(this.monthNames[i]);
                }
            }
        }
        if (!this.is_lunaCalendar) {
            if (database && database[year] && database[year][1] && database[year][1][month]) {
                this.month_count = this.domSanitizer.bypassSecurityTrustResourceUrl(database[year][1][month]);
            }
            else if (database && database["default"] && database["default"][1] && database["default"][1][month]) {
                this.month_count = this.domSanitizer.bypassSecurityTrustResourceUrl(database["default"][1][month]);
            }
            else {
                this.month_count = "../assets/imgs/month/" + (this.currentMonth ? this.currentMonth : "bgApril") + ".png";
            }
        }
        else {
            var lunarYear = this.calendarPerv_Next[1].lunarYear;
            var lunarMonth = this.calendarPerv_Next[1].lunarMonth - 1;
            if (database && database[lunarYear] && database[lunarYear][1] && database[lunarYear][1][lunarMonth]) {
                this.month_count = this.domSanitizer.bypassSecurityTrustResourceUrl(database[lunarYear][1][lunarMonth]);
            }
            else if (database && database["default"] && database["default"][1] && database["default"][1][lunarMonth]) {
                this.month_count = this.domSanitizer.bypassSecurityTrustResourceUrl(database["default"][1][lunarMonth]);
            }
            else {
                this.month_count = "../assets/imgs/month/" + (this.monthNames[lunarMonth]) + ".png";
            }
        }
    };
    HomePage.prototype.getMonth = function (index) {
        this.calendarPerv_Next[index].daysInThisMonth = new Array();
        this.calendarPerv_Next[index].daysLunarInThisMonth = new Array();
        this.calendarPerv_Next[index].daysInLastMonth = new Array();
        this.calendarPerv_Next[index].daysInNextMonth = new Array();
        if (!this.is_lunaCalendar) {
            // this.calendarPerv_Next[index].currentMonth = this.monthNames[this.calendarPerv_Next[index].date.getMonth()];
            this.calendarPerv_Next[index].currentMonth = this.calendarPerv_Next[index].date.getMonth();
            this.calendarPerv_Next[index].currentYear = this.calendarPerv_Next[index].date.getFullYear();
            // if(this.calendarPerv_Next[index].date.getMonth() === new Date().getMonth()) {
            //   this.calendarPerv_Next[index].currentDate = new Date().getDate();
            // } else {
            //   this.calendarPerv_Next[index].currentDate = 999;
            // }
            this.calendarPerv_Next[index].currentDate = this.calendarPerv_Next[index].date.getDate();
            var firstDayThisMonth = new Date(this.calendarPerv_Next[index].date.getFullYear(), this.calendarPerv_Next[index].date.getMonth(), 1).getDay();
            var prevNumOfDays = new Date(this.calendarPerv_Next[index].date.getFullYear(), this.calendarPerv_Next[index].date.getMonth(), 0).getDate();
            for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
                this.calendarPerv_Next[index].daysInLastMonth.push(i);
            }
            var thisNumOfDays = new Date(this.calendarPerv_Next[index].date.getFullYear(), this.calendarPerv_Next[index].date.getMonth() + 1, 0).getDate();
            for (var j = 0; j < thisNumOfDays; j++) {
                this.calendarPerv_Next[index].daysInThisMonth.push(j + 1);
                var day = j + 1;
                var month = this.calendarPerv_Next[index].date.getMonth() + 1;
                var year = this.calendarPerv_Next[index].date.getFullYear();
                var lunarDays = getLunarDate(day, month, year);
                var lunarDay = lunarDays.day;
                if (j == 0 || lunarDays.day == 1) {
                    lunarDay = lunarDays.day + "/" + lunarDays.month;
                }
                var dayWeek = new Date(year, month - 1, day).getDay();
                var lunarDayArray = [lunarDay, dayWeek];
                this.calendarPerv_Next[index].daysLunarInThisMonth.push(lunarDayArray);
            }
            var lastDayThisMonth = new Date(this.calendarPerv_Next[index].date.getFullYear(), this.calendarPerv_Next[index].date.getMonth() + 1, 0).getDay();
            // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
            for (var k = 0; k < (6 - lastDayThisMonth); k++) {
                this.calendarPerv_Next[index].daysInNextMonth.push(k + 1);
            }
            var totalDays = this.calendarPerv_Next[index].daysInLastMonth.length + this.calendarPerv_Next[index].daysInThisMonth.length + this.calendarPerv_Next[index].daysInNextMonth.length;
            if (totalDays < 36) {
                for (var l = (7 - lastDayThisMonth); l < ((7 - lastDayThisMonth) + 7); l++) {
                    this.calendarPerv_Next[index].daysInNextMonth.push(l);
                }
            }
        }
        else {
            this.convertLunaCalendar(this.calendarPerv_Next[index], index);
        }
    };
    HomePage.prototype.getDaysOfMonth = function () {
        this.currentMonth = this.monthNames[this.date.getMonth()];
        this.currentYear = this.date.getFullYear();
        if (this.date.getMonth() === new Date().getMonth()) {
            this.currentDate = new Date().getDate();
        }
        else {
            this.currentDate = 999;
        }
    };
    HomePage.prototype.convertLunaCalendar = function (calendar_item, index) {
        calendar_item.currentMonth = calendar_item.date.getMonth();
        calendar_item.currentYear = calendar_item.date.getFullYear();
        var lunarDate = getLunarDate(this.dayday, calendar_item.currentMonth + 1, calendar_item.currentYear);
        var date = new Date(calendar_item.currentYear, calendar_item.currentMonth, this.dayday - lunarDate.day + 1);
        // let lunarDate = getLunarDate(this.dayday, this.month + 1, this.year);
        // let date = new Date(this.year, this.month, this.dayday - lunarDate.day + 1);
        var totalDays = this.calculateDayInLunarMonth(lunarDate.month);
        var firstDayInMonth = date.getDay();
        var dayInLastMonth = [];
        for (var i = 0; i < date.getDay(); i++) {
            dayInLastMonth.push(0);
        }
        var dayInMonth = [];
        var dayLunarInMonth = [];
        for (var i = 1; i <= totalDays; i++) {
            dayInMonth.push(i);
            var sonarDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i - 1);
            dayLunarInMonth.push([((sonarDate.getDate()) == 1 || i == 1) ? sonarDate.getDate() + "/" + (sonarDate.getMonth() + 1) : sonarDate.getDate(), firstDayInMonth % 7, sonarDate.getDate(), sonarDate.getMonth() + 1, sonarDate.getFullYear()]);
            firstDayInMonth++;
        }
        calendar_item.daysInLastMonth = dayInLastMonth;
        calendar_item.daysInThisMonth = dayInMonth;
        calendar_item.daysLunarInThisMonth = dayLunarInMonth;
        calendar_item.lunarDate = lunarDate.day;
        calendar_item.lunarMonth = lunarDate.month;
        calendar_item.lunarLeap = lunarDate.leap;
        calendar_item.lunarYear = lunarDate.year;
        // console.log(calendar_item);
        // var currentLunaDate = 
        // var currentLunaDate = getLunarDate(day,month,year);
        // var month = getMonth(this.month + 1,this.year);
        // console.log(month);
        // daysInLastMonth = new Array();
        return calendar_item;
    };
    HomePage.prototype.calculateDayInLunarMonth = function (month) {
        var daysInMonth = {
            1: 29,
            2: 30,
            3: 29,
            4: 30,
            5: 29,
            6: 30,
            7: 29,
            8: 30,
            9: 29,
            10: 30,
            11: 29,
            12: 30
        };
        return daysInMonth[month];
    };
    HomePage.prototype.goToLastMonth = function () {
        this.slides.slidePrev(500, true);
    };
    HomePage.prototype.goToNextMonth = function () {
        this.slides.slideNext(500, true);
    };
    HomePage.prototype.addEvent = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__add_event_add_event__["a" /* AddEventPage */]);
    };
    HomePage.prototype.loadEventThisMonth = function () {
        var _this = this;
        this.eventList = new Array();
        if (!this.loading) {
            return;
        }
        if (this.plt.is('android')) {
            var startDate = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
            var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        }
        else {
            // var startDate = new Date(`${this.date.getMonth()- 1}/1/${this.date.getFullYear()}T00:00:00`);
            // var endDate = new Date(`${this.date.getMonth()+ 2}/0/${this.date.getFullYear()}T11:59:59`);
            var startDate = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
            var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        }
        // alert(`${this.date.getMonth()- 1}/1/${this.date.getFullYear()}T00:00:00`);
        // alert(startDate);
        // alert(endDate);
        this.calendar.listEventsInRange(startDate, endDate).then(function (msg) {
            msg.forEach(function (item) {
                if (!item.startDate && item.dtstart) {
                    item.startDate = item.dtstart;
                }
                if (!item.endDate && item.dtend) {
                    item.endDate = item.dtend;
                }
                if (!item.location && item.eventLocation) {
                    item.location = item.eventLocation;
                }
                if (_this.plt.is('ios')) {
                    // alert("base :"+item.startDate);
                    var timeArray = item.startDate.split(" ");
                    var timeA = timeArray[0].split("-");
                    var timeB = timeArray[1].split(":");
                    var SD = new Date(timeA[1] + "/" + timeA[2] + "/" + timeA[0] + " " + timeB[0] + ":" + timeB[1] + ":00");
                    //alert(SD);
                    item.timer_startDate = new Date(SD).getTime();
                    var timeArray = item.endDate.split(" ");
                    var timeC = timeArray[0].split("-");
                    var timeD = timeArray[1].split(":");
                    var ED = new Date(timeC[1] + "/" + timeC[2] + "/" + timeC[0] + " " + timeD[0] + ":" + timeD[1] + ":00");
                    item.timer_endDate = new Date(ED).getTime();
                }
                // item.allDay                
                _this.eventList.push(item);
            });
            for (var d = startDate; d <= endDate;) {
                var g = new Date(d);
                d = new Date(d.getTime() + (86400000 * 10));
                _this.settingService.getEventByDayRepeatMonthAndYear(g, d).then(function (data_local) {
                    // console.log(data_local);
                    if (data_local && data_local.length > 0) {
                        data_local.forEach(function (item) {
                            var timeArray = item.startDate.split(" ");
                            var timeA = timeArray[0].split("-");
                            var timeB = timeArray[1].split(":");
                            var SD = new Date(timeA[1] + "/" + timeA[2] + "/" + timeA[0] + " " + timeB[0] + ":" + timeB[1] + ":00");
                            //alert(SD);
                            item.timer_startDate = new Date(SD).getTime();
                            var timeArray = item.endDate.split(" ");
                            var timeC = timeArray[0].split("-");
                            var timeD = timeArray[1].split(":");
                            var ED = new Date(timeC[1] + "/" + timeC[2] + "/" + timeC[0] + " " + timeD[0] + ":" + timeD[1] + ":00");
                            item.timer_endDate = new Date(ED).getTime();
                            item.startDate = item.timer_startDate;
                            item.endDate = item.timer_endDate;
                            // item.allDay                
                            _this.eventList.push(item);
                        });
                    }
                    // console.log(this.eventList);
                })
                    .catch(function (error) {
                    console.log(error);
                });
            }
            // alert(JSON.stringify(this.eventList));
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.checkEvent = function (day, month, year, dayPrev_Next) {
        if (!this.loading) {
            return false;
        }
        var hasEvent = false;
        // return hasEvent;
        // var mydate = new Date(this.date.getFullYear(), this.date.getMonth() + dayPrev_Next, day);
        // var thisDate1 = mydate.getFullYear()+"-"+(mydate.getMonth()+1)+"-"+day+" 00:00:00";
        // var thisDate2 = mydate.getFullYear()+"-"+(mydate.getMonth()+1)+"-"+day+" 23:59:59";
        // let thisDate1 = year+"-"+(month+1)+"-"+day+" 00:00:00";
        // let thisDate2 = year+"-"+(month+1)+"-"+day+" 23:59:59";
        if (this.plt.is('android')) {
            var thisDate1_1 = new Date(year + "-" + (month + 1) + "-" + day + " 00:00:00").getTime();
            var thisDate2_1 = new Date(year + "-" + (month + 1) + "-" + day + " 23:59:59").getTime();
            this.eventList.forEach(function (event) {
                if ((event.startDate >= thisDate1_1 && event.startDate <= thisDate2_1) || (event.endDate >= thisDate1_1 && event.endDate <= thisDate2_1)) {
                    if (event.allDay || event.allday) {
                        if (!(event.endDate <= thisDate2_1)) {
                            hasEvent = true;
                        }
                    }
                    else {
                        hasEvent = true;
                    }
                }
                else if ((event.startDate <= thisDate1_1 && event.endDate >= thisDate1_1) || (event.startDate <= thisDate2_1 && event.endDate >= thisDate2_1)) {
                    if (event.allDay || event.allday) {
                        if (!(event.endDate <= thisDate2_1)) {
                            hasEvent = true;
                        }
                    }
                    else {
                        hasEvent = true;
                    }
                }
            });
        }
        else {
            var thisDate1_2 = new Date(month + 1 + "/" + day + "/" + year + " 00:00:00").getTime();
            var thisDate2_2 = new Date(month + 1 + "/" + day + "/" + year + " 23:59:59").getTime();
            this.eventList.forEach(function (event) {
                if (((event.timer_startDate >= thisDate1_2) && (event.timer_startDate <= thisDate2_2)) || ((event.timer_endDate >= thisDate1_2) && (event.timer_endDate <= thisDate2_2))) {
                    hasEvent = true;
                    // alert(hasEvent);
                }
                else if ((event.startDate <= thisDate1_2 && event.endDate >= thisDate1_2) || (event.startDate <= thisDate2_2 && event.endDate >= thisDate2_2)) {
                    if ((event.allDay || event.allday) && event._id) {
                        if (!(event.endDate <= thisDate2_2)) {
                            hasEvent = true;
                        }
                    }
                    else {
                        hasEvent = true;
                    }
                }
            });
        }
        // var thisDate1 = new Date(this.date.getFullYear(), this.date.getMonth() + dayPrev_Next, day,0,0,0);
        // var thisDate2 = new Date(this.date.getFullYear(), this.date.getMonth() + dayPrev_Next, day,23,59,59);
        // this.eventList.forEach(event => {
        //   if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
        //     hasEvent = true;
        //   }
        // });
        return hasEvent;
    };
    HomePage.prototype.selectDate = function (day, calendar_item) {
        this.isSelected = false;
        if (!this.is_lunaCalendar) {
            var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
            var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
            var lunaDay = calendar_item.daysLunarInThisMonth[day - 1];
            var data = {
                day: day,
                month: this.date.getMonth() + 1,
                year: this.date.getFullYear(),
                dateStart: thisDate1,
                dateEnd: thisDate2,
                lunaDay: lunaDay,
            };
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__day_modal_day_modal__["a" /* DayModalPage */], {
                data: data,
            });
        }
        else {
            // var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
            // var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
            var myDay = calendar_item.daysLunarInThisMonth[day - 1][2];
            var mymonth = calendar_item.daysLunarInThisMonth[day - 1][3];
            var myyear = calendar_item.daysLunarInThisMonth[day - 1][4];
            var lunaDay_1 = [day, calendar_item.daysLunarInThisMonth[day - 1][1]];
            var data = {
                day: myDay,
                month: mymonth,
                year: myyear,
                lunaDay: lunaDay_1,
            };
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__day_modal_day_modal__["a" /* DayModalPage */], {
                data: data,
            });
        }
    };
    // deleteEvent(evt) {
    //   // console.log(new Date(evt.startDate.replace(/\s/, 'T')));
    //   // console.log(new Date(evt.endDate.replace(/\s/, 'T')));
    //   let alert = this.alertCtrl.create({
    //     title: 'Confirm Delete',
    //     message: 'Are you sure want to delete this event?',
    //     buttons: [
    //       {
    //         text: 'Cancel',
    //         role: 'cancel',
    //         handler: () => {
    //           console.log('Cancel clicked');
    //         }
    //       },
    //       {
    //         text: 'Ok',
    //         handler: () => {
    //           this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(evt.startDate.replace(/\s/, 'T')), new Date(evt.endDate.replace(/\s/, 'T'))).then(
    //             (msg) => {
    //               console.log(msg);
    //               this.loadEventThisMonth();
    //               // this.selectDate(new Date(evt.startDate.replace(/\s/, 'T')).getDate());
    //             },
    //             (err) => {
    //               console.log(err);
    //             }
    //           )
    //         }
    //       }
    //     ]
    //   });
    //   alert.present();
    // }
    HomePage.prototype.slideChanged = function () {
        if (this.is_slide == true) {
            this.is_slide = false;
            return;
        }
        var currentIndex = this.slides.getActiveIndex();
        this.is_slide = true;
        if (currentIndex == 0) {
            this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
            this.getDaysOfMonth();
            this.initSlide();
            this.loadEventThisMonth();
        }
        else {
            this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
            this.getDaysOfMonth();
            this.initSlide();
            this.loadEventThisMonth();
        }
        this.slides.slideTo(1, 0);
    };
    HomePage.prototype.customTrackBy = function (index, obj) {
        return index;
    };
    HomePage.prototype.getBg = function (index) {
        var imageBg = "url(../assets/imgs/background/bg" + index + ".jpg)";
        // let imageBg:any;
        // if (this.calendarPerv_Next && this.calendarPerv_Next[1]) {
        //   var year  =  this.calendarPerv_Next[1].currentYear;
        //   var month  =  this.calendarPerv_Next[1].currentMonth;
        //   var type = 0;
        //   if (database&& database[year] && database[year][type] && database[year][type][month]) {
        //     imageBg = database[year][type][month];
        //   }
        //   // var index =
        // }
        // else{
        //   imageBg = "../assets/imgs/background/bg" + index + ".jpg";
        // }
        return imageBg;
    };
    HomePage.prototype.getActive = function (index) {
        if (index == this.currentMonth && !this.is_lunaCalendar) {
            return 'animation';
        }
        if (index == this.monthNames[this.calendarPerv_Next[1].lunarMonth - 1] && this.is_lunaCalendar) {
            return 'animation';
        }
        return '';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */])
    ], HomePage.prototype, "slides", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle class="menu-button">\n      <ion-icon name="menu"></ion-icon>\n    </button>  	\n    <ion-title>\n      <img class="logo-header" alt="logo" height="40" src="../assets/imgs/logo-header.png" > \n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addEvent()"  class="add-button">\n        <ion-icon name="md-add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<div class="BG-image-view">\n	<div *ngFor="let month of monthNames; let i = index; trackBy: customTrackBy" class="BG-image-animation BG-image {{getActive(month)}}" [style.backgroundImage]="background_img[i]" ></div>\n</div>	\n\n<ion-content class="ion-content no-scroll">	\n	<div class="month-count">\n		<img [src]="month_count" *ngIf="month_count">\n	</div>\n	<div class="calendar-view">\n		<div class="blur-filter">\n			<div class="background-filter" [style.backgroundImage]="calendarPerv_Next?background_img[calendarPerv_Next[1].currentMonth]:background_img[0]" *ngIf="!is_lunaCalendar && loading"></div>\n\n			<div class="background-filter" [style.backgroundImage]="calendarPerv_Next?background_img[calendarPerv_Next[1].lunarMonth - 1]:background_img[0]" *ngIf="is_lunaCalendar && loading"></div>\n		  	<div class="background-shadow">\n			  <div class="calendar-header" *ngIf="loading">\n			    <ion-row class="calendar-month">\n			      <ion-col col-2 (click)="goToLastMonth()"><ion-icon name="ios-arrow-back"></ion-icon></ion-col>\n						<ion-col col-8 *ngIf="!is_lunaCalendar">{{currentMonth | translate}} / {{currentYear}}</ion-col>\n						<ion-col col-8 *ngIf="is_lunaCalendar">{{monthLunaNames[calendarPerv_Next[1].lunarMonth - 1] | translate}} / {{calendarPerv_Next[1].lunarYear}}</ion-col>\n			      <ion-col col-2 (click)="goToNextMonth()"><ion-icon name="ios-arrow-forward"></ion-icon></ion-col>\n			    </ion-row>\n				</div>\n			  <div class="calendar-body-slide">\n					<ion-slides (ionSlideDidChange)="slideChanged()">\n						<ion-slide *ngFor="let calendar_item of calendarPerv_Next; let j = index">\n							<div class="calendar-body" *ngIf="loading">\n								<ion-grid>\n									<ion-row class="calendar-weekday">\n										<ion-col *ngFor="let dayname of dayNames">{{dayname | translate}}</ion-col>\n									</ion-row>\n									<ion-row class="calendar-date">\n										<ion-col col-1 *ngFor="let lastDay of calendar_item.daysInLastMonth" class="last-month" (click)="goToLastMonth()"></ion-col>\n										<ion-col col-1 *ngFor="let day of calendar_item.daysInThisMonth ; let i = index; trackBy: customTrackBy" (click)="selectDate(day,calendar_item)">\n											<span class="currentDate t{{calendar_item.daysLunarInThisMonth[i][1]}} event-{{checkEvent(day,calendar_item.currentMonth,calendar_item.currentYear,j-1)}}" \n												*ngIf="(\n														(is_lunaCalendar && day == calendar_item.lunarDate && LunaMonth == calendar_item.lunarMonth && LunaYear == calendar_item.lunarYear) || \n														(!is_lunaCalendar && dayday === day && month === calendar_item.currentMonth && year === calendar_item.currentYear)\n													); \n													else otherDate\n												">\n												<span class="n-day">{{day}}</span> \n												<span class="lunar-day">{{calendar_item.daysLunarInThisMonth[i][0]}}</span>\n											</span>										\n											<ng-template #otherDate class="otherDate">\n												<span class="otherDate t{{calendar_item.daysLunarInThisMonth[i][1]}} event-{{checkEvent(day,calendar_item.currentMonth,calendar_item.currentYear,j-1)}}">\n												<span class="n-day">{{day}}</span> <span class="lunar-day">{{calendar_item.daysLunarInThisMonth[i][0]}}</span></span>\n												<!-- <br><div class="event-bullet" *ngIf="checkEvent(day)"></div> -->\n											</ng-template>\n										</ion-col>\n										<ion-col col-1 *ngFor="let nextDay of calendar_item.daysInNextMonth" class="next-month" (click)="goToNextMonth()"></ion-col>\n									</ion-row>\n								</ion-grid>\n							</div>\n						</ion-slide>\n					</ion-slides>\n\n			  </div>\n		    </div>\n		</div>\n	</div>\n	\n</ion-content>\n<img class="font-bg" src="../assets/imgs/font-bg.png">\n<svg class=\'svgfilter\' version="1.1" xmlns="http://www.w3.org/2000/svg">\n  <filter id="svgfilter" class="svgfilter-item">\n    <feGaussianBlur stdDeviation="2" />\n		<!-- comment out feComponentTransfer to remove the darkness -->\n    <feComponentTransfer>\n        <feFuncR type="linear" slope="0.9"/>\n        <feFuncG type="linear" slope="0.9"/>\n        <feFuncB type="linear" slope="0.9"/>\n    </feComponentTransfer>\n  </filter>\n</svg>'/*ion-inline-end:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_calendar__["a" /* Calendar */],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_9__providers_setting_setting_service__["a" /* SettingService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[355]);
//# sourceMappingURL=main.js.map