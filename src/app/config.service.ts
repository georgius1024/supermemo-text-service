import { Injectable } from '@angular/core';
const storageKey = 'supermemo-config';

export interface Config {
  wordsInTrainingQuantity: number;
  trainingSessionsNecessary: number;
  trainingLessonWordsQuantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Config;
  constructor() {
    this.config = {
      wordsInTrainingQuantity: 36,
      trainingSessionsNecessary: 5,
      trainingLessonWordsQuantity: 5
    };
    if (localStorage.getItem(storageKey)) {
      try {
        this.config = JSON.parse(localStorage.getItem(storageKey));
      } catch {
      }
    }
  }

  private store() {
    localStorage.setItem(storageKey, JSON.stringify(this.config));
  }

  public get(): Config {
    return Object.assign({}, this.config);
  }

  public set(config: Config) {
    this.config = config;
    this.store();
  }

}
