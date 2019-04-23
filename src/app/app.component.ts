import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserStore } from './services/storage/user-store';
import { Runtime } from 'src/app/services/Runtime';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private userStore: UserStore,
    private platform: Platform,
    public runtime: Runtime,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.hide();
      this.splashScreen.hide();
      // 加载用户信息
      this.userStore
        .load()
        .then(user => {
          if (user) {
            this.runtime.postLogin(user, false);
          }
        })
        .catch(() => {
        });
    });
  }
}
