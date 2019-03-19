import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { AlertService } from '../alert.service';
import allWords from './vocabulary';
const storageKey = 'known-words';
export interface VocabularyItem {
  word: string;
  transcription: string;
  translation: string;
}
@Component({
  selector: 'app-word-selector',
  templateUrl: './WordSelector.component.html',
  styleUrls: ['./WordSelector.component.scss']
})
export class WordSelectorComponent implements OnInit {
  @Input() completedWord: Array<string>;
  @Output() select = new EventEmitter<Array<VocabularyItem>>();
  knownWords: Array<string> = [];
  selectedWords: Array<VocabularyItem> = [];
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      try {
        this.knownWords = JSON.parse(stored);
      } catch (error) {
        this.knownWords = [];
      }
    }
    allWords.sort(() => Math.random() - 0.5);
    this.selectedWords = [];
    this.selectWords();
  }

  availableWords(): Array<VocabularyItem> {
    const selected = this.selectedWords.map(e => e.word);
    return (allWords as Array<VocabularyItem>)
      .filter(e => !this.knownWords.includes(e.word) && !this.completedWord.includes(e.word) && !selected.includes(e.word));
  }

  removeWord(word: string) {
    this.selectedWords = this.selectedWords.filter(e => e.word !== word);
    this.addKnownWord(word);
    this.selectWords();
  }

  addKnownWord(word: string) {
    this.knownWords.push(word);
    localStorage.setItem(storageKey, JSON.stringify(this.knownWords));
  }


  selectWords(max: number = 5) {
    for (const item of this.availableWords()) {
      if (this.selectedWords.length >= max) {
        break;
      } else {
        this.selectedWords.push(item);
      }
    }
  }

  done() {
    this.select.emit(this.selectedWords);
  }
}
