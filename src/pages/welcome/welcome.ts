import { Component } from '@angular/core';
import {
//  AlertController,
  IonicPage, MenuController,
  NavController,
  Platform
} from 'ionic-angular';
import {Api} from "../../providers";

import { LocalNotifications } from '@ionic-native/local-notifications';



/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(
    public navCtrl: NavController,
    private api : Api,
    private platform: Platform,
    private menu: MenuController,
    private localNotifications: LocalNotifications
  ) { }
  data: any = [];
  img: string = '../assets/img/splashbg.gif';
  myTime = setInterval(()=>{},800);
  ionViewDidEnter(){
    this.menu.enable(false);
    this.monitor();
  }
  monitor(){
    this.myTime = setInterval(()=>{
      this.api.get('monitor',{}).subscribe((response) => {
        this.data = response;
      })
    },800);
  }
  detener(){

    clearInterval(this.myTime);
  }

  alarma(mensaje:string){
    this.platform.ready().then((data) =>{
      this.localNotifications.schedule({
        id: 1,
        text: mensaje,
        sound: this.setSound(),
        data: { secret: mensaje }
      });
    });

  }

  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/shame.mp3'
    } else {
      return 'file://assets/sounds/bell.mp3'
    }
  }

  /*login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }*/
}
