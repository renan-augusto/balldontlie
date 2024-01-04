import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoFieldModule, PoModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { SelectComponent } from './shared/select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { PoWidgetModule } from '@po-ui/ng-components';
import { CardComponent } from './shared/card/card.component';
import { SearchComponent } from './shared/search/search.component';
import { PoSearchModule } from '@po-ui/ng-components';



@NgModule({
  declarations: [
    AppComponent,
    SelectComponent,
    HomeComponent,
    CardComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    FormsModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoWidgetModule,
    PoSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
