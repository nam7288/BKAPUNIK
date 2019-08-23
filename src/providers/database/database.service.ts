import { SQL_CREATE_TABLES, SQL_BATCH_INSERT_INTO_SETTINGS_TABLE } from './../../models/setting.interface';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';

const DATA_BASE_NAME = 'vietjet.db';

@Injectable()
export class DatabaseService {

    database: SQLiteObject;
    ready: Promise<void>;

    constructor(private sqlite: SQLite, private platform: Platform) {
        this.ready = this.platform.ready()
            .then(() => this.initializeDatabase())
            .then(() => this.bootstrapTables())
            // .then(() => this.bootstrapData())
    }

    private bootstrapData(): Promise<void> {
        if (this.database && this.database.sqlBatch) {
            return this.database.sqlBatch(SQL_BATCH_INSERT_INTO_SETTINGS_TABLE).then(() => {
                console.log("Data bootstrapped: " + SQL_BATCH_INSERT_INTO_SETTINGS_TABLE);
            }).catch(error => console.log(error));
        }
        return null;
    }

    private bootstrapTables(): Promise<void> {
        // return this.database.executeSql(SQL_CREATE_CUSTOMERS_TABLE, []).then(() => {
        //     console.log("Table boostrapped: " + SQL_CREATE_SETTINGS_TABLE);
        // });
        // console.log(SQL_CREATE_CUSTOMERS_TABLE);
        if (this.database && this.database.sqlBatch) {
            return this.database.sqlBatch(SQL_CREATE_TABLES).then(() => {
                console.log("Table boostrapped: " + SQL_CREATE_TABLES);
            }).catch(error => console.log(error));    
        }

        return null;
    
    }

    private initializeDatabase(): Promise<void> {
        return this.sqlite.create({
            name: DATA_BASE_NAME,
            location: 'default'
        }).then((database: SQLiteObject) => {
            this.database = database;
            console.log("Database initialized");
        }).catch(error => console.log(error));
    }

    getDatabase(): Promise<SQLiteObject> {
        return this.ready.then(() => {
            return this.database;
        });
    }
}
