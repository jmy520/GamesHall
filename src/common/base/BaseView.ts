import { LoadingController, ToastController, ModalController } from '@ionic/angular';

export abstract class BaseView {
  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController, public mModal: ModalController) { }

  /** show loading */
  protected async showLoading(message: string) {
    const loader = await this.loadingCtrl.create({
      message: message
    });
    await loader.present();
    return loader;
  }

  /** show toast */
  protected async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
    return toast;
  }
}