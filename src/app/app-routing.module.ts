import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'activity', loadChildren: './activity/activity.module#ActivityPageModule' },
  { path: 'promote', loadChildren: './promote/promote.module#PromotePageModule' },
  { path: 'recharge', loadChildren: './recharge/recharge.module#RechargePageModule' },
  { path: 'refresh-chip', loadChildren: './refresh-chip/refresh-chip.module#RefreshChipPageModule' },
  { path: 'safe-box', loadChildren: './safe-box/safe-box.module#SafeBoxPageModule' },
  { path: 'withdrawal', loadChildren: './withdrawal/withdrawal.module#WithdrawalPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
