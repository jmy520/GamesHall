import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { RestRequestService } from './services/rest-request.service';
import { ApiService } from './services/api.service';
import { Runtime } from './services/Runtime';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SafeBoxValidateComponent } from './components/safe-box-validate/safe-box-validate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SafeBoxValidateComponent
  ],

  entryComponents: [
    LoginComponent,
    RegisterComponent,
    SafeBoxValidateComponent
  ],

  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    RestRequestService,
    ApiService,
    Runtime,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
