import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MeasurementsComponent } from './pages/measurements/measurements.component';

const routes: Routes = [
  // Logged In
  { path: '', component: MeasurementsComponent, canActivate: [AuthGuard] },
  // Not Logged In
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
