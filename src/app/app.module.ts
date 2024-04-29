import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoComboComponent, PoFieldModule, PoLoadingModule, PoModalModule, PoModule } from '@po-ui/ng-components';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { SelectComponent } from './shared/select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { PoWidgetModule } from '@po-ui/ng-components';
import { CardComponent } from './shared/card/card.component';
import { SearchComponent } from './shared/search/search.component';
import { PoSearchModule } from '@po-ui/ng-components';
import { MenuComponent } from './shared/menu/menu.component';
import { PoMenuModule } from '@po-ui/ng-components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlayersComponent } from './pages/players/players.component';
import { FranchisesComponent } from './pages/franchises/franchises.component';
import { LoadingOverlayComponent } from './shared/loading-overlay/loading-overlay.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [
    AppComponent,
    SelectComponent,
    HomeComponent,
    CardComponent,
    SearchComponent,
    MenuComponent,
    PlayersComponent,
    FranchisesComponent,
    LoadingOverlayComponent,
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
    PoSearchModule,
    PoMenuModule,
    RouterModule,
    FontAwesomeModule,
    PoModalModule,
    PoLoadingModule,
    PaginatorModule,
    
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi:  true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
