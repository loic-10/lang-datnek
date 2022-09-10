import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CONSTANTS_LANGUAGE as _CONSTANTS_LANGUAGE } from './shared/CONSTANTS';
import { StatusModal } from './shared/interfaces/status-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  modalState: 'close' | 'open' = 'close';
  CONSTANTS_LANGUAGE = _CONSTANTS_LANGUAGE;
  lang = { key: 'fr', value: 'francais' };

  constructor(public translate: TranslateService) {
    translate.addLangs(this.CONSTANTS_LANGUAGE.map(({ key }) => key));
    translate.use(this.lang.key);
  }

  modalStateHandler($event: StatusModal) {
    this.modalState = $event;
  }

  changeLang(lang: { key: string; value: string }) {
    this.lang = lang;
    this.translate.use(this.lang.key);
  }
}
