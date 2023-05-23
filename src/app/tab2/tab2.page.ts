import { Component } from '@angular/core';
import { ActionSheetController, IonicModule } from '@ionic/angular';
// import { ExploreContainerComponent } from '../explore-container/explore-container.component';
// import { BluetoothLe } from '@capacitor-community/bluetooth-le';
import { BLE } from '@ionic-native/ble/ngx';
// import { NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType } from '@capacitor/camera';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  // directives: [NgForOf],
  

  
})
export class Tab2Page {
  devices: any[] = [];
  statusMessage: string | undefined;
  image: any;

  constructor(public actionSheetController: ActionSheetController, private ble: BLE, private socialSharing:SocialSharing) { }

imageUrl: string | undefined;
peripheral:any;
chemin : string | undefined;
chemin2: string | undefined;
list_image: String[]  = [];
imageBase64!: string | String;

handleShare(image: any){
  this.socialSharing.share("Message: Hey!","titre: mon image", image)
  .then(res=>
    {console.log("Launched views", res)})
    .catch(err=>
      {console.log("Error launching views", err)
  });

}

  startScan() {
    this.devices = [];
    this.ble
      .scan([], 5)
      .subscribe((device) => this.onDeviceDiscovered(device),);
  }

  onDeviceDiscovered(device: any) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.devices.push(device);
  }

  connectToDevice(device: any) {
    this.statusMessage = 'Connecting to ' + device.name || device.id ;

    this.ble
      .connect(device.id)
      .subscribe(
        (peripheral) => this.onConnected(peripheral),
        (peripheral) => this.onDeviceDisconnected(peripheral)
      );
  }

  onConnected(peripheral:any) {
    this.statusMessage = 'Connected to ' + (peripheral.name || peripheral.id);
  }

  onDeviceDisconnected(peripheral: { name: any; id: any; } ) {
    this.statusMessage = 'Disconnected ' + (peripheral.name || peripheral.id);
  }



  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Settings',
      buttons: [
        {
          text: 'déconnecter',
          role: 'destructive',
          handler: () => { console.log('delete clicked'); }
        },
        {
          text: 'oublier',
          icon: 'trash',
          handler: () => { this.onDeviceDisconnected(this.peripheral); }
        },
        {
          text: 'Partager',
          icon: 'share',
          handler: () => { this.handleShare(Image); }
        }
      ]
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  
  // async takePicture(){
  //   const image = await Camera.getPhoto({
  //   quality: 90,
  //   allowEditing: true,
  //   resultType: CameraResultType.Uri
  //   });
  //  alert(JSON.stringify(image));
  
  //   this.imageUrl = image.webPath;
  //   }

  
    async takePicture(){
      const image= await Camera.getPhoto ({
      quality:90,
      allowEditing:true,
      resultType: CameraResultType.Base64
  
      });
     
  
      var imageUrl= "data: image/png;base64,"+image.base64String;//recupere l'image en string
      this.imageBase64= imageUrl;
      console.log(image);
      this.chemin2 = imageUrl;
      this.list_image.push(this.imageBase64)// met l'image enregistre dans le tableau
  
      
    }

}





  // async  scanDevices() {
  //   interface Device {
  //         id: string;
  //         name: string;
  //         // ...
  //       }
  //   const devices: Device[] = [];
  
  //   // start scanning for devices
  //   const scan = await BluetoothLe.requestLEScan();
  
  //   // listen for scan results
  //   BluetoothLe.addListener('onLeScan', (result) => {
  //     devices.push(result.device);
  //   });
  
  //   // stop scanning after 10 seconds
  //   setTimeout(async () => {
  //     await BluetoothLe.stopLEScan();
  
  //     // return the list of devices
  //     console.log(devices);
  //   }, 10000);
  // }


  // async  scanDevices() {
  //   interface Device {
  //     id: string;
  //     name: string;
  //     // ...
  //   }
    
  //   // start scanning for devices
  //   const scan = await BluetoothLe.requestLEScan();
  
  //   // declare devices inside the function
  //   const devices: Device[] = [];
  
  //   // listen for scan results
  //   const onLeScan = (result: any) => {
  //     devices.push(result.device);
  //   };

  //   BluetoothLe.addListener('onLeScan', onLeScan);
  
  //   // stop scanning after 10 seconds
  //   setTimeout(async () => {
  //     // BluetoothLe.removeScanListener(onLeScan);
  //     await BluetoothLe.stopLEScan();
  
  //     // return the list of devices
  //     console.log(devices);
  //   }, 10000);
  // }
  


