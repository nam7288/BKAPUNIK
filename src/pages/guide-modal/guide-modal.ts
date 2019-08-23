import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from "../../providers/language.service";
import { LanguageModel } from "../../models/language.model";

// declare var cordova:any;


@IonicPage()
@Component({
  selector: 'page-guide-modal',
  templateUrl: 'guide-modal.html',
})
export class GuideModalPage {
  data : any;
  clickInside: any;
  textArray: string[];
  stepNumber:any;
  guideImage:any;

  constructor(public navCtrl: NavController,private alertCtrl: AlertController, private navParams: NavParams, public viewCtrl: ViewController ,public translate: TranslateService)
  {

  	this.stepNumber = 0;
  	this.guideImage = "../assets/imgs/step/"+this.stepNumber+".jpg";
  	this.textArray = ["<u>Bước 1</u> : Vào phần <b>Photos</b>","<u>Bước 2</u> : Chọn hình cần làm <b>Wallpaper</b>","<u>Bước 3</u> : Chọn biểu tượng <b>Set</b] hình ảnh","<u>Bước 4</u> : Chọn <b>Use as Wallpaper</b]","<u>Bước 5</u> : Nhấn button <b>Set</b] để thực thi hiệu lực"];
  }

  ionViewDidLoad() {
  }  

  close() {
  	if(this.clickInside == false)
  	{
  		this.viewCtrl.dismiss();
  	}
  	this.clickInside = false; 
  }
  contentClick(){
  	//this.viewCtrl.dismiss();
  	this.clickInside = true;
  	// if(this.stepNumber < 4)
  	// {
  	// 	this.stepNumber++;
  	// 	this.guideImage = "../assets/imgs/step/"+this.stepNumber+".jpg";
  	// 	document.getElementById("text-content").innerHTML = this.textArray[this.stepNumber];
  	// }
  	
  }

  swipe(contentView)
  {
	  	if(contentView.direction === 2 && this.stepNumber < 4) {
	      this.stepNumber++;
	    }
	    // Prev
	    if(contentView.direction === 4 && this.stepNumber > 0) {
	      this.stepNumber--;
	    }   

	    this.guideImage = "../assets/imgs/step/"+this.stepNumber+".jpg";
  		document.getElementById("text-content").innerHTML = this.textArray[this.stepNumber];
  }
}

