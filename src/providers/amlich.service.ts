import { Injectable } from "@angular/core";
import { AmlichModel } from "../models/amlich.model";

declare var jdn;
declare var getCanChi;
declare var TIETKHI;
declare var getGioHoangDao;
declare var getSunLongitude;
declare var LunarDate;
declare var getCanHour0;
declare var CHI;
declare var CAN;
declare var TUAN;
declare var getLunarDate;

@Injectable()
export class AmlichService {

   constructor() {

   }

   getAmlich(dd,mm,yy){
     let amlich = new AmlichModel();
     var lunar_day = getLunarDate(dd,mm,yy);

     amlich.day = lunar_day.day;
     amlich.month = lunar_day.month;
     amlich.year = lunar_day.year;
     amlich.leap = lunar_day.leap;
     amlich.jd = lunar_day.jd;
     var jd = amlich.jd;
     amlich.canchi = getCanChi(lunar_day);
     amlich.tietkhi = TIETKHI[getSunLongitude(jd+1, 7.0)];
     amlich.GioHoangDao = getGioHoangDao(jd);
     amlich.GioDauNgay = getCanHour0(jd)+" "+CHI[0];

     amlich.DayOfWeek = TUAN[(lunar_day.jd + 1) % 7];

     amlich.LunaDayName = amlich.canchi[0];
     amlich.LunaMonthName = amlich.canchi[1];
     amlich.LunaYearName = amlich.canchi[2];

     // console.log(amlich);

     return amlich;
   }

   getCanChiGio(Std,dd,mm,yy,jd){
    var chiGio = (Std >= 23) ? 0 : Math.floor((Std + 1) / 2);
    // var jd = jdn(dd,mm,yy);
    var canGio = ((jd-1)*2 + Math.floor((Std + 1) / 2)) % 10;   
    var gio = CAN[canGio]+' '+CHI[chiGio];
    // console.log(gio);
    return gio;
   }

   getEventMainOfLunaDay(dd,mm){
    var amLichEvents =[
      {day:1,month:1,info:'Tết Nguyên Đán'},
      {day:15,month:1,info:'Tết Nguyên Tiêu (Lễ Thượng Nguyên)'},
      {day:3,month:3,info:'Tết Hàn Thực'},
      {day:10,month:3,info:'Giỗ Tổ Hùng Vương'},
      {day:15,month:4,info:'Lễ Phật Đản'},
      {day:5,month:5,info:'Tết Đoan Ngọ'},
      {day:15,month:7,info:'Lễ Vu Lan'},
      {day:15,month:8,info:'Tết Trung Thu'},
      {day:9,month:9,info:'Tết Trùng Cửu'},
      {day:10,month:10,info:'Tết Thường Tân'},
      {day:15,month:11,info:'Tết Hạ Nguyên'},
      {day:23,month:12,info:'Tiễn Táo Quân về trời'},
    ];
    return this.findEvents(dd, mm, amLichEvents);        
   }

   getEventMainOfDay(dd,mm){
    var duongLichEvents =[
      {day:1,month:1,info:'Tết Dương Lịch'},
      {day:14,month:2,info:'Lễ tình nhân (Valentine)'},
      {day:27,month:2,info:'Ngày thầy thuốc Việt Nam'},
      {day:8,month:3,info:'Ngày Quốc tế Phụ nữ'},
      {day:26,month:3,info:'Ngày thành lập Đoàn TNCS Hồ Chí Minh'},
      {day:1,month:4,info:'Ngày Cá tháng Tư'},
      {day:30,month:4,info:'Ngày giải phóng miền Nam'},
      {day:1,month:5,info:'Ngày Quốc tế Lao động'},
      {day:7,month:5,info:'Ngày chiến thắng Điện Biên Phủ'},
      {day:13,month:5,info:'Ngày của mẹ'},
      {day:19,month:5,info:'Ngày sinh chủ tịch Hồ Chí Minh'},
      {day:1,month:6,info:'Ngày Quốc tế thiếu nhi'},
      {day:17,month:6,info:'Ngày của cha'},
      {day:21,month:6,info:'Ngày báo chí Việt Nam'},
      {day:28,month:6,info:'Ngày gia đình Việt Nam'},
      {day:11,month:7,info:'Ngày dân số thế giới'},
      {day:27,month:7,info:'Ngày Thương binh liệt sĩ'},
      {day:28,month:7,info:'Ngày thành lập công đoàn Việt Nam'},
      {day:19,month:8,info:'Ngày tổng khởi nghĩa'},
      {day:2,month:9,info:'Ngày Quốc Khánh'},
      {day:10,month:9,info:'Ngày thành lập Mặt trận Tổ quốc Việt Nam'},
      {day:1,month:10,info:'Ngày quốc tế người cao tuổi'},
      {day:10,month:10,info:'Ngày giải phóng thủ đô'},
      {day:13,month:10,info:'Ngày doanh nhân Việt Nam'},
      {day:20,month:10,info:'Ngày Phụ nữ Việt Nam'},
      {day:31,month:10,info:'Ngày Hallowen'},
      {day:9,month:11,info:'Ngày pháp luật Việt Nam'},
      {day:20,month:11,info:'Ngày Nhà giáo Việt Nam'},
      {day:23,month:11,info:'Ngày thành lập Hội chữ thập đỏ Việt Nam'},
      {day:1,month:12,info:'Ngày thế giới phòng chống AIDS'},
      {day:19,month:12,info:'Ngày toàn quốc kháng chiến'},
      {day:22,month:12,info:'Ngày lễ Giáng sinh'},
      {day:24,month:12,info:'Ngày thành lập quân đội nhân dân Việt Nam'},
    ];
    return this.findEvents(dd, mm, duongLichEvents);        
   }   

  findEvents(dd, mm, events) {
    var ret = new Array();
    for (var i = 0; i < events.length; i++) {
      var evt = events[i];
      if (evt.day == dd && evt.month == mm) {
        ret.push(evt);
      }
    }
    return ret;
  }   

 }
