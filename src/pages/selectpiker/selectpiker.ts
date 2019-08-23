import { Component,ViewChild} from '@angular/core';
import { ViewController,Slides ,NavParams,Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

import { TranslateService } from '@ngx-translate/core';


declare var getLunarDate;
declare var mobiscroll;
declare var getMaxDayOfMonth;


@Component({
  selector: 'page-selectpiker',
  templateUrl: 'selectpiker.html'
})
export class SelectpikerPage {
	@ViewChild(Slides) slides: Slides;   
  ngAfterViewInit() {
    this.slides.centeredSlides = false;
  }
    type:any; 
    startDate:any;
    endDate:any;
    myDate:any;
    myTime:any;
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
    allDay: any = false;



    calendarPerv_Next: any;
    is_slide: any;

    is_lunaCalendar: any = false;

    callback:any;
    instance:any;

  constructor(
    public translate: TranslateService,
    private calendar: Calendar,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public plt: Platform
    ) {    

      mobiscroll.settings = {
          lang: 'en',        
          theme: 'ios' ,
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

      this.translate.get('cancel').subscribe(
        value => {
          mobiscroll.settings.buttons[1].text = value;
        }
      )    

      this.translate.get('Set').subscribe(
        value => {
          mobiscroll.settings.buttons[0].text = value;
        }
      )              

      // this.instance = mobiscroll.time('#time-hms', {
      //     timeFormat: 'HH:ii:ss',
      //     headerText: 'Time: {value}',
      //     onInit: function (event, inst) {
      //         inst.setVal(now, true);
      //     }
      // }); 


    // this.is_lunaCalendar = true;
    // console.log(this.navParams);
      
      let date = this.navParams.get('date');
      let time = this.navParams.get('time');      
      let lunaCalendar = this.navParams.get('lunaCalendar');
      let startDate = this.navParams.get('startDate');
      let endDate = this.navParams.get('endDate');
      let type = this.navParams.get('type');
      this.allDay = this.navParams.get('allDay');
      if (time) {
        this.myTime = time;
      } 
      else{
        this.myTime = time;
      } 
      var mytime = this.myTime.split(":");

      if (mytime[0].length == 1) {
        mytime[0] = "0"+mytime[0];
      }
      if (mytime[1].length == 1) {
        mytime[1] = "0"+mytime[1];
      }  

      this.myTime = mytime[0] +":"+mytime[1];    
      
      if (lunaCalendar) {
        this.is_lunaCalendar = lunaCalendar;
      }  

      if (type) {
        this.type = type;
      }                       

      if (date) {
        this.myDate = date;
      } 
      else{
        this.myDate = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDate(); 
      }  
      if (startDate) {
        this.startDate = startDate;
        if (this.type == "start") {
          this.myDate = startDate.date;
        }
      }  
      
      if (endDate ) {
        
        if (this.type == "end") {
          this.endDate = endDate;
          this.myDate = endDate.date;
        }        
      }      
      this.callback = this.navParams.get('callback');
      this.initView();         
      
      
  }

  ionViewWillEnter() {
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
        // headerText: 'Time: {value}',
    });
  }
  myTimeChange(data){
    this.myTime = data;
    // console.log(this.myTime);
    if (this.myDate && this.myTime) {
      let data ={
        date: this.myDate,
        time: this.myTime
      }
      this.callback(data).then( () => {  }); 
    }
    
  }
  initView(){
    console.log(this.myDate);
    if (this.myDate) {
      this.date = new Date(this.myDate);
    }
    else{
      this.date = new Date();
    }

    if(this.plt.is("ios")) //2019-3-14
    {
      if(this.myDate)
      {
        let dateSplit = this.myDate.split("-");
        this.date = new Date(dateSplit[0],(parseInt(dateSplit[1]) - 1),(parseInt(dateSplit[2]) + 1));
      }
      else
      {
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
  }

  initSlide(){
    this.calendarPerv_Next[0] = new Array();
    if (!this.is_lunaCalendar) {
      this.calendarPerv_Next[0].date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    }else{
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
    else{
      this.calendarPerv_Next[2].date = this.addLunarNextMonth(this.date);
    }
    this.getMonth(2);


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
    // if (this.date.getMonth() === new Date().getMonth()) {
    //   this.currentDate = new Date().getDate();
    // } else {
    //   this.currentDate = 999;
    // }
  }

  convertLunaCalendar(calendar_item,index) {
    calendar_item.currentMonth = calendar_item.date.getMonth();
    calendar_item.currentYear  = calendar_item.date.getFullYear();    

    // let lunarDate = getLunarDate(this.dayday, calendar_item.currentMonth + 1, calendar_item.currentYear);
    // let date = new Date(calendar_item.currentYear, calendar_item.currentMonth, this.dayday - lunarDate.day + 1);

    let lunarDate = getLunarDate(calendar_item.date.getDate(), calendar_item.currentMonth + 1, calendar_item.currentYear);
    let date = new Date(calendar_item.currentYear, calendar_item.currentMonth, calendar_item.date.getDate() - lunarDate.day + 1);

    // let lunarDate = getLunarDate(this.dayday, this.month + 1, this.year);


    
    // let date = new Date(this.year, this.month, this.dayday - lunarDate.day + 1);

    // let totalDays = this.calculateDayInLunarMonth(lunarDate.month);
    // let totalDays = getMaxDayOfMonth(calendar_item.currentMonth + 1 ,calendar_item.currentYear);
    let totalDays = getMaxDayOfMonth(calendar_item.date.getDate(), calendar_item.currentMonth  ,calendar_item.currentYear);
    if (index == 1) {

      // console.log(calendar_item.date.getDate());
      // console.log(calendar_item.date.getDay());
      // console.log(calendar_item.currentMonth);
      // console.log(totalDays);
    }
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

    if (index == 1) {
      // console.log(calendar_item);
    }
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

  loadEventThisMonth() {
    this.eventList = new Array();
    var startDate = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
    var endDate = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.calendar.listEventsInRange(startDate, endDate).then(
      (msg) => {
        msg.forEach(item => {
          
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
          this.eventList.push(item);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
 
  checkEvent(day,calendar_item) {

    var hasEvent = false;
      // var dateSelect = new Date(this.date.getFullYear(), this.date.getMonth() + dayPrev_Next, day);
      if (!this.is_lunaCalendar) {
        var dateSelect = this.date.getFullYear()+"-"+(calendar_item.currentMonth + 1)+"-"+day;
        
        if(dateSelect == this.myDate) {
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
      else{
        var myDay = calendar_item.daysLunarInThisMonth[day - 1][2];
        var mymonth = calendar_item.daysLunarInThisMonth[day - 1][3];
        var myyear = calendar_item.daysLunarInThisMonth[day - 1][4];
        var dateSelect = myyear+"-"+mymonth+"-"+myDay;
        if(dateSelect == this.myDate) {
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
  }

  selectDate(day,calendar_item) {
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
      this.myDate = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day;
    }
    else{
      var myDay = calendar_item.daysLunarInThisMonth[day - 1][2];
      var mymonth = calendar_item.daysLunarInThisMonth[day - 1][3];
      var myyear = calendar_item.daysLunarInThisMonth[day - 1][4];
      this.myDate = myyear+"-"+mymonth+"-"+myDay;
    } 

    let data ={
      date: this.myDate,
      time: this.myTime
    }
    this.callback(data).then( () => {  });
    // this.myDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, day);
  }

  saveEvent(){
    let data ={
      date: this.myDate,
      time: this.myTime
    }
    this.viewCtrl.dismiss(data);
  }

  closeEvent(){
    this.viewCtrl.dismiss();
  }  

  slideChanged() {
  	if (this.is_slide == true) {
  		this.is_slide = false;
  		return;
  	}
    let currentIndex = this.slides.getActiveIndex();
    this.is_slide = true;
    if (currentIndex == 0) {
      if (!this.is_lunaCalendar) {
      	this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
      }else{
        this.date = this.addLunarPrevMonth(this.date);
      }
    	this.getDaysOfMonth();
      this.initSlide();
      // this.loadEventThisMonth();
    }
    else{
      if (!this.is_lunaCalendar) {
	     this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
      }
      else{
        this.date = this.addLunarNextMonth(this.date);
      }
	    this.getDaysOfMonth();
      this.initSlide();
      // this.loadEventThisMonth();
    }
    this.slides.slideTo(1, 0);
  } 
  addLunarNextMonth(date) {
    
      var dd = date.getDate();
      var mm = date.getMonth();
      var yy = date.getFullYear();

      let curen_lunar_date = getLunarDate(dd,mm + 1,yy);
      let MaxDayOfMonth = getMaxDayOfMonth(dd,mm,yy);
      let days = (MaxDayOfMonth - curen_lunar_date.day) + 1; 

      return new Date(date.getTime() + days*24*60*60*1000); 
  }

  addLunarPrevMonth(date) {
    
      var dd = date.getDate();
      var mm = date.getMonth();
      var yy = date.getFullYear();

      let curen_lunar_date = getLunarDate(dd,mm + 1,yy);
      let days = curen_lunar_date.day + 1; 

      return new Date(date.getTime() - days*24*60*60*1000); 
  }  

  customTrackBy(index: number, obj: any): any {
    return index;
  }  
  getBg(index){
    let imageBg = "url(../assets/imgs/background/bg"+index+".jpg)";
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
