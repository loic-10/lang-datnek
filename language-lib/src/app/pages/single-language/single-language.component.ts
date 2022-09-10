import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Level } from '../../shared/interfaces/level';
import { DetailLanguageComponent } from '../detail-language/detail-language.component';
import { Store } from '@ngxs/store';
import {
  DeleteLevel,
  SetSelectedLevel,
} from '../../shared/store/level/level.action';

@Component({
  selector: 'lang-single',
  templateUrl: './single-language.component.html',
  styleUrls: ['./single-language.component.scss'],
})
export class SingleLanguageComponent implements OnInit {
  @Input() levelLanguage!: Level;
  @Input() detailLanguageModal!: DetailLanguageComponent;
  @Output() editHandler: EventEmitter<Level> = new EventEmitter<Level>();
  constructor(private store: Store) {}

  ngOnInit(): void {}

  startDetail() {
    this.detailLanguageModal.show(this.levelLanguage);
  }

  startDelete() {
    this.store.dispatch(new DeleteLevel(this.levelLanguage.id));
  }

  startUpdate() {
    this.store.dispatch(new SetSelectedLevel(this.levelLanguage));
  }
}
