// import { Setting } from './../../models/setting.interface';
import { DatabaseService } from './../database/database.service';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { 
    SQL_SAVE_EVENT ,
    SQL_UPDATE_EVENT,
    SQL_DELETE_EVENT,
    SQL_SELECT_EVENT_BY_DAY,
    SQL_SELECT_EVENT_BY_ID,
    SQL_DELETE_EVENT_BY_ID,
    SQL_SELECT_EVENT_BY_DAY_REPEAT_MONTH_AND_YEAR,
    SQL_SELECT_ALL_EVENT,
} from './../../models/setting.interface';
declare var getLunarDate;
declare var jdn;
declare var convertLunar2Solar;
declare var jdToDate;

@Injectable()
export class SettingService {

    constructor(private databaseService: DatabaseService,public plt: Platform) {
    }

// CUSTOMER

    saveEvent(datasave,startDate,endDate,id): Promise<any> {
        let sqlData = [];
        console.log(datasave);
        var startLunaDate = getLunarDate(startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear());
        var week = startDate.getDay();
        var day = startLunaDate.day;
        var month = startLunaDate.month;
        var year = startLunaDate.year;
        var leap = startLunaDate.leap;
        var jd = startLunaDate.jd;

        // var time_allday = 0;
        if (datasave.allDay) {
            // time_allday = 86400000;
            endDate = new Date(endDate.getTime() + 86400000);  
        } 
           

        var endLunaDate = getLunarDate(endDate.getDate(), endDate.getMonth() + 1, endDate.getFullYear());   
        var week_end = endDate.getDay();
        var day_end = endLunaDate.day;
        var month_end = endLunaDate.month;
        var year_end = endLunaDate.year;  
        var leap_end = endLunaDate.leap;
        var jd_end = endLunaDate.jd;           
        var reminder = 0;
        if (datasave.alert){
            if(datasave.alert == 1){
              reminder = 15;
            }
            if(datasave.alert == 2){
              reminder = 30;
            }      
            if(datasave.alert == 3){
              reminder = 60;
            }                     
            if(datasave.alert == 4){
              reminder = 120;
            }   
            if(datasave.alert == 5){
              reminder = 1440;
            }   
            if(datasave.alert == 6){
              reminder = 2880;
            }                                                                                                                         
        } 
    
        sqlData = [startDate.getTime() ,endDate.getTime() ,week, day, month, year,leap,jd,week_end, day_end, month_end, year_end,leap_end,jd_end, datasave.title, datasave.location, datasave.message, datasave.repeat, reminder, datasave.allDay,id]; 
        return this.databaseService.getDatabase().then(database => {
            return database.executeSql(SQL_SAVE_EVENT, sqlData).then((data) => {
                return data;
            });
        });
    }

    updateEvent(datasave,_id): Promise<any> {
        let sqlData = [];
        sqlData = [datasave.startDate ,datasave.endDate,datasave.week, datasave.day, datasave.month, datasave.year, datasave.title, datasave.location,datasave.message , datasave.repeat, datasave.reminder, datasave.allDay, _id]; 
        return this.databaseService.getDatabase().then(database => {
            return database.executeSql(SQL_UPDATE_EVENT, sqlData).then((data) => {
                return data;
            });
        });
    }

    deleteEvent(_id): Promise<any> {
        let sqlData = [_id];
        return this.databaseService.getDatabase().then(database => {
            return database.executeSql(SQL_DELETE_EVENT, sqlData).then((data) => {
                return data;
            });
        });
    }   

    deleteEventById(id): Promise<any> {
        let sqlData = [];
        sqlData = [id]; 
        return this.databaseService.getDatabase().then(database => {
            return database.executeSql(SQL_DELETE_EVENT_BY_ID, sqlData).then((data) => {
                return data;
            });
        });
    } 

    getAllEvent(): Promise<any> { 
        return this.databaseService.getDatabase().then(database => {
            let query = SQL_SELECT_ALL_EVENT;
            let sql = [];
            return database.executeSql(query, sql).then((data) => {
                let rs = new Array();
                for (let i = 0; i < data.rows.length; i++) {
                    rs.push({
                        _id: data.rows.item(i)._id,
                        startDate: data.rows.item(i).startDate,
                        endDate: data.rows.item(i).endDate,
                        // week: data.rows.item(i).week,
                        // day: data.rows.item(i).day,
                        // month: data.rows.item(i).month,
                        // year: data.rows.item(i).year,
                        title: data.rows.item(i).title,
                        location: data.rows.item(i).location,
                        message: data.rows.item(i).message,
                        repeat: data.rows.item(i).repeat,
                        reminder: data.rows.item(i).reminder,
                        allDay: data.rows.item(i).allDay,
                        id: data.rows.item(i).id,
                    });
                };
                return rs;
            });
        });
    }          

    getEventById(id): Promise<any> { 
        return this.databaseService.getDatabase().then(database => {
            let query = SQL_SELECT_EVENT_BY_ID;
            let sql = [id];
            return database.executeSql(query, sql).then((data) => {
                let rs = new Array();
                for (let i = 0; i < data.rows.length; i++) {
                    rs.push({
                        _id: data.rows.item(i)._id,
                        startDate: data.rows.item(i).startDate,
                        endDate: data.rows.item(i).endDate,
                        // week: data.rows.item(i).week,
                        // day: data.rows.item(i).day,
                        // month: data.rows.item(i).month,
                        // year: data.rows.item(i).year,
                        title: data.rows.item(i).title,
                        location: data.rows.item(i).location,
                        message: data.rows.item(i).message,
                        repeat: data.rows.item(i).repeat,
                        reminder: data.rows.item(i).reminder,
                        allDay: data.rows.item(i).allDay,
                        id: data.rows.item(i).id,
                    });
                };
                return rs;
            });
        });
    } 

    getEventByDayRepeatMonthAndYear(startDate,endDate){

        return this.databaseService.getDatabase().then(database => {
            let query = SQL_SELECT_EVENT_BY_DAY_REPEAT_MONTH_AND_YEAR;
            var startLunaDate = getLunarDate(startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear());
            var day = startLunaDate.day;
            var month = startLunaDate.month;

            var endLunaDate = getLunarDate(endDate.getDate(), endDate.getMonth() + 1, endDate.getFullYear());
            var day_end = endLunaDate.day;
            var month_end = endLunaDate.month;            

            // let sql = [
            // endDate.getTime(),day,day,
            // endDate.getTime(),day,month,
            // endDate.getTime(),month,month,
            // endDate.getTime(),day,month,
            // endDate.getTime(),day,month
            // ];
            let sql = [
                endDate.getTime(),
                endDate.getTime()
            ];            
            return database.executeSql(query, sql).then((data) => {
                let rs = new Array();
                for (let i = 0; i < data.rows.length; i++) {
                    var item = this.inDateRangeByDayRepeatMonthAndYear(data.rows.item(i),startDate,endDate,startLunaDate,endLunaDate);
                    if (item) {
                        rs.push({
                            _id: data.rows.item(i)._id,
                            // startDate: data.rows.item(i).startDate,
                            startDate: this.convertTimerToDate(data.rows.item(i).startDate,item[0]),
                            endDate: this.convertTimerToDate(data.rows.item(i).endDate,item[1]),
                            // endDate: data.rows.item(i).endDate,
                            week: data.rows.item(i).week,
                            day: data.rows.item(i).day,
                            month: data.rows.item(i).month,
                            year: data.rows.item(i).year,
                            title: data.rows.item(i).title,
                            location: data.rows.item(i).location,
                            message: data.rows.item(i).message,
                            // repeat: +data.rows.item(i).repeat,
                            recurrence:{
                                freq:(data.rows.item(i).repeat == '3')?'MONTHLY':'YEARLY',
                            },
                            reminder: data.rows.item(i).reminder,
                            allDay:(data.rows.item(i).allDay == 'false')?false:true,
                            id: data.rows.item(i).id,
                            
                        });
                    }
                };
                return rs;
            });
        });
    }  

    inDateRangeByDayRepeatMonthAndYear(day,startDate,endDate,startLunaDate,endLunaDate){
        // console.log(day);
        var year = day.year;
        var repeat = day.repeat;

        var month = day.month;
        if (repeat=='3') month = startLunaDate.month;
        var month_end = day.month_end;
        if (repeat=='3') month_end = endLunaDate.month;         

        var my_solar = convertLunar2Solar(parseInt(day.day),parseInt(month),parseInt(startLunaDate.year),0,7);
        var my_solar_end = convertLunar2Solar(parseInt(day.day_end),parseInt(month_end),parseInt(endLunaDate.year),0,7);



        var my_jdn = jdn(my_solar[0],my_solar[1],my_solar[2]);

        var my_jdn_end = jdn(my_solar_end[0],my_solar_end[1],my_solar_end[2]);


        // console.log(startLunaDate);
        // console.log(endLunaDate);
        // // console.log(day.day);        
        // // console.log(month);        
        // // console.log(startLunaDate.year);        
        // console.log(my_solar);        
        // console.log(my_solar_end);        
        // console.log(my_jdn);        
        // console.log(my_jdn_end);        
        if (my_jdn >= startLunaDate.jd && my_jdn <= endLunaDate.jd || my_jdn_end >= startLunaDate.jd && my_jdn_end <= endLunaDate.jd) {
            var my_jdn_end = my_jdn + (day.jd_end - day.jd);
            var my_solar_end = jdToDate(my_jdn_end);            
            return [my_solar,my_solar_end];
        }

        if (my_jdn <= startLunaDate.jd && my_jdn_end >= startLunaDate.jd || my_jdn <= endLunaDate.jd && my_jdn_end >= endLunaDate.jd) {
            var my_jdn_end = my_jdn + (day.jd_end - day.jd);
            var my_solar_end = jdToDate(my_jdn_end);             
            return [my_solar,my_solar_end];
        }        
        return false;


        // return false;
    }


    listEventsInRangeMonth(startDate,endDate,month){

        return this.databaseService.getDatabase().then(database => {
            let query = SQL_SELECT_EVENT_BY_DAY_REPEAT_MONTH_AND_YEAR;
            var startLunaDate = getLunarDate(startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear());
            var day = startLunaDate.day;
            var month = startLunaDate.month;

            var endLunaDate = getLunarDate(endDate.getDate(), endDate.getMonth() + 1, endDate.getFullYear());
            var day_end = endLunaDate.day;
            var month_end = endLunaDate.month;            

            // let sql = [
            // endDate.getTime(),day,day,
            // endDate.getTime(),day,month,
            // endDate.getTime(),month,month,
            // endDate.getTime(),day,month,
            // endDate.getTime(),day,month
            // ];
            let sql = [
                endDate.getTime(),
                endDate.getTime()
            ];            
            return database.executeSql(query, sql).then((data) => {
                let rs = new Array();
                for (let i = 0; i < data.rows.length; i++) {
                    var item = this.inDateRangeByDayRepeatMonthAndYear(data.rows.item(i),startDate,endDate,startLunaDate,endLunaDate);
                    if (item) {
                        rs.push({
                            _id: data.rows.item(i)._id,
                            // startDate: data.rows.item(i).startDate,
                            startDate: this.convertTimerToDate(data.rows.item(i).startDate,item[0]),
                            endDate: this.convertTimerToDate(data.rows.item(i).endDate,item[1]),
                            // endDate: data.rows.item(i).endDate,
                            week: data.rows.item(i).week,
                            day: data.rows.item(i).day,
                            month: data.rows.item(i).month,
                            year: data.rows.item(i).year,
                            title: data.rows.item(i).title,
                            location: data.rows.item(i).location,
                            message: data.rows.item(i).message,
                            // repeat: +data.rows.item(i).repeat,
                            recurrence:{
                                freq:(data.rows.item(i).repeat == '3')?'MONTHLY':'YEARLY',
                            },
                            reminder: data.rows.item(i).reminder,
                            allDay:(data.rows.item(i).allDay == 'false')?false:true,
                            id: data.rows.item(i).id,
                            
                        });
                    }
                };
                return rs;
            });
        });
    }     

    convertTimerToDate(time,item){
        var mydate = new Date(+time);
        // return mydate.getFullYear()+"-"+(mydate.getMonth()+1)+"-"+mydate.getDate()+" "+mydate.getHours()+":"+mydate.getMinutes()+":"+mydate.getSeconds();
        if (this.plt.is('ios')) {
            return item[2]+"-"+item[1]+"-"+item[0]+"T"+mydate.getHours()+":"+mydate.getMinutes()+":"+mydate.getSeconds();
        }
        else{
            return item[2]+"-"+item[1]+"-"+item[0]+" "+mydate.getHours()+":"+mydate.getMinutes()+":"+mydate.getSeconds();
        }
        
    }
            

}
