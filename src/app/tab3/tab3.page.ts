import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Device } from "@capacitor/device";
// import { performance } from 'perf_hooks';
import { Plugins } from '@capacitor/core';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
const { Battery } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponentModule],
})
export class Tab3Page {

  deviceName!: string;
  deviceModel!: string;
  osVersion!: string;
  platform!:string;
  manufacturer!: string;
  chargingStatus!: string; 
  deviceInfo: any;
  batteryLevel!: number;
  uuid!: string;
  se!: string;
  // memoireU! : number;
  // diskFree!:number;
  // realDiskFree! : number;
  // diskTotal! : number;
  // langue! : string;

  memUsed!: number;
  realDiskFree!: number;
  realDiskTotal!: number;
  memoireOC!:number;
  language!: string ;
  constructor() {  }
  

  async ionViewDidEnter() {
    
    interface DeviceInfo {
      memory: {
        jsHeapSizeLimit: number;
        totalJSHeapSize: number;
        usedJSHeapSize: number;
      }
    }
    

    let device: DeviceInfo = {
      memory: {
        jsHeapSizeLimit: 1,
        totalJSHeapSize: 2,
        usedJSHeapSize: 3
      }
    }
    // Récupérer les informations sur le disposition
    try {

      const info = await Device.getInfo();     
       this.deviceName = info.name|| 'Unknown';
      this.deviceModel = info.model;
      this.osVersion = `${info.platform} ${info.osVersion}`;
       this.platform = info.platform;
       this.manufacturer = info.manufacturer;
       this.se = info.operatingSystem;
      //  this.memoireU=device.memory.usedJSHeapSize|| 0;
      // //  this.diskFree=info.diskFree || 0;
      //  this.realDiskFree=device.memory.jsHeapSizeLimit || 0;
      //  this.diskTotal=device.memory.totalJSHeapSize || 0;
      //  this.memoireU=info.memUsed || 0;


      this.language = navigator.language;
      if (info.memUsed !== undefined) {
        this.memUsed = info.memUsed/(1024*1024);
      }

      if (info.realDiskFree !== undefined) {
        this.realDiskFree = info.realDiskFree/(1024*1024*2024);
      }
      if (info.realDiskTotal !== undefined) {
        this.realDiskTotal = info.realDiskTotal/(1024*1024*2024);
      }

      this.memoireOC = this.realDiskTotal - this.realDiskFree/(1024*1024*2024);
      
    } catch (err) {
      console.error('Erreur lors de la récupération des informations sur le dispositif :', JSON.stringify(err));
    }

    // Récupérer le niveau de la batterie

    try {
      const batteryInfo = await Device.getBatteryInfo();
      if (batteryInfo.batteryLevel !== undefined) {
        this.batteryLevel = batteryInfo.batteryLevel*100;
      }
      this.chargingStatus = batteryInfo.isCharging ? "Charging" : "Not Charging";
    } catch (err) {
      console.error('Erreur lors de la récupération du niveau de la batterie :', JSON.stringify(err));
    }
    
  }
  
  
}
