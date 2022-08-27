import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrblmStmt1Component } from './prblm-stmt1/prblm-stmt1.component';
import { PrblmStmt2Component } from './prblm-stmt2/prblm-stmt2.component';

@NgModule({
  declarations: [
    AppComponent,
    PrblmStmt1Component,
    PrblmStmt2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
