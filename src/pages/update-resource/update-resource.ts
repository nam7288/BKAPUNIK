import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File, DirectoryEntry, FileEntry } from '@ionic-native/file';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { Base64 } from '@ionic-native/base64';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
// import { Network } from '@ionic-native/network';
import 'rxjs/add/operator/map';
declare var configApp;
declare var database;

@IonicPage()
@Component({
  selector: 'page-update-resource',
  templateUrl: 'update-resource.html',
})
export class UpdateResourcePage {

  ApiRouter: string;
  progress : number = 0;
  progressP : number = 0;
  update:any;
  fileTransfer: FileTransferObject;
  monthNames: string[];
  img_path:any;
  db: SQLiteObject;

  disconnectSubscription:any;
  connectSubscription:any;

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private transfer: FileTransfer, 
    private file: File,
    public http: Http,
    private storage: Storage,
    public plt: Platform,
    private base64: Base64,
    private photoLibrary: PhotoLibrary,
    private domSanitizer: DomSanitizer,
    private sqlite: SQLite
    // public network: Network
    ) {
    this.ApiRouter = configApp.ApiRouter ;
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // this.navCtrl.setRoot(HomePage);
    this.fileTransfer = this.transfer.create();

    if (this.file.cacheDirectory) {
      configApp.file_path = this.file.cacheDirectory;
    }

    this.initDatabase();

    // this.initUpdate();

    // this.progress = 1;
    // if (this.plt.is('ios')) {
    //   this.getCensoredDefault();
    // }
    // else{
    //   this.initUpdate();
    // }

    // this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    //   alert('network was disconnected :-(');
    //   this.disconnectSubscription.unsubscribe();
    //   // this.navCtrl.setRoot(HomePage);
    // });

    // this.connectSubscription = this.network.onConnect().subscribe(() => {
    //   alert('network was connected :-(');
    //   this.connectSubscription.unsubscribe();
    //   this.initDatabase();
    // });    
    // document.addEventListener('offline', () => console.log('onDisconnect'));
    // document.addEventListener('online', () => alert('onDisconnect'));

    // this.appIsOnDevice = !this.plt.url().startsWith('http');
    // this.initNetworkMonitor();
    
    // var headers = new Headers();
    //   headers.append('Accept', 'application/json' );
    //   headers.append('Content-Type', 'application/json' );
    //   headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9iZXVuaWsuY29tLnZuXC9kZW1vXC9tZWRpY2FsLWFwcFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU1MjEwNTAzNCwiZXhwIjoxNTU0Njk3MDM0LCJuYmYiOjE1NTIxMDUwMzQsImp0aSI6IjF1NWpzbUJEdVZQYXMxMWgiLCJzdWIiOjEsInBydiI6IjQxMWM5MTdhMGZiNTFlMGE0MjdhN2UzZGVhYTVhNDllMjkyZGRiOWIifQ.O9MSrORYARsoLl6NR6BbLVkYGvAQQLPzRgTa3aovFJo' );
    //   const requestOptions = new RequestOptions({ headers: headers });
    //   var my_device = this.plt.is('ios')?"ios":"android";
    //   let postData = {
    //     name: 'ada'
    //   }    
    //  this.http.post('http://beunik.com.vn/demo/medical-app/api/customer/create', postData, requestOptions).map(res => res.json()).subscribe(data => {
    //   console.log(data);
    // }, error => {
    //     console.log(error);
    //     this.navCtrl.setRoot(HomePage);
    // });  
  }

  ionViewDidLoad() {
    // console.log("qwegggqe");
    // alert("qweqe");
  }




  initDatabase() {
    this.sqlite.create({
      name: 'vietjetecalendar.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      db.executeSql(`
        CREATE TABLE IF NOT EXISTS background_image 
          ( _id INTEGER PRIMARY KEY AUTOINCREMENT, year TEXT, 
            month TEXT, type TEXT, imageData BLOB, imageUrl TEXT
        )`, [])
        .then(res => {
          this.initUpdate();
          // if (this.plt.is('ios')) {
          //   this.getCensoredDefault();
          // }
          // else{
          //   this.initUpdate();
          // }
        })
        .catch(e => {
          this.navCtrl.setRoot(HomePage);
          // alert(e);
        });
    }).catch(
      e => {
        this.navCtrl.setRoot(HomePage);
        // alert(e);
      }
    );
  }  


  getCensoredDefault(){
    this.http.get(this.ApiRouter + 'api/censored-default').map(res => res.json()).subscribe(data => {
        if (data && data.result) {
          configApp.censored_default = data.result;
          // this.storage.set('update_censored', data.result);
        } 
        this.initUpdate();
    });
  } 

  initUpdate(){
    let date = new Date();
    let year = date.getFullYear();
    var allUpdatePromises = new Array();
 
      var headers = new Headers();
      // headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );
      const requestOptions = new RequestOptions({ headers: headers });
      var my_device = this.plt.is('ios')?"ios":"android";
      let postData = {
        device:my_device
      }         
     this.http.post(configApp.ApiRouter + 'api/year-image', postData, requestOptions).map(res => res.json()).subscribe(data => {
      if (data && data.result && data.result.length > 0) {
        var allUpdateStorage = new Array();
        for (var i = 0; i < data.result.length; i++) {
          allUpdateStorage.push(this.storage.get('update_R_'+ data.result[i].year));
        }

        Promise.all(allUpdateStorage).then(values => {
            this.UpdateAll(data.result,values,0);     
        });        
      }
      else{
        this.navCtrl.setRoot(HomePage);
      }

    }, error => {
        console.log(error);
        this.navCtrl.setRoot(HomePage);
    });

  }

  UpdateAll(data,values,index){

      if (data && values && values.length > index) {
        // console.log(values);
        // console.log(index);
        // console.log(data[index]);
        // alert(data[index].year);
        //   this.getUpdate(values[index],data[index]).then(() => {
        //       this.UpdateAll(data,values,index + 1);
        //   }); 
        if (data[index].year == "default_ios") {
          this.UpdateAll(data,values,index + 1);
        }
        else{
          this.getUpdate(values[index],data[index]).then(() => {
              this.UpdateAll(data,values,index + 1);
          }); 
        }
      }
      else{
          if (this.progress != -1) {
            this.progress = 100;
            let root = this;
            setTimeout(function(){ root.navCtrl.setRoot(HomePage); }, 1000);
          }
          else{
            this.navCtrl.setRoot(HomePage);
            
          }
      }

  }

  getUpdate(version,data){
    var year =  data.year;  

    return new Promise((resolve, reject) => {
        if (data && data.version && data.version != version) {
            if(!this.progress)this.progress = 1;
            this.progressP  += 36;
            this.download(data).then((result: any) => {resolve();}).catch(e=>{ resolve();});
        } else {
          this.getBackgroundImageDataFromDatabase(year).then((result: any) => {
            if (result && result.rows && result.rows.length > 0) {
              if (!database) {
                database = {};
              }
              if (!database[year]) {
                database[year] = {};
              }
              for (let i = 0; i < result.rows.length; i++) {
                let rowItem = result.rows.item(i);
                if (!database[year][rowItem.type]) {
                  database[year][rowItem.type] = {};
                }
                database[year][rowItem.type][rowItem.month] = rowItem.imageData;

              }
              resolve();
            }
            else{
              resolve();
            }
          }).catch(e=>{
            resolve();
          });
        }  
    });
  }  

  

  download(data){
    return new Promise((resolve, reject) => {
      if (data) {
        var allPromises = new Array();
        for (var i = 0; i < data.gallery.length; i++) {
          allPromises.push(this.downloadBackgroundPromise(data.gallery[i], data.year, 0, i));
        }
        Promise.all(allPromises).then(() => {
          var allPromises = new Array();
          for (var i = 0; i < data.text.length; i++) {
            allPromises.push(this.downloadBackgroundPromise(data.text[i], data.year, 1, i));
          }        
          Promise.all(allPromises).then(() => {
            var allPromises = new Array();
            for (var i = 0; i < data.gallery_detail.length; i++) {
              allPromises.push(this.downloadBackgroundPromise(data.gallery_detail[i], data.year, 2, i));
            }        
            Promise.all(allPromises).then(() => {
              this.storage.set('update_R_'+ data.year, data.version);
              resolve();
            }); 
          });        
        });
      }
      else{
        resolve();
      }
    });
  }

   downloadBackgroundPromise(item, year, type, index){
    return new Promise((resolve, reject) => {
    // let TIME_IN_MS = 1000;
    // let hideFooterTimeout = setTimeout( () => {
    //      resolve();
    //      // reject(null);
    // }, TIME_IN_MS); 
    // return;      
      const url = configApp.ApiRouter + item.path;
      const path = configApp.file_path+"imgs/background/bg"+this.monthNames[index]+".jpg"; 
      this.fileTransfer.download(url, path).then((entry) => {
        if(this.plt.is('ios'))
        {
          this.getBase64StringByFilePath(entry.toURL()).then((base64File: string) => {
            this.addbase64FileToDatabase(base64File, year, type, index);
            resolve();
          }, (err) => {
            resolve();
          });   

        }else{
          this.base64.encodeFile(entry.toURL()).then((base64File: string) => {
            this.addbase64FileToDatabase(base64File, year, type, index);
            resolve();
          }, (err) => {
            resolve();
          });
        }    
      }).catch(e => {
        resolve();
      });
    });    
  }

  getBase64StringByFilePath(fileURL): Promise<string> {
      return new Promise((resolve, reject) => {

          let fileName = fileURL.substring(fileURL.lastIndexOf('/') + 1);
          let filePath = fileURL.substring(0, fileURL.lastIndexOf("/") + 1);
          this.file.readAsDataURL(filePath, fileName).then(
              file64 => {
                  // console.log(file64); //base64url...
                  resolve(file64);
              }).catch(err => {
                  reject(err);
            });
      })
  }  

  addbase64FileToDatabase(base64File, year, type, index){
            let imageSrc = base64File.split(",");
            if (!database) {
              database = {};
            }
            if (!database[year]) {
              database[year] = {};
            }
            if (!database[year][type]) {
              database[year][type] = {};
            }
            database[year][type][index] = ("data:image/jpeg;base64," + imageSrc[1]).replace(/(\r\n|\n|\r)/gm, "");
            this.saveBackgroundImageDataToDatabase(year, index, type, ("data:image/jpeg;base64," +imageSrc[1]).replace(/(\r\n|\n|\r)/gm, ""), '');                      
            // let count_p = parseInt(100/this.progressP);
            let count_p = 100/this.progressP;
            this.progress += count_p;  
            if (this.progress > 100) {
              this.progress = 100;
            }
  }
 

  saveBackgroundImageDataToDatabase(year, month, type, imageData, imageUrl = '') {
    if (!this.db) {
      console.log({error: 'Database is not initialized'});
    }

    let sql = `SELECT year, month, type FROM background_image WHERE year = ? AND month = ? AND type = ?`;
    this.db.executeSql(sql, [year, month, type]).then(data => {
      let sql = '';
      let sqlData = [];
      if (data && data.rows.length > 0) {
        sql = "UPDATE background_image SET imageData = ?, imageUrl = ? WHERE year = ? AND month = ? AND type = ?";
        sqlData = [imageData, imageUrl, year, month, type];
      } else {
        sql = "INSERT INTO background_image (year, month, type, imageData, imageUrl) VALUES (?, ?, ?, ?, ?)";
        sqlData = [year, month, type, imageData, imageUrl];  

      }

      this.db.executeSql(sql, sqlData).then((data) => {
        // console.log(data);
        // alert(JSON.stringify(data));
        // this.getBackgroundImageDataFromDatabase(year);
      }, (error) => {
        alert(JSON.stringify(error));
      });
    });
  }

  getBackgroundImageDataFromDatabase(year) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject({
          error: 'Database is not initialized'
        });
      }

      let sql = `
        SELECT year, month, type, imageData, imageUrl 
        FROM background_image 
        WHERE year = ?
        ORDER BY month ASC
        `;
      this.db.executeSql(sql, [year]).then((data) => {

        
        resolve(data);
      }, (error) => {

        reject(error);
      });
    });
  }  

  getBg() {
    let imageBg = "url(../assets/imgs/screen.jpg)";
    return imageBg;
  }


}
