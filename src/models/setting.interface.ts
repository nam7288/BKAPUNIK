// export const SQL_CREATE_SETTINGS_TABLE: string = "CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY, key VARCHAR UNIQUE, value VARCHAR);";
export const SQL_BATCH_INSERT_INTO_SETTINGS_TABLE: string[] =[
    "INSERT OR IGNORE INTO settings VALUES(NULL, 'key1', 'value1'); ",
    "INSERT OR IGNORE INTO settings VALUES(NULL, 'key2', 'value2'); ",
    "INSERT OR IGNORE INTO settings VALUES(NULL, 'keyX', 'valueX'); "
]
export const  SQL_SELECT_ALL_SETTINGS: string = "SELECT * FROM customer;"

export const  SQL_CREATE_TABLES: string[] = [
"CREATE TABLE IF NOT EXISTS event ( _id INTEGER PRIMARY KEY AUTOINCREMENT, startDate TEXT, endDate TEXT, week TEXT, day TEXT, month TEXT, year TEXT, leap TEXT, jd TEXT, week_end TEXT, day_end TEXT, month_end TEXT, year_end TEXT, leap_end TEXT, jd_end TEXT, title TEXT, location TEXT, message TEXT, repeat TEXT, reminder TEXT, allDay TEXT, id TEXT)"];



export const  SQL_SAVE_EVENT: string = "INSERT INTO event (startDate, endDate, week, day, month, year,leap,jd, week_end, day_end, month_end, year_end,leap_end,jd_end, title, location, message, repeat, reminder, allDay,id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?, ?, ?, ?,?, ?,?)";
export const  SQL_UPDATE_EVENT: string ="UPDATE event SET startDate = ?, endDate = ?, week = ?, day = ?, month = ?, year = ?, title = ?, location = ?, message = ?, repeat = ?, reminder = ?, allDay = ?, id = ? WHERE _id = ?";

export const  SQL_DELETE_EVENT: string = "DELETE FROM event WHERE _id = ?";
export const  SQL_DELETE_EVENT_BY_ID: string = "DELETE FROM event WHERE id = ?";


export const  SQL_SELECT_ALL_EVENT: string = "SELECT * FROM event"
export const  SQL_SELECT_EVENT_BY_ID: string = "SELECT * FROM event WHERE id = ?"

export const  SQL_SELECT_EVENT_BY_DAY: string = "SELECT * FROM event WHERE "+
"_id IN (SELECT _id FROM event WHERE startDate <= ? AND endDate >= ? AND repeat = 0)"+
"OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND repeat = 1)"+
"OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND week = ? AND repeat = 2)"+
"OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND day = ? AND month = ? AND repeat = 3)"+
"OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND day = ? AND month = ?  AND year = ? AND repeat = 4)";


export const  SQL_SELECT_EVENT_BY_DAY_REPEAT_MONTH_AND_YEAR: string = "SELECT * FROM event WHERE "+
"_id IN (SELECT _id FROM event WHERE startDate <= ? AND repeat = 3)"+
"OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND repeat = 4)";

// export const  SQL_SELECT_EVENT_BY_DAY_REPEAT_MONTH_AND_YEAR: string = "SELECT * FROM event WHERE "+
// "_id IN (SELECT _id FROM event WHERE startDate <= ? AND day <= ? AND day_end >= ? AND month = month_end  AND repeat = 3)"+
// "OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND day <= ? AND month = ? AND month < month_end  AND repeat = 3)"+
// "OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND month < ? AND month_end > ? AND month < month_end  AND repeat = 3)"+
// "OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND day_end >= ? AND month_end = ? AND month < month_end  AND repeat = 3)"+
// "OR _id IN (SELECT _id FROM event WHERE startDate <= ? AND day = ? AND month = ?  AND repeat = 4)";
