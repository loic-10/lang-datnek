import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  AddLevel,
  DeleteLevel,
  GetLevels,
  SetSelectedLevel,
  UpdateLevel,
} from './level.action';
import { tap } from 'rxjs/operators';
import { LevelService } from '../../services/level.service';
import { Level } from '../../interfaces/level';
import { Injectable } from '@angular/core';

export class LevelStateModel {
  levels: Level[] | undefined;
  selectedLevel: Level | null | undefined;
}

@State<LevelStateModel>({
  name: 'levels',
  defaults: {
    levels: [],
    selectedLevel: null,
  },
})
@Injectable({
  providedIn: 'root',
})
export class LevelState {
  constructor(private levelService: LevelService) {}

  @Selector()
  static getLevelList(state: LevelStateModel) {
    return state.levels;
  }

  @Selector()
  static getSelectedLevel(state: LevelStateModel) {
    return state.selectedLevel;
  }

  @Action(GetLevels)
  getLevels({ getState, setState }: StateContext<LevelStateModel>) {
    return this.levelService.fetchLevels().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          levels: result,
        });
      })
    );
  }

  @Action(AddLevel)
  addLevel(
    { getState, patchState }: StateContext<LevelStateModel>,
    { payload }: AddLevel
  ) {
    return this.levelService.addLevel(payload).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          levels: [...(state.levels || []), result],
        });
      })
    );
  }

  @Action(UpdateLevel)
  updateLevel(
    { getState, setState }: StateContext<LevelStateModel>,
    { payload, id }: UpdateLevel
  ) {
    return this.levelService.updateLevel(payload, id).pipe(
      tap((result) => {
        const state = getState();
        const levelList = [...(state.levels || [])];
        const levelIndex = levelList.findIndex((item) => item.id === id);
        levelList[levelIndex] = result;
        setState({
          ...state,
          levels: levelList,
        });
      })
    );
  }

  @Action(DeleteLevel)
  deleteLevel(
    { getState, setState }: StateContext<LevelStateModel>,
    { id }: DeleteLevel
  ) {
    return this.levelService.deleteLevel(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = (state.levels || []).filter(
          (item) => item.id !== id
        );
        setState({
          ...state,
          levels: filteredArray,
        });
      })
    );
  }

  @Action(SetSelectedLevel)
  setSelectedLevelId(
    { getState, setState }: StateContext<LevelStateModel>,
    { payload }: SetSelectedLevel
  ) {
    const state = getState();
    setState({
      ...state,
      selectedLevel: payload,
    });
  }
}
