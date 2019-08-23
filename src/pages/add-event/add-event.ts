import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController,Platform } from 'ionic-angular';
import { Calendar, CalendarOptions } from '@ionic-native/calendar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TranslateService } from '@ngx-translate/core';
import { SelectpikerPage } from '../selectpiker/selectpiker';
import { SettingService } from "../../providers/setting/setting.service";

declare var getLunarDate;
declare var configApp;
declare var getMaxDayOfMonth;
declare var convertLunar2Solar;

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  @ViewChild('content') content : any ;
  //@ViewChild('b') locationInput: any;
  //@ViewChild(Content) content: Content;
  Event_saved_successfully:"";
  Event_update_successfully:"";
  Event_date_error:"";
  failed_error:"";
  delete_event:"";
  title_error:"";
  start_date_error:"";
  end_date_error:"";
  delete_all_event:"";
  delete_this_event:"";
  delete_this_and_future_event:"";
  day_la_su_kien_lap_lai:"";
  is_lunaCalendar: any = false;
  cancel:"";
  ok:"";
  error_alert:"";  
  date:any;
  lunaStartDate: any;
  lunaEndDate: any;
  callback:any;
  data:any;
  event = {
    id: "",
    title: "",
    location: "",
    message: "",
    startDate: "" as any,
    endDate: "" as any,
    calendarType: 1,
    repeat: 0,
    alert: 0,
    allDay: false,
    firstReminderMinutesText:'',
    _id:"" as any,
  };
  

  
  constructor(
    public plt: Platform,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    private calendar: Calendar,
    public modalCtrl: ModalController,
    public localNotifications: LocalNotifications,
    public settingService: SettingService
  ) {
    this.is_lunaCalendar = configApp.is_lunaCalendar;
    this.translate.get('Event_saved_successfully').subscribe(
      value => {
        this.Event_saved_successfully = value;
      }
    )   
    this.translate.get('Event_update_successfully').subscribe(
      value => {
        this.Event_update_successfully = value;
      }
    )     
    this.translate.get('Event_date_error').subscribe(
      value => {
        this.Event_date_error = value;
      }
    )     
    this.translate.get('delete_event').subscribe(
      value => {
        this.delete_event = value;
      }
    ) 
    this.translate.get('delete_all_event').subscribe(
      value => {
        this.delete_all_event = value;
      }
    ) 
    this.translate.get('delete_this_event').subscribe(
      value => {
        this.delete_this_event = value;
      }
    ) 
    this.translate.get('delete_this_and_future_event').subscribe(
      value => {
        this.delete_this_and_future_event = value;
      }
    ) 
    this.translate.get('day_la_su_kien_lap_lai').subscribe(
      value => {
        this.day_la_su_kien_lap_lai = value;
      }
    )     
    this.translate.get('cancel').subscribe(
      value => {
        this.cancel = value;
      }
    )   
    this.translate.get('Failed').subscribe(
      value => {
        this.failed_error = value;
      }
    )   
    this.translate.get('ok').subscribe(
      value => {
        this.ok = value;
      }
    )   
    this.translate.get('error_alert').subscribe(
      value => {
        this.error_alert = value;
      }
    )
    this.translate.get('title_error').subscribe(
      value => {
        this.title_error = value;
      }
    )  
    this.translate.get('start_date_error').subscribe(
      value => {
        this.start_date_error = value;
      }
    )  
    this.translate.get('end_date_error').subscribe(
      value => {
        this.end_date_error = value;
      }
    )  

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
    else{
      var hour = this.date.getHours();
      var minus = this.date.getMinutes();
        let h = hour;
        let m = minus;
        if (hour < 10) {
         h = "0"+ hour;
        }
        if (minus < 10) {
         m = "0"+ minus;
        }      
        var time = h + ':' + m;    
        this.event.startDate = {};
        this.event.startDate.time = h + ':' + m;
        if (this.data && this.data.date) {
          this.event.startDate.date = this.data.date;
        }else{
          this.event.startDate.date = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
        }
        

        this.event.endDate = {};
        this.event.endDate.date = this.event.startDate.date;
        let hourend = parseInt(hour) + 1;

        if (hour >= 24) {
          hour = 23;
        }
        if(hourend < 10){
          this.event.endDate.time = "0"+ hourend +":"+m; 
        }
        else{
          this.event.endDate.time = hourend +":"+m; 
        }
        var timeA = this.event.startDate.date.split("-");
        var timeB = this.event.startDate.time.split(":");   
        var SD = new Date(`${timeA[1]}/${timeA[2]}/${timeA[0]} ${timeB[0]}:${timeB[1]}:00`);
        this.lunaStartDate = getLunarDate(SD.getDate(), SD.getMonth() + 1, SD.getFullYear());

        var timeC = this.event.endDate.date.split("-");
        var timeD = this.event.endDate.time.split(":");
        var ED = new Date(`${timeC[1]}/${timeC[2]}/${timeC[0]} ${timeD[0]}:${timeD[1]}:00`);
        this.lunaEndDate = getLunarDate(ED.getDate(), ED.getMonth() + 1, ED.getFullYear());           

    }  
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddEventPage');
  }

  initData(){
    // alert(JSON.stringify(this.data)); // check data từ calendar
    this.event.id = this.data.data.id;
    this.event._id = this.data.data._id;
    this.event.title = this.data.data.title;
    this.event.location = this.data.data.location;
    this.event.message = this.data.data.message;

    if (this.event.id) {
      this.settingService.getEventById(this.event.id).then((data_local: any) => {
        if (data_local && data_local.length > 0) {
          this.event.calendarType = 1;
          this.event._id = data_local[0]._id
          this.data.data._id = data_local[0]._id;
        }
      })
      .catch(error => {
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
      else{
        this.event.startDate.time = this.data.data.time;
      }
      var timeA = this.event.startDate.date.split("-");
      var timeB = this.event.startDate.time.split(":");   
      var SD = new Date(`${timeA[1]}/${timeA[2]}/${timeA[0]} ${timeB[0]}:${timeB[1]}:00`);
      let mydate = SD;         
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
      var ED = new Date(`${timeC[1]}/${timeC[2]}/${timeC[0]} ${timeD[0]}:${timeD[1]}:00`);

      let mydate = ED;
      this.lunaEndDate = getLunarDate(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear());          
      
    }
    // alert(JSON.stringify(this.data));
   // this.event.repeat = this.data.data.repeat;
   this.event.repeat = 0;
    this.event.alert = this.data.data.alert;
    this.event.allDay = this.data.data.allDay;
    if (this.event.endDate.time == "00:00"|| this.event.startDate.time == "00:00") {
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

    if (this.data.data.reminder){
        if(this.data.data.reminder == 0){
          this.event.alert = 0;
        }
        if(this.data.data.reminder == 15){
          this.event.alert = 1;
        }
        if(this.data.data.reminder == 30){
          this.event.alert = 2;
        }
        if(this.data.data.reminder == 60){
          this.event.alert = 3;
        }
        if(this.data.data.reminder == 120){
          this.event.alert = 4;
        }
        if(this.data.data.reminder == 1440){
          this.event.alert = 5;
        }   
        if(this.data.data.reminder == 2880){
          this.event.alert = 6;
        }                                                    
    }
    else{
      this.event.alert = 0;
    }

        
  }
  changeAllday(ev){
    if (this.event.startDate && this.event.endDate) {
      if (this.plt.is('ios')) {
        if (this.event.allDay) {
          this.event.startDate.time = "00:00";
          this.event.endDate.time = "23:59";
        }else{
              let h = this.date.getHours().toString();
              if (this.date.getHours() < 10) {
                h = ("0" + this.date.getHours());
              };

              let m = this.date.getMinutes().toString();
              let m_end = this.date.getMinutes() + 1;
              let h_end = h;
              if (this.date.getMinutes() < 10) {
                m = ("0" + m);
              };    
              if (this.date.getMinutes() < 10) {
                m = ("0" + m);
              }; 

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
    else{
      this.event.startDate = {};
      this.event.endDate = {};
      this.event.startDate.time = "00:00";
      this.event.endDate.time = "00:00";
      // this.event.endDate.time = "23:59";      
    }
  }
  openCalendarModal(type) {
    let data = {
      date: this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDate(),
      time: this.date.getHours() + ":" + this.date.getMinutes(),
      lunaCalendar: this.event.calendarType == 1,
      startDate: this.event.startDate,
      endDate: this.event.endDate,
      allDay: this.event.allDay,
      type: type,
      callback:this.getDataStart,
    }
    if (type == 'start') {
      data.callback = this.getDataStart; 
      if (this.event && this.event.startDate) {
        var splitDate = this.event.startDate.date.split("-");
        if(parseInt(splitDate[1]) < 10)
        {
          splitDate[1] = parseInt(splitDate[1]);
        }
        if(parseInt(splitDate[2]) < 10)
        {
          splitDate[2] = parseInt(splitDate[2]);
        } 

        this.event.startDate.date = splitDate[0]+"-"+splitDate[1]+"-"+splitDate[2];


        data.date = this.event.startDate.date;
        // alert(data.date);
      } 
      if (this.event && this.event.startDate) {
        data.time = this.event.startDate.time;
      }       
    }
    else{
      data.callback = this.getDataEnd;
      if (this.event && this.event.endDate) {
        var splitDate = this.event.endDate.date.split("-");
        if(parseInt(splitDate[1]) < 10)
        {
          splitDate[1] = parseInt(splitDate[1]);
        }
        if(parseInt(splitDate[2]) < 10)
        {
          splitDate[2] = parseInt(splitDate[2]);
        } 

        this.event.endDate.date = splitDate[0]+"-"+splitDate[1]+"-"+splitDate[2];

        data.date = this.event.endDate.date;
      } 
      if (this.event && this.event.endDate) {
        data.time = this.event.endDate.time;
      }         
    }
    let profileModal = this.modalCtrl.create(SelectpikerPage, data);
    profileModal.onDidDismiss(data => {
      // console.log(data);
      if (data) {
        this.scrollNext("2");
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
              this.event.startDate = data;
              var timeA = this.event.startDate.date.split("-");
              var timeB = this.event.startDate.time.split(":");

              var SD = new Date(`${timeA[1]}/${timeA[2]}/${timeA[0]} ${timeB[0]}:${timeB[1]}:00`);
              let mydate = SD;
              //alert(JSON.stringify(mydate));
              this.lunaStartDate = getLunarDate(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear());

              // if (!this.event.endDate) {
                this.event.endDate = {};
                this.event.endDate.date = data.date;
                // this.event.endDate.time = data.time;
                timeB[0] = parseInt(timeB[0]) + 1;
                timeB[1] = parseInt(timeB[1]);

                if (timeB[0] >= 24) {
                  timeB[0] = 23;
                }
                let h_end = timeB[0] +'';

                if (timeB[0] < 10) {
                  h_end = '0' + h_end;
                }

                let m_end = timeB[1] +'';

                if (timeB[1] < 10) {
                  m_end = '0' + m_end;
                }                
                
                this.event.endDate.time = h_end +":"+m_end; 

                var timeA = this.event.endDate.date.split("-");
                var timeB = this.event.endDate.time.split(":");
                var ED = new Date(`${timeA[1]}/${timeA[2]}/${timeA[0]} ${timeB[0]}:${timeB[1]}:00`);

                mydate = ED;
                this.lunaEndDate = getLunarDate(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear());

              // } 

          // }
        } else {
          if (this.event.startDate && this.validateTime(this.event.startDate,data)) {
            const alertSuccess = this.alertCtrl.create({

              title: this.error_alert,
              subTitle: this.Event_date_error,
              buttons: [this.ok]
            });
            this.event.endDate = "";
            alertSuccess.present();   
          }
          else{
              this.event.endDate = data;
              var timeA = this.event.endDate.date.split("-");
              var timeB = this.event.endDate.time.split(":");

              // var ED = new Date(timeA[0],timeA[1]-1,timeA[2],timeB[0],timeB[1],0);

              var ED = new Date(`${timeA[1]}/${timeA[2]}/${timeA[0]} ${timeB[0]}:${timeB[1]}:00`);

              let mydate = ED;
              //alert(JSON.stringify(mydate));
              //let mydate = new Date(this.event.endDate.date);
              this.lunaEndDate = getLunarDate(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear());         
          }        
          
        }
      }
    });
    profileModal.present();
  }

  validateTime(startDate,endDate){
    if (startDate && endDate) {
        var timeA = startDate.date.split("-");
        var timeB = startDate.time.split(":");
        var SD = new Date(`${timeA[1]}/${timeA[2]}/${timeA[0]} ${timeB[0]}:${timeB[1]}:00`);

        var timeC = endDate.date.split("-");
        var timeD = endDate.time.split(":");

        var ED = new Date(`${timeC[1]}/${timeC[2]}/${timeC[0]} ${timeD[0]}:${timeD[1]}:00`); 
        if (SD.getTime() > ED.getTime()) return true;
        else return false;       
    }
    return false;
  }

  getDataStart = data =>
  {
    return new Promise((resolve, reject) => {
          if (this.event.endDate && data.date > this.event.endDate.date) {
            // this.lunaStartDate = ''; 
            // this.event.startDate = {};
          }
          else{
            this.event.startDate = data;
            var timeA = this.event.startDate.date.split("-");
            var timeB = this.event.startDate.time.split(":");
            // var SD = new Date(timeA[0],timeA[1]-1,timeA[2],timeB[0],timeB[1],0);

            var SD = new Date(`${timeA[1]}/${timeA[2]}/${timeA[0]} ${timeB[0]}:${timeB[1]}:00`);
      
            //let mydate = new Date(this.event.startDate.date);

            let mydate = SD;
            //alert(JSON.stringify(mydate));
            this.lunaStartDate = getLunarDate(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear());
          }

      resolve();
      
    });
  }  

  getDataEnd = data =>
  {
    return new Promise((resolve, reject) => {
          if (this.event.startDate && data.date < this.event.startDate.date) {
            // this.lunaStartDate = ''; 
            // this.event.startDate = {};            
          }
          else{
            this.event.endDate = data;
            var timeA = this.event.endDate.date.split("-");
            var timeB = this.event.endDate.time.split(":");
            // var ED = new Date(timeA[0],timeA[1]-1,timeA[2],timeB[0],timeB[1],0);

            var ED = new Date(`${timeA[1]}/${timeA[2]}/${timeA[0]} ${timeB[0]}:${timeB[1]}:00`);

            let mydate = ED;
            //alert(JSON.stringify(mydate));
            //let mydate = new Date(this.event.endDate.date);
            this.lunaEndDate = getLunarDate(mydate.getDate(), mydate.getMonth() + 1, mydate.getFullYear());         
          }
          //this.locationInput.setFocus();

      resolve();
    });
  }   

  scrollNext(object)
  {
    var startDateInput = document.getElementById("startDateInput");
    var endDateInput = document.getElementById("endDateInput");
    var radioButton = document.getElementById("radioButton");
    var locationField = document.getElementById("location");
    var noteField = document.getElementById("note");

    if(object == "1")
    {
      let yOffset = endDateInput.offsetTop;
      var rect = radioButton.getBoundingClientRect();

      //this.content.scrollTo(0,yOffset.top,800);
       // alert(rect.top);
      // if(rect.top>100)
      {
        this.content.scrollTo(0,rect.top/2,800);
      }
    }
    else if(object == "2")
    {
      let yOffset = endDateInput.offsetTop;
      var rect = startDateInput.getBoundingClientRect();
      //this.content.scrollTo(0,yOffset.top,800);

      // if(rect.top>100)
      {
         this.content.scrollTo(0,rect.top/2,800);
      }
    }
    else if(object == "3")
    {
      let yOffset = endDateInput.offsetTop;
      //var rect = object.getBoundingClientRect();
      var rect = endDateInput.getBoundingClientRect();
      //this.content.scrollTo(0,yOffset,4000);
      // if(rect.top>100)
      {
        this.content.scrollTo(0,rect.top/2,800);
      } 
    }
    else if(object == "4")
    {
      let yOffset = endDateInput.offsetTop;
      //var rect = object.getBoundingClientRect();
      var rect = locationField.getBoundingClientRect();
      //this.content.scrollTo(0,yOffset,4000);
       // alert(rect.bottom);
      // if(rect.bottom>500)
      {
       this.content.scrollTo(0,rect.bottom/2+200,800);
      }
    }
    else if(object == "5")
    {
      let yOffset = endDateInput.offsetTop;
      //var rect = object.getBoundingClientRect();
      var rect = noteField.getBoundingClientRect();
      //this.content.scrollTo(0,yOffset,4000);
       // alert(rect.bottom);
      // if(rect.bottom>500)
      {
        this.content.scrollTo(0,rect.bottom/2+200,800);
      }
    }
  }

  scrollBottom()
  {
    this.content.scrollToBottom();
    // let dimensions = this.content.getContentDimensions();
    // this.content.scrollTo(0, dimensions.scrollBottom, 0);
    // this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  save() {

    if (this.validateEventData()) {
      let options: any = this.calendar.getCalendarOptions();
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
          let startDateSplit = this.event.startDate.date.split("-");
          let endDateSplit = this.event.endDate.date.split("-");
          if (this.event.startDate.date == this.event.endDate.date) {
            var date = new Date(startDateSplit[0],(parseInt(startDateSplit[1]) - 1),(parseInt(startDateSplit[2]) + 1));
            // alert(date);
            this.event.endDate.date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

            this.event.endDate.time = this.event.startDate.time;
            // alert(this.event.startDate.date);
          }
          else{
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
        var SD = new Date(`${this.event.startDate.date} ${this.event.startDate.time}:00`);
        var ED = new Date(`${this.event.endDate.date} ${this.event.endDate.time}:00`);
      }
      else{
        var dateStartString = this.event.startDate.date+"T"+this.event.startDate.time+":00";
        var timeA = this.event.startDate.date.split("-");
        var timeB = this.event.startDate.time.split(":");
        //var SD = new Date(dateStartString);
        var SD =  new Date(`${timeA[1]}/${timeA[2]}/${timeA[0]} ${timeB[0]}:${timeB[1]}:00`);
        // var SD = new Date(timeA[0],timeA[1]-1,timeA[2],timeB[0],timeB[1],0);
        // var SD = new Date(year, month, day, hours, minutes, seconds, milliseconds)
        var dateEndString = this.event.endDate.date+"T"+this.event.endDate.time+":00";
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

        var ED =  new Date(`${timeC[1]}/${timeC[2]}/${timeC[0]} ${timeD[0]}:${timeD[1]}:00`);
        // if (this.event.allDay == true) {          
        //   ED = new Date(`${timeC[1]}/${timeC[2]}/${timeC[0]} ${timeB[0]}:${timeB[1]}:00`);
        // }
        

        
        // var ED = new Date(timeC[0],timeC[1]-1,timeC[2],timeD[0],timeD[1],0);  
      }
      
      // if(SD < ED)
      if (!this.validateTime(this.event.startDate,this.event.endDate))
      {
        if (this.event.calendarType == 1 && this.event.repeat > 2) {
          this.settingService.saveEvent(this.event,SD,ED,'').then((data_local: any) => {
            this.addNotifications(data_local.insertId,this.event,SD,ED);
            if ((this.data && this.data.status == "edit") || this.data.status == "add") {
              this.callback(this.data).then( () => { this.navCtrl.pop() });
            }
            else{
              this.navCtrl.pop();
            }
          })
          .catch(error => {
              console.log(error);
          }); 
        }
        else{
          this.calendar.createEventWithOptions(
            this.event.title,
            this.event.location,
            this.event.message,
            SD,
            ED,
            options
          ).then(result => {
            let title = this.Event_saved_successfully;
            if (this.data.status == "edit") {
              title = this.Event_update_successfully
            }
            let alert = this.alertCtrl.create({
              title: title,
              buttons: [this.ok]
            });
            alert.present();
            if (this.event.calendarType == 1) this.settingService.saveEvent(this.event,SD,ED,result);
            if ((this.data && this.data.status == "edit") || this.data.status == "add") {
              this.callback(this.data).then( () => { this.navCtrl.pop() });
            }
            else{
              this.navCtrl.pop();
            }
            
          }, err => {
            let alert = this.alertCtrl.create({
              title: this.failed_error,
              subTitle: err,
              buttons: [this.ok]
            });
            alert.present();
          });
        }

      }
      else
      {
        const alertSuccess = this.alertCtrl.create({
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
  }

  moveFocus(nextElement)
  {
    nextElement.setFocus();
  }



  editEvent() {
    if (this.data && this.data.data && this.data.data.id) {
      let evt = this.data.data;

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
          window['plugins'].calendar.deleteEventById(evt.id, null ,function() {            
              root.save();
            },
            function() {
              console.log('error!');
            }          
          );

        }  
      }
      else{
        var startDate = evt.startDate.replace(/-/g, '\/');
        var endDate = evt.endDate.replace(/-/g, '\/');
        // var timeB = evt.startDate.split(":"); 
        // alert(startDate);
        // var SD = new Date(`${timeA[1]}/${timeA[2]}/${timeA[0]} ${timeB[0]}:${timeB[1]}:00`); 
        // var startDate = new Date(`${this.month}/${this.day}/${this.year} 00:00:00 AM`);
        // var endDate = new Date(`${this.month}/${this.day}/${this.year} 23:59:59 PM`);              
        this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(startDate), new Date(endDate)).then(
          (msg) => {
            this.save();
          },
          (err) => {
            console.log(err);
          }
        )
      }    
    }
    else{
      if (this.data.data._id) {
        this.settingService.deleteEvent(this.data.data._id).then((data_local: any) => {
            this.clearNotifications(this.data.data._id);
            this.save();
          })
          .catch(error => {
              console.log(error);
          }); 
      }
    }
  }

  deleteEvent(){
    if (this.data && this.data.data && this.data.data.id) {
      let evt = this.data.data;
      if (this.plt.is('android')) {
      var root = this;
      let repeat = this.event.repeat;
      if (repeat == -100) {
        let alert_pup = this.alertCtrl.create({
            message: this.delete_event,
            cssClass:'popup_delete',
            buttons: [
              {
                text: this.delete_all_event,
                handler: data => {
                    if (evt) {
                        this.deleteEventById(evt.id, null);
                    }
                }
              },
              {
                text: this.delete_this_and_future_event,
                handler: data => {
                    if (evt) {
                      // alert(JSON.stringify(this.data.data));
                      let date = (new Date(evt.startDate.replace(/\s/, 'T')));
                      
                      this.deleteEventById(evt.id, date);
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
                handler: data => {
                  console.log('Cancel clicked');
                }
              }
            ]
          });
        alert_pup.present();
      }
      else{
        let alert = this.alertCtrl.create({
            message: this.delete_event,
            cssClass:'popup_delete',
            buttons: [
              {
                text: this.cancel,
                role: 'cancel',
                handler: data => {
                }
              },
              {
                text: this.ok,
                handler: data => {
                    if (evt) {
                      this.deleteEventById(evt.id, null);
                      if (this.data.data._id) {
                        this.clearNotifications(this.data.data._id);
                        this.settingService.deleteEvent(this.data.data._id);
                      }
                    }
                }
              }
            ]
          });
        alert.present();
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
      else{

      var startDate = evt.startDate.replace(/-/g, '\/')
      var endDate = evt.endDate.replace(/-/g, '\/') 

      if(this.event.repeat)
      {
        let alertPopup = this.alertCtrl.create({
          message: this.day_la_su_kien_lap_lai,
          cssClass:'popup_delete',
          buttons: [
            {
              text: this.delete_this_event,
              handler: data => {
                evt.notes += "~0"; // ~0 : delete this event , ~1 : delete this and future event;
                this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(startDate), new Date(endDate)).then(
                  (msg) => {                
                      if ((this.data && this.data.status == "edit") || this.data.status == "add") {
                        this.callback(this.data).then( () => { this.navCtrl.pop() });
                      }
                      else{
                        this.navCtrl.pop();
                      }
                  },
                  (err) => {
                    console.log(err);
                  }
                )
              }
            },
            {
              text: this.delete_this_and_future_event,
              handler: data => {
                evt.notes += "~1"; // ~0 : delete this event , ~1 : delete this and future event;
                this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(startDate), new Date(endDate)).then(
                  (msg) => {
                      if (this.data.data._id) {
                        this.settingService.deleteEventById(this.data.data.id);
                      }                    
                      if ((this.data && this.data.status == "edit") || this.data.status == "add") {
                        this.callback(this.data).then( () => { this.navCtrl.pop() });
                      }
                      else{
                        this.navCtrl.pop();
                      }
                  },
                  (err) => {
                    console.log(err);
                  }
                )
              }
            },
            {  
              text: this.cancel,
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        alertPopup.present();
      }
      else
      {
        let alertPopup = this.alertCtrl.create({
          message: this.delete_event,
          cssClass:'popup_delete',
          buttons: [
            {
              // text: 'Chỉ xóa sự kiện này',
              text: this.ok,
              handler: data => {
                evt.notes += "~0"; // ~0 : delete this event , ~1 : delete this and future event;
                this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(startDate), new Date(endDate)).then(
                  (msg) => {
                      if (this.data.data._id) {
                        this.settingService.deleteEventById(this.data.data.id);
                      }                    
                      if ((this.data && this.data.status == "edit") || this.data.status == "add") {
                        this.callback(this.data).then( () => { this.navCtrl.pop() });
                      }
                      else{
                        this.navCtrl.pop();
                      }
                  },
                  (err) => {
                    console.log(err);
                  }
                )
              }
            },
            {  
              text: this.cancel,
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        alertPopup.present();
      }
      

         

        

      }    
    }
    else{
      if (this.data.data._id) {
        let alert = this.alertCtrl.create({
            message: this.delete_event,
            cssClass:'popup_delete',
            buttons: [
              {
                text: this.cancel,
                role: 'cancel',
                handler: data => {
                }
              },
              {
                text: this.ok,
                handler: data => {
                    this.settingService.deleteEvent(this.data.data._id).then((data_local: any) => {
                        this.clearNotifications(this.data.data._id);
                        if ((this.data && this.data.status == "edit") || this.data.status == "add") {
                          this.callback(this.data).then( () => { this.navCtrl.pop() });
                        }
                        else{
                          this.navCtrl.pop();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    }); 
                }
              }
            ]
          });
        alert.present();        
      }
    }
  }

  deleteEventById(id,fromTime){
      var root = this;
      window['plugins'].calendar.deleteEventById(id, fromTime ,function() {
        if ((root.data && root.data.status == "edit") || root.data.status == "add") {
          root.callback(root.data).then( () => { root.navCtrl.pop() });
        }
        else{
          root.navCtrl.pop();
        }
      },
      function() {
        console.log('error!');
      }          
      );
  }


  validateEventData() {
    let success = true;
    if (!this.event.title) {
      success = false;
      this.alertError(this.error_alert,this.title_error);
    }
    else if (!this.event.startDate) {
      success = false;
      this.alertError(this.error_alert,this.start_date_error);
    }
    else if (!this.event.endDate) {
      success = false;
      this.alertError(this.error_alert,this.end_date_error);
    }
    // if (!this.event.calendarType) {
    //   success = false;
    // }

    return success;
  }

  

  addNotifications(id,event,SD,ED) {
    // var startDate = new Date(this.event.startDate.replace(/\s/, 'T'));
    // var endDate = new Date(this.event.endDate.replace(/\s/, 'T')).toISOString();
    var list_noti = this.createNotiLunar(id,event,SD,ED);
    this.localNotifications.schedule(list_noti);
  }

  clearNotifications(id){
    var list_noti = new Array();
    for (var i = 0; i < 10; i++) {
      list_noti.push(id+""+i);
    }
    this.localNotifications.clear(list_noti);
  }

  createNotiLunar(id,event,startDate,endDate){
    var array = new Array();

    var startLunaDate = getLunarDate(startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear());
    var date = startDate;
    var reminder = 0;
    if (event.alert){
        if(event.alert == 1){
          reminder = 900000;
        }
        if(event.alert == 2){
          reminder = 1800000;
        }      
        if(event.alert == 3){
          reminder = 3600000;
        }                     
        if(event.alert == 4){
          reminder = 7200000;
        }   
        if(event.alert == 5){
          reminder = 86400000;
        }   
        if(event.alert == 6){
          reminder = 172800000;
        }                                                                                                                         
    }    
    for (var i = 0; i < 10; i++) {
      var obj ={
        id: id+""+i,
        title: event.title,
        text: event.message,
        trigger: { at: new Date(date.getTime() - reminder)  },
        // trigger: { every: { month: 10, day: 27, hour: 9, minute: 0 } }
        led: 'E51F20',
        sound: null,
        // icon: 'assets://imgs/air.png',
        smallIcon: 'res://icon',
        // smallIcon: 'file://assets/imgs/air.png',
        icon: 'file://assets/imgs/icon.png'        
      }
      array.push(obj);
      if (event.repeat == 3 || event.repeat == '3') {
        date = new Date(date.getTime() + (86400000 * getMaxDayOfMonth(date.getDate(),date.getMonth(),date.getFullYear())));
      }
      else if (event.repeat == 4 || event.repeat == '4') {
        startLunaDate.year = startLunaDate.year + 1;
        var solar = convertLunar2Solar(startLunaDate.day,startLunaDate.month,startLunaDate.year,0,7);
          // month/date/year
        date = new Date(`${solar[1]}/${solar[0]}/${solar[2]} ${event.startDate.time}:00`);
      }
      
    }
    return array;
  }

  alertError(title,subTitle){
    const alertSuccess = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [this.ok]
    });

    alertSuccess.present();   
  }

  reverseDate(date){
    var my_date = date.split("-").reverse();
    var day = my_date[0];
    if (day.length == 1) {
      day = "0" + day;
    }
    var month = my_date[1];
    if (month.length == 1) {
      month = "0" + month;
    }
    return  day + "-" + month + "-" +  my_date[2];  
    // return date.split("-").reverse().join('-');
    // this.event.startDateText = .valueText.split(/\//).reverse().join('/');
  }

  reverseLunarDate(date){
    var my_date = date.split("-");
    var day = my_date[0];
    if (day.length == 1) {
      day = "0" + day;
    }
    var month = my_date[1];
    if (month.length == 1) {
      month = "0" + month;
    }
    return  day + "-" + month + "-" +  my_date[2];      
  }

}
