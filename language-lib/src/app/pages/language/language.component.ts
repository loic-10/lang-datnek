import { Component, Input, OnInit } from '@angular/core';
import { Level } from '../../shared/interfaces/level';
import { DetailLanguageComponent } from '../detail-language/detail-language.component';
import { LevelState } from '../../shared/store/level/level.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { GetLevels } from '../../shared/store/level/level.action';

@Component({
  selector: 'lang',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  @Input() detailLanguageModal!: DetailLanguageComponent;

  @Select(LevelState.getLevelList) levels$!: Observable<Level[]>;

  levelsLanguages: Level[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetLevels());
  }
}
