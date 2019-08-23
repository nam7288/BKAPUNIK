import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { DayModalPage } from '../day-modal/day-modal';
import { Calendar } from '@ionic-native/calendar';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
declare var getLunarDate;
declare var configApp;
declare var database;

/**
 * Generated class for the WeekViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-week-view',
  templateUrl: 'week-view.html',
})
export class WeekViewPage {
	@ViewChild(Slides) slides: Slides;
  ngAfterViewInit() {
    // this.slides.freeMode = true;
    this.slides.centeredSlides = false;
    // this.slides.slideTo(1, 0);
  }	
  imageBg: any;
  imageBgChange: any;
  bgAnimateClass: any;

  year: any;
  date: any;
  daysInThisMonth: any;
  daysLunarInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  monthLunaNames: string[];
  dayNames: string[];
  currentMonth: any; 
  currentLunaMonth: any; 
  currentYear: any;
  currentLunaYear: any;
  currentDate: any;
  currentWeek: number;
  eventList: any;
  selectedEvent: any;
  isSelected: any;
  is_slide:any;

  weeksInThisMonth: any;
  indexOfWeek: any;
  weekCount: any;

  daysInThisWeek: any;
  daysInLastWeek: any;
  daysInNextWeek: any;
  currentMonthMonth: any;

  is_lunaCalendar: any = false;

  background_img:any;
  month_count:any;  

  loading: any = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar,private domSanitizer: DomSanitizer,public plt: Platform,) {    
    this.is_lunaCalendar = configApp.is_lunaCalendar; 
    // this.initView();
  }

  ionViewDidLoad() {
    this.initView();
    let timmrr = 0;
    if (this.plt.is('android')) { 
      timmrr = 0;
    }    
    setTimeout( () => {
        // this.initView(); 
        this.loading = true; 
        this.loadEventThisMonth();  
        // this.setSlide();
    }, timmrr);
  } 
  ionViewWillEnter() {
  	this.slides.slideTo(1, 0);
  }
  initView(){
    this.date = new Date();
    this.year = this.date.getFullYear();  
    this.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.monthLunaNames = ["thang_gieng", "thang_2", "thang_3", "thang_4", "thang_5", "thang_6", "thang_7", "thang_8", "thang_9", "thang_10", "thang_11", "thang_chap"];
    this.dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];   
    this.initDay();
    this.is_slide = true;    
  }
  initDay(){
  	this.daysInThisWeek = new Array();
  	this.daysInLastWeek = new Array();
  	this.daysInNextWeek = new Array();
    this.indexOfWeek = 0;
    this.weekCount = 0;  	
  	this.getDaysOfMonth(); 
    this.loadEventThisMonth();
  	let mydate: number = this.date.getDate();
  	let mytotaldate: number = this.daysInLastMonth.length;
  	let myIndex: number = Math.floor((mydate + mytotaldate)/7);
  	this.currentWeek = myIndex;
  	if (this.currentWeek * 7 < (this.date.getDate() + this.daysInLastMonth.length)) {
  		this.currentWeek +=1;
  	}

  	this.daysInLastWeek = this.weeksInThisMonth[this.currentWeek - 1];
  	this.daysInThisWeek = this.weeksInThisMonth[this.currentWeek];
  	this.daysInNextWeek = this.weeksInThisMonth[this.currentWeek + 1];
  	
 
  	for (var i = 0; i < this.daysInLastWeek.length; i++) {
      var day = this.daysInLastWeek[i].day;
      var month = this.date.getMonth()+1 + this.daysInLastWeek[i].prevOrNextMonth;
      var year = this.date.getFullYear();
      var lunarDays = getLunarDate(day,month,year);
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
      var month = this.date.getMonth()+1 + this.daysInThisWeek[i].prevOrNextMonth;
      var year = this.date.getFullYear();
      var lunarDays = getLunarDate(day,month,year);
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
      var month = this.date.getMonth()+1 + this.daysInNextWeek[i].prevOrNextMonth;
      var year = this.date.getFullYear();
      var lunarDays = getLunarDate(day,month,year);
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
  }

  setBGDatabase(){
      var year  =  this.currentYear;
      var month  =  this.currentMonthMonth;
      var type = 0;    

      if (!this.background_img || month == 12 || month == 1) {
        if (!this.background_img) {
          this.background_img = new Array();
        }

        for (var i = 0; i < 12; i++) {
          if (database&& database[year] && database[year][type] && database[year][type][i]) {
            this.background_img[i] = this.domSanitizer.bypassSecurityTrustStyle('url('+database[year][type][i]+')');
          }
          else if (database&& database["default"] && database["default"][type] && database["default"][type][i]) {
            this.background_img[i] = this.domSanitizer.bypassSecurityTrustResourceUrl('url('+database["default"][type][i]+')');
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
        var lunarYear = this.currentLunaYear;
        var lunarMonth = this.currentLunaMonth - 1;       
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

  getDaysOfMonth() {
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
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }



    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
      this.addWeek(i,-1);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();



    for (var j = 0; j < thisNumOfDays; j++) {
      this.daysInThisMonth.push(j+1);

      var day = j+1;

      this.addWeek(day,0);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    var indexLastday = 6-lastDayThisMonth;
    for (var k = 0; k < (6-lastDayThisMonth); k++) {
      this.daysInNextMonth.push(k+1);
      this.addWeek(k+1,1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var l = (7-lastDayThisMonth); l < ((7-lastDayThisMonth)+7); l++) {
        this.daysInNextMonth.push(l);
        this.addWeek(l,1);
      }
      indexLastday = ((7-lastDayThisMonth)+7);
    }

	for (var lnm = indexLastday ; lnm < indexLastday + 7; lnm++) {
		this.addWeek(lnm + 1,1);
	}

  } 

  addWeek(index,indexOfWeek){
 		
      if (this.indexOfWeek == 0) {
      	this.weeksInThisMonth[this.indexOfWeek] = new Array();
      	for (var j = 7 ; j >= 1; j--) {
      		this.weeksInThisMonth[this.indexOfWeek].push(
				{
					day: index - j,
					prevOrNextMonth:indexOfWeek
				}      			
      		);
      	}
      	this.indexOfWeek += 1;
      }

      if (this.weekCount == 0) {
      	this.weeksInThisMonth[this.indexOfWeek] = new Array();
      } 
		this.weeksInThisMonth[this.indexOfWeek].push(
			{
				day: index,
				prevOrNextMonth:indexOfWeek
			}      			
		);    
      this.weekCount += 1;
      if (this.weekCount >= 7) {
      	this.weekCount = 0;
      	this.indexOfWeek += 1;
      }
  }

  addEvent() {
    this.navCtrl.push(AddEventPage);
  }

  slideChanged() {
  	if (this.is_slide == true) {
  		this.is_slide = false;
  		return;
  	}
    let currentIndex = this.slides.getActiveIndex();
    this.is_slide = true;
    if (currentIndex == 0) {
    	this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 7);
    	this.initDay();
      
    }
    else{
	    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 7);
	    this.initDay();
    }
    this.slides.slideTo(1, 0);
  }  

  goToLastMonth() {
    this.slides.slidePrev(500, true);
  }

  goToNextMonth() {
    this.slides.slideNext(500, true);
  }

  selectDate(day) {
    this.isSelected = false;
    
    var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
    var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";
    var lunaDay = this.daysLunarInThisMonth[day - 1];
    let data = {
      day : day,
      month: this.date.getMonth()+1,
      year: this.date.getFullYear(),
      dateStart: thisDate1,
      dateEnd: thisDate2,
      lunaDay: lunaDay,
    };
    this.navCtrl.push(DayModalPage, {
      data: data,
    }); 
  }

  loadEventThisMonth() {
    this.eventList = new Array();
    if (!this.loading) {return;}
    if (this.plt.is('android')) { 
      var startDate = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
      var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    }
    else{
      var startDate = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
      var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);      
    }
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
          else{

          }
          // item.allDay                
          // this.printObject(item);
          this.eventList.push(item);
        });
        // alert(JSON.stringify(this.eventList));
      },
      (err) => {
        console.log(err);
      }
    );
  }



  checkEvent(day) {
    if (!this.loading) {return false;}
    var month = this.date.getMonth();
    var year = this.date.getFullYear();
    var day = day.day;
    var hasEvent = false;
    if (this.plt.is('android')) { 
     let thisDate1 = new Date(year+"-"+(month+1)+"-"+day+" 00:00:00").getTime();
     let thisDate2 = new Date(year+"-"+(month+1)+"-"+day+" 23:59:59").getTime();
      this.eventList.forEach(event => {
        if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
          // hasEvent = true;
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
      // let thisDate1 = year+"-"+(month+1)+"-"+day+" 00:00:00";
      // let thisDate2 = year+"-"+(month+1)+"-"+day+" 23:59:59";
       let thisDate1 = new Date(`${month+1}/${day}/${year} 00:00:00`).getTime();
       let thisDate2 = new Date(`${month+1}/${day}/${year} 23:59:59`).getTime();        
      this.eventList.forEach(event => {
        if(((event.timer_startDate >= thisDate1) && (event.timer_startDate <= thisDate2)) || ((event.timer_endDate >= thisDate1) && (event.timer_endDate <= thisDate2))) {
          hasEvent = true;
          // alert(hasEvent);
        }
      });      
    }    
    return hasEvent;
  }    

  getBg(index){
    let imageBg = "url(../assets/imgs/background/bg"+index+".jpg)";
    return imageBg;
  }

  getActive(index){
    if (index == this.currentMonth) {
      return 'animation';
    }
    return '';
  }  

}
