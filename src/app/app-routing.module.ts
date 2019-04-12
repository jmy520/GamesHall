import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SafeBoxValidateComponent } from './safe-box-validate/safe-box-validate.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'activity', loadChildren: './activity/activity.module#ActivityPageModule' },
  { path: 'promote', loadChildren: './promote/promote.module#PromotePageModule' },
  { path: 'recharge', loadChildren: './recharge/recharge.module#RechargePageModule' },
  { path: 'refresh-chip', loadChildren: './refresh-chip/refresh-chip.module#RefreshChipPageModule' },
  { path: 'safe-box', loadChildren: './safe-box/safe-box.module#SafeBoxPageModule' },
  { path: 'withdrawal', loadChildren: './withdrawal/withdrawal.module#WithdrawalPageModule' },
];

@NgModule({
  declarations: [ 
    LoginComponent,
    RegisterComponent,
    SafeBoxValidateComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), FormsModule
  ],
  entryComponents: [LoginComponent, RegisterComponent, SafeBoxValidateComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
