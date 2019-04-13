import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'activity', loadChildren: './pages/activity/activity.module#ActivityPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'promote', loadChildren: './pages/promote/promote.module#PromotePageModule' },
  { path: 'recharge', loadChildren: './pages/recharge/recharge.module#RechargePageModule' },
  { path: 'refresh-chip', loadChildren: './pages/refresh-chip/refresh-chip.module#RefreshChipPageModule' },
  { path: 'safe-box', loadChildren: './pages/safe-box/safe-box.module#SafeBoxPageModule' },
  { path: 'withdrawal', loadChildren: './pages/withdrawal/withdrawal.module#WithdrawalPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
