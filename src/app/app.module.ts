import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SearchModule} from './components/search/search.module';
import {BusLinesModule} from './components/bus-lines/bus-lines.module';
import {HttpClientModule} from '@angular/common/http';
import {LineTypeModule} from './components/line-type/line-type.module';
import { LinesComponent } from './pages/lines/lines.component';
import {AppRoutingModule} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    LinesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SearchModule,
    BusLinesModule,
    LineTypeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
