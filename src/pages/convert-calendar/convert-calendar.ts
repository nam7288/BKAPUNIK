import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TranslateService } from '@ngx-translate/core';
import { DayModalPage } from '../day-modal/day-modal';

declare var getLunarDate;
declare var mobiscroll;
declare var convertLunar2Solar;
declare var convertSolar2Lunar;
declare var eventLeafGlobal;
declare var is_LeapMonth;

@IonicPage()
@Component({
  selector: 'page-convert-calendar',
  templateUrl: 'convert-calendar.html',
})
export class ConvertCalendarPage {

  solarDate:any;
  lunarDate:any;
  date:any;
  is_leaf:any = false;
  eventLeaf:any = false;
  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public localNotifications: LocalNotifications) {

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

  ionViewDidLoad() {
    setTimeout(() => {
      this.initView();
    }, 100);     
    // this.initView();
  }
  ionViewWillLeave(){
  }

  changeLeftday(ev){
    if (this.eventLeaf) {
      eventLeafGlobal = true;
    }
    else{
      eventLeafGlobal = false;
    }
      var initial = this.date.split(/\//).reverse().join('/');
      this.lunarDate.setVal(mydate, true, true, false, 1000);
      var mydate = new Date(initial);

      var lunar = convertSolar2Lunar(mydate.getDate(),mydate.getMonth() + 1,mydate.getFullYear(),7);  
      this.lunarDate.setVal(mydate, true, true, false, 1000);        
  }

  initView(){
      mobiscroll.settings = {
          lang: 'en',        
          theme: 'android' ,    
      };     
    var root = this;
    this.solarDate = mobiscroll.date('#solarDate', {
        display: 'inline',
        layout: 'liquid',
        dateFormat:'dd/mm/yy',
        monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], 
        onShow: function (event, inst) {
          root.date = event.valueText;
        } ,                
        onChange: function (event, inst) {
          // console.log(event);
          var initial = event.valueText.split(/\//).reverse().join('/');
          root.date = event.valueText;
          var mydate = new Date(initial);

          var lunar = convertSolar2Lunar(mydate.getDate(),mydate.getMonth() + 1,mydate.getFullYear(),7);

          if(is_LeapMonth(lunar[0],lunar[1],lunar[2],7)){
            root.is_leaf = true;
            if (lunar[3] == 1) {
              eventLeafGlobal = true;
              root.eventLeaf = true;
            }
            else{
              eventLeafGlobal = false;
              root.eventLeaf = false;   
            }
          }else{
            root.is_leaf = false;
              eventLeafGlobal = false;
              root.eventLeaf = false;            
          }

          root.lunarDate.setVal(mydate, true, true, false, 1000);

        },         
    }); 

      mobiscroll.settings = {
          lang: 'vn',        
          theme: 'android' ,    
      };  

    this.lunarDate = mobiscroll.date('#lunarDate', {
        display: 'inline',
        layout: 'liquid',
        dateFormat:'dd/mm/yy',
        monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        isLunar:true,
        monthText: 'Luna' ,     
        onChange: function (event, inst) {
          var initial = event.valueText.split(/\//);
          console.log(is_LeapMonth(parseInt(initial[0]),parseInt(initial[1]),parseInt(initial[2]),7));
          if(is_LeapMonth(parseInt(initial[0]),parseInt(initial[1]),parseInt(initial[2]),7)){
              eventLeafGlobal = true;
              // root.eventLeaf = true;  
              root.is_leaf = true;          
          }
          else{
              eventLeafGlobal = false;
              root.eventLeaf = false;
              root.is_leaf = false;
          }
          var solar = convertLunar2Solar(parseInt(initial[0]),parseInt(initial[1]),parseInt(initial[2]),0,7);
          root.date = solar.join('/');
        },              
    });      
  } 

  showMore(){
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

      let data = {
        day: day,
        month: month,
        year: year,
        dateStart: thisDate1,
        dateEnd: thisDate2,
        lunaDay: lunarDayArray,
      };
      this.navCtrl.push(DayModalPage, {
        data: data,
      });

  }

}
