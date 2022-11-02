import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Testdata } from './testdata';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //this is injecting because we will use http
    HttpClientInMemoryWebApiModule.forRoot(Testdata), //we have imported Testdata to use its data in observalbe as like api
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
