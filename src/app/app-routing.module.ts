import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {ScanComponent} from "./pages/scan/scan.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {ResultsComponent} from "./pages/results/results.component";
import {ResultInfoComponent} from "./pages/result-info/result-info.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  { path: 'scan', component: ScanComponent, canActivate: [AuthGuard]},
  { path: 'scan-results', component: ResultsComponent, canActivate: [AuthGuard]},
  { path: 'scan-results/:id', component: ResultInfoComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
