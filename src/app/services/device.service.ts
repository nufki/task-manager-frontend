import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {DeviceType} from "./device-type.enum";

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private screenWidth: number;
  private deviceType = new BehaviorSubject<DeviceType>(DeviceType.DESKTOP); // Initialize with 'desktop'

  constructor() {
    this.screenWidth = window.innerWidth;
    this.updateDeviceType(); // Ensure device type is set initially
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
      this.updateDeviceType();
    });
  }

  public updateDeviceType() {
    if (this.screenWidth <= 768) {
      this.deviceType.next(DeviceType.MOBILE);
    } else if (this.screenWidth <= 1024) {
      this.deviceType.next(DeviceType.TABLET);
    } else {
      this.deviceType.next(DeviceType.DESKTOP);
    }
  }

  getDeviceType() {
    return this.deviceType.asObservable();
  }
}
