import { ExplicitSubscribeComponent } from './explicit-subscribe/explicit-subscribe.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipeComponent } from './async-pipe/async-pipe.component';
import { AsyncPipeVer2Component } from './async-pipe-ver2/async-pipe-ver2.component';

@NgModule({
  declarations: [
    AppComponent,
    ExplicitSubscribeComponent,
    AsyncPipeComponent,
    AsyncPipeVer2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
