import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Level } from '../../shared/interfaces/level';
import {
  CONSTANTS_LEVEL as _CONSTANTS_LEVEL,
  CONSTANTS_LANGUAGE as _CONSTANTS_LANGUAGE,
} from '../../shared/CONSTANTS';
import { Select, Store } from '@ngxs/store';
import { CustomValidators } from '../../shared/helpers/custom-validators';
import { Observable, Subscription } from 'rxjs';
import { LevelState } from '../../shared/store/level/level.state';
import {
  AddLevel,
  SetSelectedLevel,
  UpdateLevel,
} from '../../shared/store/level/level.action';

@Component({
  selector: 'lang-form',
  templateUrl: './form-language.component.html',
  styleUrls: ['./form-language.component.scss'],
})
export class FormLanguageComponent implements OnInit, AfterViewInit, OnDestroy {
  @Select(LevelState.getSelectedLevel) levelLanguage$!: Observable<Level>;

  levelLanguage: Level | null | undefined = null;
  subscriptions: Subscription[] = [];

  form = this.fb.group({
    id: [''],
    lang: ['', Validators.required],
    levelSpeak: ['', Validators.required],
    levelWrite: ['', Validators.required],
    levelComprehension: ['', Validators.required],
  });
  CONSTANTS_LEVEL = _CONSTANTS_LEVEL;
  CONSTANTS_LANGUAGE = _CONSTANTS_LANGUAGE;
  constructor(public fb: FormBuilder, public store: Store) {}

  ngOnInit(): void {}

  onSubmit() {
    const value: any = this.form.value;
    if (this.levelLanguage) {
      this.subscriptions.push(
        this.store
          .dispatch(new UpdateLevel(value, Number(this.form.value.id)))
          .subscribe(() => {
            this.resetForm();
          })
      );
    } else {
      this.subscriptions.push(
        this.store.dispatch(new AddLevel(value)).subscribe(() => {
          this.resetForm();
        })
      );
    }
  }

  resetForm() {
    this.form.reset();
    this.store.dispatch(new SetSelectedLevel(null));
  }

  public customErrorField = (controlName: string, errorName: string) => {
    return CustomValidators.customErrorField(this.form, controlName, errorName);
  };

  public displayFieldMessageError = (controlName: string) => {
    return CustomValidators.displayFieldMessageError(this.form, controlName);
  };

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.levelLanguage$.subscribe((level) => {
        if (level) {
          this.form.patchValue({
            id: level.id?.toString(),
            lang: level.lang || '',
            levelComprehension: level.levelComprehension || '',
            levelWrite: level.levelWrite || '',
            levelSpeak: level.levelSpeak || '',
          });
        }
        this.levelLanguage = level;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
