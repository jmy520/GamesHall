import { RestConfig } from '../config/RestConfig';
import { isPlatform } from '@ionic/core';

export class PictureHelper {
  static fetchImage(fileName: string): string {
    return (isPlatform(window, "cordova") ? RestConfig.PHONE_BASE_URL : RestConfig.BASE_URL) + ":" + (isPlatform(window, "cordova") ? RestConfig.PHONE_STREAM_PORT : RestConfig.STREAM_PORT) + "/file/readImg?fileName=" + fileName;
  }
}