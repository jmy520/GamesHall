import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RestRequestService } from './services/rest-request.service';
import { ApiService } from './services/api.service';
import { Runtime } from './services/Runtime';
import { SafeBox } from './services/storage/safe-box';
import { UserStore } from './services/storage/user-store';
import { DatePipe } from '@angular/common';
import { DateUtile } from 'src/common/helper/DateUtile';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReceiveCommisionComponent } from './components/receive-commision/receive-commision.component';
import { WithdrawalRecordComponent } from './components/withdrawal-record/withdrawal-record.component';
import { SafeBoxValidateComponent } from './components/safe-box-validate/safe-box-validate.component';
import { MessageComponent } from './components/message/message.component';
import { SingleSelectComponent } from './components/single-select/single-select.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RefreshChipRatioComponent } from './components/refresh-chip-ratio/refresh-chip-ratio.component';
import { RefreshChipRecordComponent } from './components/refresh-chip-record/refresh-chip-record.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ReceiveCommisionComponent,
    WithdrawalRecordComponent,
    SafeBoxValidateComponent,
    MessageComponent,
    SingleSelectComponent,
    SettingsComponent,
    RefreshChipRatioComponent,
    RefreshChipRecordComponent
  ],

  entryComponents: [
    LoginComponent,
    RegisterComponent,
    ReceiveCommisionComponent,
    WithdrawalRecordComponent,
    SafeBoxValidateComponent,
    MessageComponent,
    SingleSelectComponent,
    SettingsComponent,
    RefreshChipRatioComponent,
    RefreshChipRecordComponent
  ],

  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    RestRequestService,
    ApiService,
    Runtime,
    NativeAudio,
    Clipboard,
    DatePipe,
    DateUtile,
    SafeBox,
    UserStore,
    HTMLAudioElement,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
