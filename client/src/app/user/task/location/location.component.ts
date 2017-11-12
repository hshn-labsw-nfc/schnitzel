import {Component, Input, OnInit} from '@angular/core';
import {Location} from '../../location';
import {UserLocationCameraPopupComponent} from './location-camera-popup/location-camera-popup.component';
import {UserLocationMapPopupComponent} from './location-map-popup/location-map-popup.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {CameraConfig} from './camera-config';

@Component({
  selector: 'app-user-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class UserLocationComponent implements OnInit {
  @Input() location: Location;

  backCamera: boolean = null;
  frontCamera: boolean = null;

  cameraReady = false;
  cameraChecked = false;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    if (this.cameraChecked === false) {
      this.checkCameras();
    }
  }

  scannedTag(tag: string): void {
    const suffix = tag.slice(tag.indexOf('/tag/'), tag.length);
    console.log('suffix=', suffix);
    window.open(location.origin + suffix, '_self');
  }

  openCamera() {
    if (this.cameraReady) {
      const cameraConfig: CameraConfig = {front: this.frontCamera, back: this.backCamera};
      const d = this.dialog.open(UserLocationCameraPopupComponent, {data: cameraConfig});
      d.afterClosed().subscribe(result => {
        // Force stop the stream
        d.componentInstance.stopStream();
        // Did we scan something?
        if (<string>result) {
          if ((<string>result).indexOf('/tag/') > -1) {
            this.scannedTag(result);
          } else {
            this.snackBar.open('QR Code konnte nicht korrekt gescanned werden', null, {
              duration: 2000,
              horizontalPosition: 'center'
            });
          }
        }
      });
    } else {
      if (this.cameraChecked === true) {
        this.snackBar.open('Wir konnten keine Kamera finden', null, {
          duration: 2000,
          horizontalPosition: 'center'
        });
      } else {
        this.snackBar.open('Wir checken gerade deine Kameras, gib uns bitte noch eine Sekunde', null, {
          duration: 2000,
          horizontalPosition: 'center'
        });
      }
    }
  }

  checkCameras(): void {
    const backCamera: Promise<MediaStream> = this.checkBackCamera();
    backCamera.then(response => {
      this.backCamera = true;
      console.log('We have a back camera');
      response.getTracks().forEach(function (track) {
        track.stop();
      });
    }).catch(response => {
      this.backCamera = false;
      console.log(response);
    });

    const frontCamera: Promise<MediaStream> = this.checkFrontCamera();
    frontCamera.then(response => {
      this.frontCamera = true;
      console.log('We have a front camera');
      response.getTracks().forEach(function (track) {
        track.stop();
      });
    }).catch(response => {
      this.frontCamera = false;
      console.log(response);
    });

    Promise.all([backCamera, frontCamera].map(p => p.catch(e => e))).then(() => {
      this.cameraChecked = true;
      if (this.backCamera === true || this.frontCamera === true) {
        this.cameraReady = true;
      }
    });
  }

  checkBackCamera(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia(CameraConfig.backConstraints);
  }

  checkFrontCamera(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia(CameraConfig.frontConstraints);
  }

  openMap() {
    const d = this.dialog.open(UserLocationMapPopupComponent, {
      data: {
        location: this.location
      }
    });
  }
}
