import { NgModule } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  // entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    // statusbar,
    // SplashScreen,
    BLE,
    SocialSharing,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },],
  bootstrap: [AppComponent],
})
export class AppModule {}
