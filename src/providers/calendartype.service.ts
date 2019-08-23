import { Injectable } from "@angular/core";
import { CalendartypeModel } from "../models/calendartype.model";

@Injectable()
export class CalendartypeService {
  calendartype : Array<CalendartypeModel> = new Array<CalendartypeModel>();

   constructor() {
     this.calendartype.push(
       {name: "Dương Lịch", code: "duonglich",name_en: "Solar Calendar"},
       {name: "Âm Lịch", code: "amlich",name_en: "Lunar Calendar"},
     );
   }

   getCalendartype(){
     return this.calendartype;
   }

   getDefaultCalendarTyle(){
    return "duonglich";
   }
 }
