import { CookieService } from './services/cookie.service';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OnInit } from '@angular/core';
import { ReceivingService } from 'src/app/services/receiving.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService, 
    private receiving: ReceivingService, 
    private cookieService: CookieService,
    @Inject(DOCUMENT) private document: Document) { 
  }

  public ngOnInit(): void {
    
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang(this.setLanguage());
  }

  setLanguage(): string {
    let lang = this.cookieService.get('lang');
    if (lang == '') {
      this.receiving.Language.setLanguage().subscribe({
        error: (err) => {
          console.log('Error set language');
          console.log(err);
        }
      });
      lang = this.cookieService.get('lang');
    }
    this.document.documentElement.lang = lang;
    return lang;
  }
}