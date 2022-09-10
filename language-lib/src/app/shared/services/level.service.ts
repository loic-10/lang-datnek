import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Level } from '../interfaces/level';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  private levelsUrl = 'api/levels/';
  constructor(private http: HttpClient) {}

  fetchLevels() {
    return this.http.get<Level[]>(this.levelsUrl);
  }

  deleteLevel(id: number) {
    return this.http.delete(this.levelsUrl + id);
  }

  addLevel(payload: Level) {
    return this.http.post<Level>(this.levelsUrl, payload);
  }

  updateLevel(payload: Level, id: number) {
    return this.http.put<Level>(this.levelsUrl + id, payload);
  }
}
