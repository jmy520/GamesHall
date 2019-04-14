import { RestConfig } from '../config/RestConfig';

export class PictureHelper {
  static fetchImage(fileName: string): string {
    return RestConfig.BASE_URL + ":" + RestConfig.STREAM_PORT + "/file/readImg?fileName=" + fileName;
  }
}