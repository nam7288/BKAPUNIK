import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController,Platform } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { EditEventPage } from '../edit-event/edit-event';
import { Calendar } from '@ionic-native/calendar';
import { Slides } from 'ionic-angular';
import { DayModalPage } from '../day-modal/day-modal';

import { TranslateService } from '@ngx-translate/core';

import { AmlichService } from "../../providers/amlich.service";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettingService } from "../../providers/setting/setting.service";

declare var getLunarDate;
declare var configApp;
declare var database;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  ngAfterViewInit() {
    // this.slides.centeredSlides = false;
  }

  file_path : any;

  imageBg: any;
  imageBgChange: any;
  bgAnimateClass: any;

  year: any;
  month: any;
  dayday: any;
  date: any;
  monthNames: string[];
  monthLunaNames: string[];
  dayNames: string[];
  currentMonth: any = "January";
  currentYear: any;
  currentDate: any;
  eventList: any;
  selectedEvent: any;
  isSelected: any;

  currentLunaMonth: any;
  currentLunaYear: any;
  LunaMonth: any;
  LunaYear: any;

  db:any;

  calendarPerv_Next: any;
  is_slide: any;

  is_lunaCalendar: any = false;
  loading: any = true;
  background_img:any;
  month_count:any;

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    public translate: TranslateService,
    public navCtrl: NavController,
    private calendar: Calendar,
    private domSanitizer: DomSanitizer,
    public splashScreen: SplashScreen,
    public plt: Platform,
    public settingService: SettingService
  ) {

    
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
  ionViewDidLoad() {
    

    let TIME_IN_MS = 1000;
    let hideFooterTimeout = setTimeout( () => {
         this.splashScreen.hide();
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
  }

  ionViewWillEnter() {
    // this.splashScreen.hide();
    this.loadEventThisMonth();
    this.slides.slideTo(1, 0);  
  }
  ionViewDidLeave(){
    // this.loading = false; 
  }

  setSlide(){
    if (this.slides) {
      console.log(this.slides);
      this.slides.slideTo(1, 0);
    }
    else{
      setTimeout( () => {
        this.setSlide();  
      }, 400);
    }
  }

  initView() {
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
  }

  initSlide() {

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
    

  }

  setBGDatabase(){
      var year  =  this.calendarPerv_Next[1].currentYear;
      var month  =  this.calendarPerv_Next[1].currentMonth;
      var type = 0;    

      if (!this.background_img || month == 11 || month == 0) {
        if (!this.background_img) {
          this.background_img = new Array();
        }

        for (var i = 0; i < 12; i++) {
          if (database&& database[year] && database[year][type] && database[year][type][i]) {
            this.background_img[i] = this.domSanitizer.bypassSecurityTrustStyle('url('+database[year][type][i]+')');
          }
          else if (database&& database["default"] && database["default"][type] && database["default"][type][i]) {
            this.background_img[i] = this.domSanitizer.bypassSecurityTrustStyle('url('+database["default"][type][i]+')');
          }          
          else{
            this.background_img[i] = this.getBg(this.monthNames[i]);
          }
           
        }
      }

      if (!this.is_lunaCalendar) {
        if (database&& database[year] && database[year][1] && database[year][1][month]) {
          this.month_count = this.domSanitizer.bypassSecurityTrustResourceUrl(database[year][1][month]);
        }
        else if (database&& database["default"] && database["default"][1] && database["default"][1][month]) {
          this.month_count = this.domSanitizer.bypassSecurityTrustResourceUrl(database["default"][1][month]);
        }
        else{
          this.month_count = "../assets/imgs/month/"+(this.currentMonth?this.currentMonth:"bgApril")+".png"; 
        }  

      }else{
        var lunarYear = this.calendarPerv_Next[1].lunarYear;
        var lunarMonth = this.calendarPerv_Next[1].lunarMonth - 1;       
        if (database&& database[lunarYear] && database[lunarYear][1] && database[lunarYear][1][lunarMonth]) {
          this.month_count = this.domSanitizer.bypassSecurityTrustResourceUrl(database[lunarYear][1][lunarMonth]);
        }
        else if (database&& database["default"] && database["default"][1] && database["default"][1][lunarMonth]) {
          this.month_count = this.domSanitizer.bypassSecurityTrustResourceUrl(database["default"][1][lunarMonth]);
        }
        else{
          this.month_count = "../assets/imgs/month/"+(this.monthNames[lunarMonth])+".png"; 
        } 
      } 
  }

  getMonth(index) {
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
      this.convertLunaCalendar(this.calendarPerv_Next[index],index);
    }
  }

  getDaysOfMonth() {

    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
  }

  convertLunaCalendar(calendar_item,index) {
    calendar_item.currentMonth = calendar_item.date.getMonth();
    calendar_item.currentYear = calendar_item.date.getFullYear();
    let lunarDate = getLunarDate(this.dayday, calendar_item.currentMonth + 1, calendar_item.currentYear);
    let date = new Date(calendar_item.currentYear, calendar_item.currentMonth, this.dayday - lunarDate.day + 1);
    // let lunarDate = getLunarDate(this.dayday, this.month + 1, this.year);


    
    // let date = new Date(this.year, this.month, this.dayday - lunarDate.day + 1);

    let totalDays = this.calculateDayInLunarMonth(lunarDate.month);
    let firstDayInMonth = date.getDay();

    let dayInLastMonth = [];
    for (let i = 0; i < date.getDay(); i++) {
      dayInLastMonth.push(0);
    }

    let dayInMonth = [];
    let dayLunarInMonth = [];
    for (let i = 1; i <= totalDays; i++) {
      dayInMonth.push(i);

      let sonarDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i - 1);

      dayLunarInMonth.push([((sonarDate.getDate()) == 1 || i == 1) ? `${sonarDate.getDate()}/${sonarDate.getMonth() + 1}` : sonarDate.getDate(), firstDayInMonth % 7,sonarDate.getDate(),sonarDate.getMonth() + 1,sonarDate.getFullYear()]);
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
  }

  calculateDayInLunarMonth(month) {
    const daysInMonth = {
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
  }

  goToLastMonth() {
    this.slides.slidePrev(500, true);
  }

  goToNextMonth() {
    this.slides.slideNext(500, true);
  }

  addEvent() {
    this.navCtrl.push(AddEventPage);
  }

  loadEventThisMonth() {
    this.eventList = new Array();
    if (!this.loading) {return;}
    if (this.plt.is('android')) { 
      var startDate = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
      var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    }
    else{
      // var startDate = new Date(`${this.date.getMonth()- 1}/1/${this.date.getFullYear()}T00:00:00`);
      // var endDate = new Date(`${this.date.getMonth()+ 2}/0/${this.date.getFullYear()}T11:59:59`);
      var startDate = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
      var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);      
    }
    // alert(`${this.date.getMonth()- 1}/1/${this.date.getFullYear()}T00:00:00`);
    // alert(startDate);
    // alert(endDate);
    this.calendar.listEventsInRange(startDate, endDate).then(
      (msg) => {
        msg.forEach(item => {

          if (!item.startDate && item.dtstart) {
            item.startDate = item.dtstart;
          }
          if (!item.endDate && item.dtend) {
            item.endDate = item.dtend;
          }
          if (!item.location && item.eventLocation) {
            item.location = item.eventLocation;
          }

          if (this.plt.is('ios')) { 
            // alert("base :"+item.startDate);

            var timeArray = item.startDate.split(" ");
            var timeA = timeArray[0].split("-");
            var timeB = timeArray[1].split(":");
            var SD = new Date(`${timeA[1]}/${timeA[2]}/${timeA[0]} ${timeB[0]}:${timeB[1]}:00`);
            //alert(SD);
            item.timer_startDate = new Date(SD).getTime();
            
            var timeArray = item.endDate.split(" ");
            var timeC = timeArray[0].split("-");
            var timeD = timeArray[1].split(":");
            var ED = new Date(`${timeC[1]}/${timeC[2]}/${timeC[0]} ${timeD[0]}:${timeD[1]}:00`);          
            item.timer_endDate = new Date(ED).getTime();
          
          }

          // item.allDay                
          this.eventList.push(item);
        });

        for (var d = startDate; d <= endDate; ) {
          var g = new Date(d);
          d = new Date(d.getTime() + (86400000 * 10)); 
          this.settingService.getEventByDayRepeatMonthAndYear(g,d).then((data_local: any) => {
            // console.log(data_local);
            if (data_local && data_local.length > 0) {
                data_local.forEach(item => {

                  var timeArray = item.startDate.split(" ");
                  var timeA = timeArray[0].split("-");
                  var timeB = timeArray[1].split(":");
                  var SD = new Date(`${timeA[1]}/${timeA[2]}/${timeA[0]} ${timeB[0]}:${timeB[1]}:00`);
                  //alert(SD);
                  item.timer_startDate = new Date(SD).getTime();
                  
                  var timeArray = item.endDate.split(" ");
                  var timeC = timeArray[0].split("-");
                  var timeD = timeArray[1].split(":");
                  var ED = new Date(`${timeC[1]}/${timeC[2]}/${timeC[0]} ${timeD[0]}:${timeD[1]}:00`);      
                  item.timer_endDate = new Date(ED).getTime();


                    item.startDate = item.timer_startDate;


                    item.endDate = item.timer_endDate;



                  // item.allDay                
                  this.eventList.push(item);
                });
            }
            // console.log(this.eventList);
          })
          .catch(error => {
              console.log(error);
          });  
        }        
       
        // alert(JSON.stringify(this.eventList));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkEvent(day,month,year, dayPrev_Next) {
    if (!this.loading) {return false;}
    var hasEvent = false;
    // return hasEvent;
    // var mydate = new Date(this.date.getFullYear(), this.date.getMonth() + dayPrev_Next, day);

    // var thisDate1 = mydate.getFullYear()+"-"+(mydate.getMonth()+1)+"-"+day+" 00:00:00";
    // var thisDate2 = mydate.getFullYear()+"-"+(mydate.getMonth()+1)+"-"+day+" 23:59:59";

    // let thisDate1 = year+"-"+(month+1)+"-"+day+" 00:00:00";
    // let thisDate2 = year+"-"+(month+1)+"-"+day+" 23:59:59";
    if (this.plt.is('android')) { 
     let thisDate1 = new Date(year+"-"+(month+1)+"-"+day+" 00:00:00").getTime();
     let thisDate2 = new Date(year+"-"+(month+1)+"-"+day+" 23:59:59").getTime();
      this.eventList.forEach(event => {
        if((event.startDate >= thisDate1 && event.startDate <= thisDate2) || (event.endDate >= thisDate1 && event.endDate <= thisDate2)) {
            if (event.allDay || event.allday ) {
              if (!(event.endDate <= thisDate2)) {
                hasEvent = true;
              }
            }
            else{
              hasEvent = true;
            }
        }
        else if((event.startDate <= thisDate1 && event.endDate >= thisDate1) || (event.startDate <= thisDate2 && event.endDate >= thisDate2)) {
            if (event.allDay || event.allday ) {
              if (!(event.endDate <= thisDate2)) {
                hasEvent = true;
              }
            }
            else{
              hasEvent = true;
            }
        }

      });     
    }
    else{

       let thisDate1 = new Date(`${month+1}/${day}/${year} 00:00:00`).getTime();
       let thisDate2 = new Date(`${month+1}/${day}/${year} 23:59:59`).getTime();       
      this.eventList.forEach(event => {
        if(((event.timer_startDate >= thisDate1) && (event.timer_startDate <= thisDate2)) || ((event.timer_endDate >= thisDate1) && (event.timer_endDate <= thisDate2))) {
          hasEvent = true;
          // alert(hasEvent);
        }
        else if((event.startDate <= thisDate1 && event.endDate >= thisDate1) || (event.startDate <= thisDate2 && event.endDate >= thisDate2)) {
            if ((event.allDay || event.allday ) && event._id) {
              if (!(event.endDate <= thisDate2)) {
                hasEvent = true;
              }
            }
            else{
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
  }
 

  selectDate(day, calendar_item) {
    this.isSelected = false;
    if (!this.is_lunaCalendar) {
      var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
      var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
      var lunaDay = calendar_item.daysLunarInThisMonth[day - 1];
      let data = {
        day: day,
        month: this.date.getMonth() + 1,
        year: this.date.getFullYear(),
        dateStart: thisDate1,
        dateEnd: thisDate2,
        lunaDay: lunaDay,
      };
      this.navCtrl.push(DayModalPage, {
        data: data,
      });
    }
    else{
      // var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
      // var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
      var myDay = calendar_item.daysLunarInThisMonth[day - 1][2];
      var mymonth = calendar_item.daysLunarInThisMonth[day - 1][3];
      var myyear = calendar_item.daysLunarInThisMonth[day - 1][4];
      let lunaDay = [day,calendar_item.daysLunarInThisMonth[day - 1][1]];

      let data = {
        day: myDay,
        month: mymonth,
        year: myyear,
        lunaDay: lunaDay,
      };  
      this.navCtrl.push(DayModalPage, {
        data: data,
      });         
    }

    

  }

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

  slideChanged() {
    if (this.is_slide == true) {
      this.is_slide = false;
      return;
    }
    let currentIndex = this.slides.getActiveIndex();
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
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }
  getBg(index) {
    let imageBg = "url(../assets/imgs/background/bg" + index + ".jpg)";
    

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
  }

  getActive(index) {
    if (index == this.currentMonth && !this.is_lunaCalendar) {
      return 'animation';
    }
    if (index == this.monthNames[this.calendarPerv_Next[1].lunarMonth - 1] && this.is_lunaCalendar) {
      return 'animation';
    }    
    return '';
  }
}
