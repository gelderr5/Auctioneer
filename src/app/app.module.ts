import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './components/mainpage/header/header.component';
import { HomeComponent } from './components/mainpage/home/home.component';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import { Overview1Component } from './components/offers/overview1/overview1.component';
import { Overview2Component } from './components/offers/overview2/overview2.component';
import { Overview3Component } from "./components/offers/overview3/overview3.component";
import { Overview4Component} from "./components/offers/overview4/overview4.component";
import { Overview5Component } from "./components/offers/overview5/overview5.component";
import { Overview6Component } from "./components/offers/overview6/overview6.component";
import { Detail2Component } from './components/offers/detail2/detail2.component';
import { Detail3Component } from "./components/offers/detail3/detail3.component";
import { Detail4Component } from "./components/offers/detail4/detail4.component";
import { Detail41Component } from "./components/offers/detail41/detail41.component";
import { Detail42Component } from "./components/offers/detail42/detail42.component";
import { Detail5Component } from "./components/offers/detail5/detail5.component";
import { Detail6Component } from "./components/offers/detail6/detail6.component";
import { ErrorpageComponent } from './components/mainpage/errorpage/errorpage.component';
import { CanDeactivateGuardService } from "./services/can-deactivate-guard.service";
import {OffersService2} from "./services/offers2.service";
import {AppFbComponent} from "./app-fb.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'offers/overview1', component: Overview1Component },
  { path: 'offers/overview2', component: Overview2Component },
  { path: 'offers/overview3', component: Overview3Component },
  { path: 'offers/overview4', component: Overview4Component, children: [
      { path: 'edit', component: Detail4Component}
    ]},
  { path: 'offers/overview41', component: Overview4Component, children: [
      { path: 'edit', component: Detail41Component, canDeactivate: [CanDeactivateGuardService]}
    ]},
  { path: 'offers/overview42', component: Overview4Component, children: [
      { path: 'edit', component: Detail42Component}
    ]},
  { path: 'offers/overview5', component: Overview5Component, children: [
      { path: 'id', component: Detail5Component }
    ]},
  { path: 'offers/overview6', component: Overview6Component, children: [
      { path: 'edit', component: Detail6Component }
    ]},
  { path: 'not-found', component: ErrorpageComponent, data: {message: 'There is no known function for the current' +
        ' route at the end of your URL'}},
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavBarComponent,
    Overview1Component,
    Overview2Component,
    Overview3Component,
    Overview4Component,
    Overview5Component,
    Overview6Component,
    Detail2Component,
    Detail3Component,
    Detail4Component,
    Detail41Component,
    Detail42Component,
    Detail5Component,
    Detail6Component,
    ErrorpageComponent,
    AppFbComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {enableTracing: true, useHash: true}),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CanDeactivateGuardService, OffersService2],
  bootstrap: [AppFbComponent]
})
export class AppModule { }
