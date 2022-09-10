import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  DetailLanguageComponent,
  FormLanguageComponent,
  LanguageComponent,
  SingleLanguageComponent,
} from './pages';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { LangColorPipe } from './shared/pipes/lang-color/lang-color.pipe';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LevelData } from './shared/api/level.data';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { LevelState } from './shared/store/level/level.state';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    FormLanguageComponent,
    LanguageComponent,
    SingleLanguageComponent,
    DetailLanguageComponent,
    LangColorPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsModule.forRoot([LevelState], {
      developmentMode: !environment.production,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    InMemoryWebApiModule.forRoot(LevelData),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
