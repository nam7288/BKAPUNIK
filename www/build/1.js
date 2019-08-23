webpackJsonp([1],{

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditEventPageModule", function() { return EditEventPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_event__ = __webpack_require__(451);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EditEventPageModule = /** @class */ (function () {
    function EditEventPageModule() {
    }
    EditEventPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__edit_event__["a" /* EditEventPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__edit_event__["a" /* EditEventPage */]),
            ],
        })
    ], EditEventPageModule);
    return EditEventPageModule;
}());

//# sourceMappingURL=edit-event.module.js.map

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_calendar__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditEventPage = /** @class */ (function () {
    function EditEventPage(alertCtrl, navCtrl, navParams, calendar, localNotifications) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.calendar = calendar;
        this.localNotifications = localNotifications;
        this.event = { title: "", location: "", message: "", startDate: "", endDate: "" };
        this.oldEvent = { title: "", location: "", message: "", startDate: "", endDate: "" };
        this.event = navParams.get("event");
        var startDate = new Date(navParams.get("event").startDate.replace(/\s/, 'T')).toISOString();
        var endDate = new Date(navParams.get("event").endDate.replace(/\s/, 'T')).toISOString();
        this.event.startDate = startDate;
        this.event.endDate = endDate;
        this.oldEvent = this.event;
    }
    EditEventPage.prototype.ionViewDidLoad = function () {
        console.log(this.event);
    };
    EditEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-edit-event',template:/*ion-inline-start:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\edit-event\edit-event.html"*/'<!--\n  Generated template for the EditEventPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Edit Event</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form (ngSubmit)="update()">\n    <ion-list>\n      <ion-item>\n        <ion-label floating>Title</ion-label>\n        <ion-input type="text" [(ngModel)]="event.title" name="event.title"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Location</ion-label>\n        <ion-input type="text" [(ngModel)]="event.location" name="event.location"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Notes</ion-label>\n        <ion-input type="text" [(ngModel)]="event.message" name="event.message"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Start Date</ion-label>\n        <ion-datetime displayFormat="DD MMM YYYY" pickerFormat="MM/DD/YYYY" [(ngModel)]="event.startDate" name="event.startDate"></ion-datetime>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>End Date</ion-label>\n        <ion-datetime displayFormat="DD MMM YYYY" pickerFormat="MM/DD/YYYY" [(ngModel)]="event.endDate" name="event.endDate"></ion-datetime>\n      </ion-item>\n      <ion-item>\n        <button ion-button type="submit" full round>Update</button>\n      </ion-item>\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"C:\xampp\htdocs\ecalendar-vietjet\src\pages\edit-event\edit-event.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_calendar__["a" /* Calendar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], EditEventPage);
    return EditEventPage;
}());

//# sourceMappingURL=edit-event.js.map

/***/ })

});
//# sourceMappingURL=1.js.map