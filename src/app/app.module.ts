import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrblmStmt1Component } from './prblm-stmt1/prblm-stmt1.component';
import { PrblmStmt2Component } from './prblm-stmt2/prblm-stmt2.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpaceSectionComponent } from './space-section/space-section.component';
import { UpdateSectionComponent } from './update-section/update-section.component';

@NgModule({
  declarations: [
    AppComponent,
    PrblmStmt1Component,
    PrblmStmt2Component,
    HeaderComponent,
    FooterComponent,
    SpaceSectionComponent,
    UpdateSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
