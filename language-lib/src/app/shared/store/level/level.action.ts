import { Level } from '../../interfaces/level';

export class AddLevel {
  static readonly type = '[Level] Add';

  constructor(public payload: Level) {}
}

export class GetLevels {
  static readonly type = '[Level] Get';
}

export class UpdateLevel {
  static readonly type = '[Level] Update';

  constructor(public payload: Level, public id: number) {}
}

export class DeleteLevel {
  static readonly type = '[Level] Delete';

  constructor(public id: number) {}
}

export class SetSelectedLevel {
  static readonly type = '[Level] Set';

  constructor(public payload: Level | null | undefined) {}
}
