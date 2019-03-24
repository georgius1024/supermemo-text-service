import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
const storageKey = 'supermemo-pool';

export interface VocabularyItem {
  word: string;
  transcription: string;
  translation: string;
  progress?: number;
  errors?: number;
  last?: any;
}

function itemNotInList(list: VocabularyItem[]) {

  return (item: VocabularyItem) => {
    return !list.find((poolItem: VocabularyItem) => poolItem.word === item.word);
  };
}

function random() {
  return Math.random() - 0.5;
}


@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private pool: VocabularyItem[] = [];
  constructor( private http: HttpClient ) {
    if (localStorage.getItem(storageKey)) {
      try {
        this.pool = JSON.parse(localStorage.getItem(storageKey));
      } catch {
        this.pool = [];
      }
    }
  }

  private fetch$(): Observable<VocabularyItem[]> {
    return this.http.get('./assets/vocabulary.json') as Observable<VocabularyItem[]>;
  }

  public getVocabulary$(): Observable<VocabularyItem[]> {
    const result = new Subject<VocabularyItem[]>();
    this.fetch$().subscribe((vocabulary) => {
      result.next(vocabulary as VocabularyItem[]);
    });
    return result;
  }

  public getNewWords$(quantity: number = 5): Observable<VocabularyItem[]> {
    const result = new Subject<VocabularyItem[]>();
    const notExistsInPool = itemNotInList(this.pool);
    this.fetch$()
    .subscribe((vocabulary: VocabularyItem[]) => {
      const newWords = vocabulary
      .filter(notExistsInPool)
      .sort(random)
      .slice(0, quantity);
      result.next(newWords);
    });
    return result;
  }

  public getAdditionalWord$(skipList: VocabularyItem[] = []): Observable<VocabularyItem> {
    const result = new Subject<VocabularyItem>();
    const notExistsInPool = itemNotInList(this.pool);
    const notExistsInSkipList = itemNotInList(skipList);
    this.fetch$()
    .subscribe((vocabulary: VocabularyItem[]) => {
      const newWord = vocabulary
        .filter(notExistsInPool)
        .filter(notExistsInSkipList)
        .sort(random)
        .slice(0, 1);
      result.next(newWord[0]);
    });
    return result;
  }

  public getRandomWords$(skip: VocabularyItem, quantity: number = 5): Observable<VocabularyItem[]> {
    const result = new Subject<VocabularyItem[]>();
    const notSkipped = itemNotInList([skip]);
    this.fetch$()
    .subscribe((vocabulary: VocabularyItem[]) => {
      const words = vocabulary
      .filter(notSkipped)
      .sort(random)
      .slice(0, quantity);
      result.next(words);
    });
    return result;
  }

  public getPool(): VocabularyItem[] {
    return this.pool;
  }

  public addToPool(portion: VocabularyItem[]) {
    this.pool = this.pool.concat(portion);
    this.updatePool();
  }

  updatePool(): void {
    localStorage.setItem(storageKey, JSON.stringify(this.pool));
  }

  public getTrainingList(quantity: number, maxProgress: number): VocabularyItem[] {
    return [...this.pool]
    .filter(v => !v.progress || v.progress < maxProgress)
    .sort(random)
    .slice(0, quantity);
  }

  public putTrainingList(list: VocabularyItem[]): void {
    this.pool.forEach(p => {
      list.forEach(l => {
        if (p.word === l.word) {
          p = l;
        }
      });
    });
  }

}
