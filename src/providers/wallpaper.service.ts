import { Injectable } from "@angular/core";
import { Platform } from 'ionic-angular';

declare var window: any;
declare var wallpaper: any;

@Injectable()
export class WallpaperService {

   constructor(platform: Platform) {

   }

   setWallpaper(url){
   		console.log('In');
/*
   		this.platform.ready().then(() => {
    	window.plugins.wallpaper.setImage(url);
        console.log('Success setting wallpaper.');
        console.log("Set Background END");
 		});
*/
		// window["wallpaper"].setImage('url', function(error) {
		//   if (error) {
		//     console.error(error);
		//   }
		//   else {
		//     console.log('Success setting wallpaper.');
		//   }
		// });

		// this.platform.ready().then(() => {
		// 	console.log('----');
		// 	console.log(window);
		// 	console.log('----');
	 //      window.plugins.wallpaper.setImage(url);
	      // var cordovaCall =   (<any>window).setImage(url);
	      //   console.log("values of call",cordovaCall)
	      //cordovaCall.call('Michele Verratti');

	   // });
		
   		
 	// 	window.plugins.wallpaper.setImage('url', function(error) {
		//   if (error) {
		//     console.error(error);
		//   }
		//   else {
		//     console.log('Success setting wallpaper.');
		//   }
		// });
   }
}