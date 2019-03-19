import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
const storageKey = 'supermemo-pool';

export interface VocabularyItem {
  word: string;
  transcription: string;
  translation: string;
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
  public getNewWords$(count: number = 5): Observable<VocabularyItem[]> {
    const result = new Subject<VocabularyItem[]>();
    const notExistsInPool = (item: VocabularyItem) => {
      return !this.pool.find((poolItem: VocabularyItem) => poolItem.word === item.word);
    }
    this.fetch$()
    .subscribe((vocabulary: VocabularyItem[]) => {
      const newWords = vocabulary.filter(notExistsInPool).slice(0, count);
      result.next(newWords);
    });
    return result;
  }

}
