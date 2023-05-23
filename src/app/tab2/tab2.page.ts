import { Component } from '@angular/core';
import { ActionSheetController, IonicModule } from '@ionic/angular';
// import { ExploreContainerComponent } from '../explore-container/explore-container.component';
// import { BluetoothLe } from '@capacitor-community/bluetooth-le';
import { BLE } from '@ionic-native/ble/ngx';
// import { NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType } from '@capacitor/camera';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { subscribeOn } from 'rxjs/operators';
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
  device: any;
  active: boolean = false;

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

// handleShare() { 

//   this.socialSharing.share("Message ", "title ", "image to share url ", "url ") .then(res =>  
//              { console.log('Launched view!', res)
//       }) .catch(err => {
//              console.log('Error launching view', err)
//       });
  
//     }

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

// handleShare() {
//     if (navigator.share) {
//       navigator
//         .share({
//           files: [this.image],
//           title: 'Titre de l\'image à partager',
//           text: 'Description de l\'image à partager',
//         })
//         .then(() => console.log('Image partagée avec succès'))
//         .catch((error) => console.log('Une erreur est survenue lors du partage : ', error));
//     } else {
//       console.log('La fonction de partage n\'est pas prise en charge par ce navigateur.');
//     }
//   }

  startScan() {
    this.devices = [];
    this.active = !this.active;
    this.ble.isEnabled().then(
      () => {
        this.ble
      .scan([], 5)
      .subscribe((device) => this.onDeviceDiscovered(device),);
      },
      () => {
        console.log('Bluetooth is not enabled');
      }
      );
  }

  onDeviceDiscovered(device: any) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.devices.push(device);
  }

  connectToDevice(device: any) {
    this.statusMessage = 'Connecting to ' + this.device.name || this.device.id ;

    this.ble.connect(device.id).subscribe(
      peripheralData => {
        console.log('Connected to device:', JSON.stringify(peripheralData));
      },
      error => {
        console.log('Connection error:', error);
      }
    );

    // this.ble
    //   .connect(device.id)
    //   .subscribe(
    //     (peripheral) => this.onConnected(peripheral),
    //     (peripheral) => this.onDeviceDisconnected(peripheral)
    //   );
  }
  

  onConnected(peripheral:any) {
    this.statusMessage = 'Connected to ' + (peripheral.name || peripheral.id);
  }

  onDeviceDisconnected(peripheral: { name: any; id: any; } ) {
    this.statusMessage = 'Disconnected ' + (peripheral.name || peripheral.id);
    this.ble.disconnect(peripheral.id).then(
      () => {
        console.log('Disconnected from device:', peripheral.id);
      },
      error => {
        console.log('Disconnection error:', error);
      }
    );
  }



  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Settings',
      buttons: [
        {
          text: 'déconnecter',
          role: 'close-circle',
          handler: () => { this.onDeviceDisconnected(this.peripheral.id); }
        },
        {
          text: 'oublier',
          icon: 'trash',
          handler: () => { this.onDeviceDisconnected(this.peripheral.id); }
        },
        {
          text: 'Connecter',
          icon: 'bluetooth',
          handler: () => { this.connectToDevice(this.device.id); }
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
  


