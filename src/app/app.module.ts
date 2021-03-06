import { MainModule } from './main/main.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MissingTranslationService } from 'src/services/missing-translation.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomePageComponent } from './welcome/welcome-page/welcome-page.component';
import { InputComponent } from './custom-UI/input/input.component';
import { UserDirective } from './directives/user.directive';
import { UserRolesDirective } from './directives/user-roles.directive';
import { DistancesComponent } from './custom-UI/competitions/distances/distances.component';
import { CustomUiModule } from './custom-UI/custom-ui.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SignInComponent,
    SignUpComponent,
    WelcomePageComponent,
    UserDirective,
    UserRolesDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationService }
    }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MainModule,
    CustomUiModule
  ],
  providers: [
    [{ provide: "BASE_URL", useFactory: getBaseUrl }],
    [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
