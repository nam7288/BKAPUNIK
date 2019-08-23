import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController,AlertController,Platform,ModalOptions,LoadingController } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from "../../providers/language.service";
import { LanguageModel } from "../../models/language.model";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Base64 } from '@ionic-native/base64';
import { PhotoLibrary } from '@ionic-native/photo-library';
declare var cordova:any;
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-gallery-modal',
  templateUrl: 'gallery-modal.html',
})
export class GalleryModalPage {
  ApiRouter: string;
  data : any;
  trustedVideoUrl: SafeResourceUrl;
  // fileTransfer: any;
  fileTransfer: FileTransferObject; 

  img_url:any;
  loading:any;

  text_Set_as_home_screen:"";
  text_Set_as_lock_screen:"";
  text_Download_photos:"";
  text_Download_photos_to_bg:"";
  text_both:"";
  Please_wait:"";
  cancel:"";
  ok:"";
  Download_photos_successfully:"";
  Wallpaper_applied:"";
  alertSuccess:any;

  inputs = {
    title:"" as any,
    inputs:"" as any,
    buttons: "" as any,
  };  

  constructor(public loadingCtrl: LoadingController,private photoLibrary: PhotoLibrary,private base64: Base64,public plt: Platform,public navCtrl: NavController,public modalCtrl: ModalController,private alertCtrl: AlertController,private transfer: FileTransfer, private file: File,private navParams: NavParams,private domSanitizer: DomSanitizer, public viewCtrl: ViewController ,public translate: TranslateService)
  {
    this.ApiRouter = this.navParams.get('ApiRouter');
    this.data = this.navParams.get('data');
    if (this.data.url_video) {
      this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.url_video);
    }
    else{

      this.img_url = this.ApiRouter + this.data.image.path;
      // this.photoViewer.show(this.ApiRouter + this.data.image.path, this.data.title, {share: true}); 
      // this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.fileTransfer = this.transfer.create();
      // });         
    }

    this.translate.get('text_Set_as_home_screen').subscribe(
      value => {
        this.text_Set_as_home_screen = value;
      }
    )

    this.translate.get('text_Set_as_lock_screen').subscribe(
      value => {
        this.text_Set_as_lock_screen = value;
      }
    )    

    this.translate.get('text_Download_photos').subscribe(
      value => {
        this.text_Download_photos = value;
      }
    )    

    this.translate.get('text_Download_photos_to_bg').subscribe(
      value => {
        this.text_Download_photos_to_bg = value;
      }
    )  

    this.translate.get('text_both').subscribe(
      value => {
        this.text_both = value;
      }
    )    

    this.translate.get('Please_wait').subscribe(
      value => {
        this.Please_wait = value;
      }
    ) 

    this.translate.get('cancel').subscribe(
      value => {
        this.cancel = value;
      }
    )   

    this.translate.get('ok').subscribe(
      value => {
        this.ok = value;
      }
    )      

    this.translate.get('Download_photos_successfully').subscribe(
      value => {
        this.Download_photos_successfully = value;
      }
    )      

    this.translate.get('Wallpaper_applied').subscribe(
      value => {
        this.Wallpaper_applied = value;
      }
    )                  
    
  }

  ionViewDidLoad() {
  }  
 
  close() {
    this.viewCtrl.dismiss();
  }

  onDownloadIos() {

    this.inputs.title = this.text_Download_photos_to_bg;
      this.inputs.buttons =[      
        {
          text: this.cancel,
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: this.ok,
          handler: (value) => {
            if (this.loading) {
              this.loading.dismiss();
            }
            this.loading = this.loadingCtrl.create({
              content: this.Please_wait
            });  
            this.loading.present();   
            this.downloadIOS();
          }
        }
      ] ;
    let myAlert = this.alertCtrl.create(this.inputs);

    myAlert.present(); 
  } 

  downloadIOS() {
    this.plt.ready().then(() => {

      const fileTransfer: FileTransferObject = this.transfer.create();
      var url = encodeURI(this.img_url);
      let targetPath = cordova.file.cacheDirectory + moment().format("YYYYMMDDHHmmsss")+".jpg"; 
      // let targetPath = cordova.file.documentsDirectory + moment().format("YYYYMMDDHHmmsss")+".jpg"; 

      fileTransfer.download(url, targetPath).then((entry) => {

        cordova.plugins.imagesaver.saveImageToGallery(targetPath, this.onSaveImageSuccess, this.onSaveImageError);
        this.loading.dismiss();
        this.alertSuccess = this.alertCtrl.create({
          title: this.Download_photos_successfully,
          buttons: ['Ok']
        });       
        this.alertSuccess.present();
        // const modalOptions: ModalOptions = {
        //   cssClass: "GuideModal",
        //   showBackdrop: true,
        //   enableBackdropDismiss: true
        // };
        // const modal = this.modalCtrl.create("GuideModalPage", {}, modalOptions);
        // modal.present();

      }, (error) => {

        const alertFailure = this.alertCtrl.create({
          title: `Download Failed!`,
          subTitle: `was not successfully downloaded. Error code: ${error.code}`,
          buttons: ['Ok']
        });

        alertFailure.present();

      });

    });


  }

  onSaveImageSuccess(){
    // loading.dismiss();
    // view.present(); 
  }
  onSaveImageError(){
    // alert("Download Error!");
    // loading.dismiss(); 
    // const alertSuccess = view.alertCtrl.create({
    //     title: `Download Failed! Please try again !`,
    //     buttons: ['Ok']
    //   });
    //   view.alertSuccess.present();
  }
  onSaveImageSuccessAndroid(){

  }

  onSaveImageErrorAndroid(){
    // alert("Download Error!");
    // loading.dismiss(); 
    // const alertSuccess = view.alertCtrl.create({
    //     title: `Download Failed! Please try again !`,
    //     buttons: ['Ok']
    //   });
    //   view.alertSuccess.present();
  }  

  download() {

    this.inputs.inputs =[
        {
          type: 'radio',
          // label: "Làm màn hình nền!",
          label: this.text_Set_as_home_screen,
          value: 1,
          checked: false
        },
        {
          type: 'radio',
          label: this.text_Set_as_lock_screen,
          value: 2,
          checked: false
        }, 
        {
          type: 'radio',
          label: this.text_both,
          value: 3,
          checked: false
        }, 
        {
          type: 'radio',
          label: this.text_Download_photos,
          value: 4,
          checked: false
        }             
      ];
      this.inputs.buttons =[      
        {
          text: this.cancel,
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: this.ok,
          handler: (value) => {
            if (this.loading) {
              this.loading.dismiss();
            }
            this.loading = this.loadingCtrl.create({
              content: this.Please_wait
            });  
            this.loading.present();              
            console.log(value);
            // console.log(value.length);
            this.downloadAndroid(value);
          }
        }
      ] ;
    let myAlert = this.alertCtrl.create(this.inputs);

    myAlert.present();


   

  }  

  downloadAndroid(option){
    this.photoLibrary.requestAuthorization().then(() => {
      let imageURL = this.img_url;
      // let targetPath = cordova.file.externalDataDirectory + moment().format("YYYYMMDDHHmmsss")+".jpg";      
      let targetPath = cordova.file.cacheDirectory + moment().format("YYYYMMDDHHmmsss")+".jpg";      
      this.fileTransfer.download(imageURL, targetPath, true).then((entry) => {
        this.base64.encodeFile(entry.toURL()).then((base64File: string) => {

            let imageSrc = base64File.split(",");
            // window['plugins'].wallpaper.setImageBase64(imageSrc[1]);
            // alert(option);
            if (option) {
              if (option == 1) {
                window['plugins'].wallpaper.setImageBase64Lockscreen(imageSrc[1],1);
                this.alertSuccess = this.alertCtrl.create({
                  title: this.Wallpaper_applied,
                  buttons: ['Ok']
                });                   
              }
              if (option == 2) {
                window['plugins'].wallpaper.setImageBase64Lockscreen(imageSrc[1],2);
                this.alertSuccess = this.alertCtrl.create({
                  title: this.Wallpaper_applied,
                  buttons: ['Ok']
                });                
              }
              if (option == 3) {
                window['plugins'].wallpaper.setImageBase64Lockscreen(imageSrc[1],3);
                this.alertSuccess = this.alertCtrl.create({
                  title: this.Wallpaper_applied,
                  buttons: ['Ok']
                });                
              }   
              if (option == 4) {
                this.alertSuccess = this.alertCtrl.create({
                  title: this.Download_photos_successfully,
                  buttons: ['Ok']
                });
              }                         
            }
            this.loading.dismiss();
            this.alertSuccess.present();   
            // window['plugins'].wallpaper.setImageBase64setImageBase64Lockscreen(imageSrc[1]);
            cordova.plugins.imagesaver.saveImageToGallery(targetPath, this.onSaveImageSuccessAndroid, this.onSaveImageError);
        }, (err) => {

        });

      }, (error) => {
        this.loading.dismiss()
        const alertFailure = this.alertCtrl.create({
          title: `Download Failed!`,
          // subTitle: `${this.data.title} was not successfully downloaded. Error code: ${error.source} - ${error.target} - ${error.code}`,
          buttons: ['Ok']
        });

        alertFailure.present();      
      });
    })
    .catch(err => this.loading.dismiss());    
  }

}

