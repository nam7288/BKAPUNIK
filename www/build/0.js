webpackJsonp([0],{

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuideModalPageModule", function() { return GuideModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__guide_modal__ = __webpack_require__(452);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GuideModalPageModule = /** @class */ (function () {
    function GuideModalPageModule() {
    }
    GuideModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__guide_modal__["a" /* GuideModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__guide_modal__["a" /* GuideModalPage */]),
            ],
        })
    ], GuideModalPageModule);
    return GuideModalPageModule;
}());

//# sourceMappingURL=guide-modal.module.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuideModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// declare var cordova:any;
var GuideModalPage = /** @class */ (function () {
    function GuideModalPage(navCtrl, alertCtrl, navParams, viewCtrl, translate) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.translate = translate;
        this.stepNumber = 0;
        this.guideImage = "../assets/imgs/step/" + this.stepNumber + ".jpg";
        this.textArray = ["<u>Bước 1</u> : Vào phần <b>Photos</b>", "<u>Bước 2</u> : Chọn hình cần làm <b>Wallpaper</b>", "<u>Bước 3</u> : Chọn biểu tượng <b>Set</b] hình ảnh", "<u>Bước 4</u> : Chọn <b>Use as Wallpaper</b]", "<u>Bước 5</u> : Nhấn button <b>Set</b] để thực thi hiệu lực"];
    }
    GuideModalPage.prototype.ionViewDidLoad = function () {
    };
    GuideModalPage.prototype.close = function () {
        if (this.clickInside == false) {
            this.viewCtrl.dismiss();
        }
        this.clickInside = false;
    };
    GuideModalPage.prototype.contentClick = function () {
        //this.viewCtrl.dismiss();
        this.clickInside = true;
        // if(this.stepNumber < 4)
        // {
        // 	this.stepNumber++;
        // 	this.guideImage = "../assets/imgs/step/"+this.stepNumber+".jpg";
        // 	document.getElementById("text-content").innerHTML = this.textArray[this.stepNumber];
        // }
    };
    GuideModalPage.prototype.swipe = function (contentView) {
        if (contentView.direction === 2 && this.stepNumber < 4) {
            this.stepNumber++;
        }
        // Prev
        if (contentView.direction === 4 && this.stepNumber > 0) {
            this.stepNumber--;
        }
        this.guideImage = "../assets/imgs/step/" + this.stepNumber + ".jpg";
        document.getElementById("text-content").innerHTML = this.textArray[this.stepNumber];
    };
    GuideModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-guide-modal',template:/*ion-inline-start:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\guide-modal\guide-modal.html"*/'<ion-content  class=\'content no-scroll\' (click)=close()>	\n	<div class="content-view" (click)=contentClick()  (swipe)="swipe($event)">\n	<ion-icon class=\'left-arrow\' name="arrow-back"></ion-icon>\n	<div class="title">Hướng dẫn cài đặt hình nền cho IOS</div>\n	<div class="guide-content">\n		<img id="guide-img" class="guide-img" src={{guideImage}}>\n	</div>\n	<div id="text-content" class="text-content"><u>Bước 1</u> : Vào phần <b>Photos</b></div>\n	</div>\n	<ion-icon class=\'right-arrow\' name="arrow-forward"></ion-icon>\n</ion-content>'/*ion-inline-end:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\guide-modal\guide-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]])
    ], GuideModalPage);
    return GuideModalPage;
}());

//# sourceMappingURL=guide-modal.js.map

/***/ })

});
//# sourceMappingURL=0.js.map