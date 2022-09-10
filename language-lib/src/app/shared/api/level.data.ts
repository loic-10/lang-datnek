import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Level } from '../interfaces/level';

export class LevelData implements InMemoryDbService {
  createDb(): { levels: Level[] } {
    const levels: Level[] = [
      {
        id: 1,
        levelComprehension: 'courant',
        levelSpeak: 'courant',
        levelWrite: 'courant',
        lang: 'fr',
      },
      {
        id: 2,
        levelComprehension: 'courant',
        levelSpeak: 'courant',
        levelWrite: 'courant',
        lang: 'en',
      },
    ];
    return { levels };
  }
}
