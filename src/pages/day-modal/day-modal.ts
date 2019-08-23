import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,Platform } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { EditEventPage } from '../edit-event/edit-event';
import { Calendar } from '@ionic-native/calendar';

import { AmlichService } from "../../providers/amlich.service";
import { AmlichModel } from "../../models/amlich.model";
import { EventModel } from "../../models/event.model";

import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from "../../providers/language.service";
import { LanguageModel } from "../../models/language.model";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SettingService } from "../../providers/setting/setting.service";
import 'rxjs/add/operator/map';
declare var database;
declare var configApp;


@IonicPage()
@Component({
  selector: 'page-day-modal',
  templateUrl: 'day-modal.html',
})
export class DayModalPage {
  langguage:any;
  monthNames: string[];
  flowerNames: string[];
  monthNames_day: string[];
  data: any;
  day: any;
  month: any;
  year: any;
  date: any;
  background_img:any;

  currentDate: any;

  //canChiHour: any;
  dayOfWeek: any;
  hour: any;
  minus: any;
  time: any;

  ngayAm: any;
  thangAm: any;

  gioCanChi: any;
  ngayCanChi: any;
  thangCanChi: any;

  // backgroundImage:any;
  dayImage: any;
  flowerImage: any;
  jd: any;

  alldaytext:"";

  eventList: any;
  events: Array<EventModel> = new Array<EventModel>();

  flowerName: any;
  gioHoangDao: any;

  titleData: any;
  ApiRouter: string;

  constructor(public plt: Platform,public navCtrl: NavController, private calendar: Calendar, private navParams: NavParams, public viewCtrl: ViewController, public AmlichService: AmlichService, public translate: TranslateService,
    public languageService: LanguageService,
    public settingService: SettingService,
    private domSanitizer: DomSanitizer,
    public http: Http) {

      this.ReinitView();

  }
  ReinitView(){
    this.ApiRouter = configApp.ApiRouter ;
    this.monthNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    this.monthNames_day = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.flowerNames = ["Flower1", "Flower2", "Flower3", "Flower4", "Flower5", "Flower6", "Flower7", "Flower8", "Flower9", "Flower10", "Flower11", "Flower12"];
    this.data = this.navParams.get('data');
    this.date = new Date();
    this.hour = this.date.getHours();
    this.minus = this.date.getMinutes();
      let h = this.hour;
      let m = this.minus;
      if (this.hour < 10) {
       h = "0"+ this.hour;
      }
      if (this.minus < 10) {
       m = "0"+ this.minus;
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

    this.translate.get('allday').subscribe(
      value => {
        this.alldaytext = value;
      }
    )
    this.translate.get('lang').subscribe(
      value => {
        this.langguage = value;
      }
    )    

    this.currentDate = "THÁNG " + this.month + " NĂM " + this.year;

    this.initView();
    this.startTimer();    
  }

  getHttpData(){
    // var headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    // const requestOptions = new RequestOptions({ headers: headers });
    var my_device = this.plt.is('ios')?"ios":"android";    
    // let postData = {
    //   year:this.year,
    //   month:this.month,
    //   device:my_device
    // }        
    this.http.get(this.ApiRouter + 'api/day_info?year='+this.year+'&month='+this.month+'&device='+my_device).map(res => res.json()).subscribe(data => {
        if (data && data.result  && data.result.meta) {
          if (this.langguage == "vn") {
            this.titleData = data.result.meta.title;
          }
          else{
            this.titleData = data.result.meta.title_en;
          }
          // console.log(this.titleData);
        } 
    });
  }
  initView() {
    var amlich = this.AmlichService.getAmlich(this.day, this.month, this.year);
    switch(amlich.DayOfWeek) {
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
        // code block
    }    
    // this.dayOfWeek = amlich.DayOfWeek;
    this.dayOfWeek = this.dayOfWeek+"day";
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

    if(this.langguage == "en")
    {
      this.ngayCanChi = this.xoa_dau(this.ngayCanChi);
      this.thangCanChi = this.xoa_dau(this.thangCanChi);
      this.gioCanChi = this.xoa_dau(this.gioCanChi);
    }

    this.convertToCanChiHour();
    this.getDayEvent();
    this.setBGDatabase();
    this.getHttpData();
  }

  ionViewDidLoad() {
    // this.getDayEvent();
    // console.log('ionViewDidLoad AddEventPage');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    // this.viewCtrl.dismiss(this.event);
  }

  addEvent() {
    // this.navCtrl.push(AddEventPage);
    // var event = {};
    // event.startDate =  this.year + "-" + this.month + "-" + this.day;
    // event.endDate =  this.year + "-" + this.month + "-" + this.day;
    // item.endDate =  this.year + "-" + this.month + "-" + this.day;
    this.navCtrl.push(AddEventPage,{
      data:{
        status:"add",
        date:this.year + "-" + this.month + "-" + this.day
      },
      callback: this.getData
    });    
  }

  swipe(event) {
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
  }

  next(){
    this.date = new Date(this.year, this.month - 1, this.day - 1);
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();

    this.currentDate = "THÁNG " + this.month + " NĂM " + this.year;
    this.initView(); 
  }
  prev(){
    this.date = new Date(this.year, this.month - 1, this.day + 1);
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();

    this.currentDate = "THÁNG " + this.month + " NĂM " + this.year;
    this.initView();    
  }

  setBGDatabase(){
      var year  =  this.year;
      var month  =  this.month - 1;
      var type = 2;    
      if (!this.background_img || month == 12 || month == 1) {
        if (!this.background_img) {
          this.background_img = new Array();
        }
        for (var i = 0; i < 12; i++) {
          if (database&& database[year] && database[year][type] && database[year][type][i]) {
            this.background_img[i] = this.domSanitizer.bypassSecurityTrustResourceUrl(database[year][type][i]);
          }
          else if (database&& database["default"] && database["default"][type] && database["default"][type][i]) {
            this.background_img[i] = this.domSanitizer.bypassSecurityTrustResourceUrl(database["default"][type][i]);
          }          
          else{
            this.background_img[i] = this.getBg(this.monthNames[i]);
          }
           
        }
      }
  }  

  startTimer() {
    setInterval(() => {
      this.date = new Date();
      this.hour = this.date.getHours();
      this.minus = this.date.getMinutes();

      // this.time = this.hour + ':' + this.minus;
      let h = this.hour;
      let m = this.minus;
      if (this.hour < 10) {
       h = "0"+ this.hour;
      }
      if (this.minus < 10) {
       m = "0"+ this.minus;
      }      
      this.time = h + ':' + m;
      //alert('aaa');
      this.convertToCanChiHour();
    }, 15000);
  }

  getImageDay() {
    // this.backgroundImage = '../assets/imgs/daybackground/thang-'+this.month+'.jpg';    
    this.dayImage = '../assets/imgs/daybackground/day/' + this.day + '.png';
    this.flowerImage = '../assets/imgs/daybackground/day/Flower-' + this.month + '.png'
  }

  getBg(index) {
    // console.log(index);
    let imageBg = "../assets/imgs/daybackground/thang-" + index + ".jpg";
    // let imageBg = "url(../assets/imgs/background/bg"+index+".jpg)";
    // console.log(imageBg);
    return imageBg;
  }

  getActive(index) {
    if (index == this.month) {
      return 'animation';
    }
    return '';
  }

  convertToCanChiHour() {

    this.gioCanChi = this.AmlichService.getCanChiGio(this.hour, this.day, this.month, this.year, this.jd);
    if(this.langguage == "en")
    {
      this.gioCanChi = this.xoa_dau(this.gioCanChi);
    }
  }

  getDayEvent() {
    // this.eventList = new Array();
    // this.eventList.push(
    //   { time: '09:10', title: 'unde',startDate:'2019-1-19 9:10' },
    //   { time: '01:55', title: 'sdfdfs sdfsd erqwer ertert 245 2 3245 etwe rt wfdg qr q er' },
    //   { time: '13:50', title: 'sdfdfswerwrwerwerwerewrwerwerwerwerwrewrwerwewerwerwerwer' },
    //   { time: '12:50', title: 'sdfdfswerwrwerwerwerewrwerwerwerwerwrewrwerwewerwerwerwer' },
    //   { time: '10:50', title: 'sdfdfswerwrwerwerwerewrwerwerwerwerwrewrwerwewerwerwerwer' },
    //   { time: '13:50', title: 'sdfdfswerwrwerwerwerewrwerwerwerwerwrewrwerwewerwerwerwer' },
    // );

    if (this.plt.is('android')) { 
    var nowStartDate = new Date(`${this.month}/${this.day}/${this.year} 00:00:00`);
    var nowEndtDate = new Date(`${this.month}/${this.day}/${this.year} 23:59:59`);
      this.calendar.findEvent("","","",nowStartDate, nowEndtDate).then(
        (msg) => {
          this.eventList = new Array();
          console.log(msg);
          // msg = this.getUnique(msg,'title')
          msg.forEach(item => {
            if (!this.checkDuplicate(item,this.eventList)) {
              this.gEvent(item);
            }
            
          });
          this.getLocalEvent(nowStartDate,nowEndtDate);
          // this.eventList.sort(this.compare);
        },
        (err) => {
          console.log(err);
        }
      );    
    }
    else{
      var nowStartDate = new Date(`${this.month}/${this.day}/${this.year} 00:00:00`);
      var nowEndtDate = new Date(`${this.month}/${this.day}/${this.year} 23:59:59`);

      this.calendar.findEvent("","","",nowStartDate, nowEndtDate).then(
        (msg) => {

          this.eventList = new Array();
          msg.forEach(item => {
            this.gEvent(item);
          });
          this.getLocalEvent(nowStartDate,nowEndtDate);
          // this.eventList.sort(this.compare);
        },
        (err) => {
          console.log(err);
        }
      );

    }


  }

  checkDuplicate(item,array){
    let rt = false;
    if (item.access_level == "3") {
      array.forEach(item_array => {
        if (item_array.access_level == "3" && item_array.title == item.title) {
          rt = true;
          return true;
        }
      })
    }
    else{
      array.forEach(item_array => {
        if (item_array.id == item.id) {
          rt = true;
          return true;
        }
      })
    }
    return rt;
  } 

  getUnique(arr, comp) {

    const unique = arr
         .map(e => e[comp])

       // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);

     return unique;
  }  

  gEvent(item){
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
        let h = startDate.getHours().toString();
        if (startDate.getHours() < 10) {
          h = ("0" + startDate.getHours());
        };

        let m = startDate.getMinutes().toString();
        if (startDate.getMinutes() < 10) {
          m = ("0" + m);
        }; 
        item.time = h + ":" + m;
        if (h == "00" && m == "00") {
          // item.time = this.alldaytext;
        }  
        
        let he = endDate.getHours().toString();
        if (endDate.getHours() < 10) {
          he = ("0" + endDate.getHours());
        };

        let me = endDate.getMinutes().toString();
        if (endDate.getMinutes() < 10) {
          me = ("0" + me);
        };
        item.time_end = he + ":" + me;
        // item.startDate = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate()+" "+startDate.getHours()+":"+startDate.getMinutes()+":"+startDate.getSeconds();
        
        // console.log(item);
        if (item.allDay || item.allday ) {
          if (!(this.day == endDate.getDate() && startDate.getDate() != endDate.getDate())) {
            endDate = new Date(endDate.getTime() - 86400000);
            item.endDate = endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate()+" "+endDate.getHours()+":"+endDate.getMinutes()+":"+endDate.getSeconds();
            this.eventList.push(item);
          }
        }
        else{
          this.eventList.push(item);
        }                               
      }
      else
      {
        

        var startDate = new Date(item.startDate.replace(/\s/, 'T'));
        var endDate = new Date(item.endDate.replace(/\s/, 'T'));
        let h = startDate.getUTCHours().toString();
        if (startDate.getUTCHours() < 10) {
          h = ("0" + startDate.getUTCHours());
        };

        let m = startDate.getMinutes().toString();
        if (startDate.getMinutes() < 10) {
          m = ("0" + m);
        };
        item.time = h + ":" + m;
        if (h == "00" && m == "00") {
          // item.time = this.alldaytext;
        }

        let he = endDate.getUTCHours().toString();
        if (endDate.getUTCHours() < 10) {
          he = ("0" + endDate.getUTCHours());
        };

        let me = endDate.getMinutes().toString();
        if (endDate.getMinutes() < 10) {
          me = ("0" + me);
        };
        item.time_end = he + ":" + me;
        this.eventList.push(item);
      }


        // this.eventList.push(item);
      // this.eventList.push(item);
      // alert(JSON.stringify(item));
  }

  getLocalEvent(nowStartDate,nowEndtDate){
    // this.settingService.getAllEvent().then((data_local: any) => {
    //   console.log(data_local);
    // })
    // .catch(error => {
    //     console.log(error);
    // });     
    this.settingService.getEventByDayRepeatMonthAndYear(nowStartDate,nowEndtDate).then((data_local: any) => {
      console.log(data_local);
      if (data_local && data_local.length > 0) {
          data_local.forEach(item => {
              this.gEvent(item);
          });
      }
      this.eventList.sort(this.compare);
    })
    .catch(error => {
        console.log(error);
    }); 
  }
  editEvent(event){
    this.navCtrl.push(AddEventPage,{
      data:{
        status:"edit",
        data:event
      },
      callback: this.getData
    });
  }

  getData = data =>
  {
    return new Promise((resolve, reject) => {
      this.getDayEvent();
      resolve();
    });
  }  

  compare(a,b) {
    if (a.time < b.time)
      return -1;
    if (a.time > b.time)
      return 1;
    return 0;
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }  

  xoa_dau(str) {
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
  }
  

}

