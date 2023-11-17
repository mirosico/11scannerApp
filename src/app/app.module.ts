import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app/app.component';
import {InputTextModule} from "primeng/inputtext";
import { HomeComponent } from './pages/home/home.component';
import {authInterceptorProviders} from "./core/interceptors/auth.interceptor";
import {MenubarModule} from "primeng/menubar";
import { LoginComponent } from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PanelModule} from "primeng/panel";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "primeng/toast";
import {HttpClientModule} from "@angular/common/http";
import {MessageModule} from "primeng/message";
import {MessageService} from "primeng/api";
import { ScanComponent } from './pages/scan/scan.component';
import {CheckboxModule} from "primeng/checkbox";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { ResultsComponent } from './pages/results/results.component';
import {TableModule} from "primeng/table";
import { ResultInfoComponent } from './pages/result-info/result-info.component';
import {DialogModule} from "primeng/dialog";
import {SlicePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ScanComponent,
    ResultsComponent,
    ResultInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    MenubarModule,
    ReactiveFormsModule,
    PanelModule,
    ToastModule,
    FormsModule,
    CheckboxModule,
    ProgressSpinnerModule,
    TableModule,
    DialogModule
  ],
  providers: [authInterceptorProviders, MessageService, SlicePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
