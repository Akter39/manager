import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public translate: TranslateService;
  constructor(translate: TranslateService) { 
    this.translate = translate;
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('ru');
  }

  public ngOnInit(): void {
    this.translate.reloadLang(this.translate.currentLang);
  }
}