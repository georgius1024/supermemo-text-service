import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { AlertService } from '../alert.service';
import { TrainingService, VocabularyItem } from '../training.service';

@Component({
  selector: 'app-word-selector',
  templateUrl: './WordSelector.component.html',
  styleUrls: ['./WordSelector.component.scss']
})

export class WordSelectorComponent implements OnInit {
  @Output() select = new EventEmitter<VocabularyItem[]>();
  public selectedWords: VocabularyItem[] = [];
  public testWord: VocabularyItem;
  constructor(private alertService: AlertService, private trainingService: TrainingService) { }

  ngOnInit() {
    this.refreshWords();
  }

  refreshWords() {
    this.trainingService.getNewWords$()
    .subscribe((list: VocabularyItem[]) => {
      this.selectedWords = list;
    });
  }

  requestConfirm(item: VocabularyItem) {
    this.testWord = item;
  }

  closeConfirmDialog() {
    this.testWord = null;
  }

  checkWordIsConfirmed(outcome: boolean) {
    if (outcome) {
      this.selectedWords = this.selectedWords.filter(e => e.word !== this.testWord.word);
      this.trainingService.getAdditionalWord$(this.selectedWords)
      .subscribe((item: VocabularyItem) => {
        this.selectedWords.push(item);
      });
      this.alertService.add({
        className: 'success',
        message: `'Слово "${this.testWord.word}" уже изучено ранее и удаляется из программы`
      });
    } else {
      this.alertService.add({
        className: 'warning',
        message: `'Неправильный перевод слова "${this.testWord.word}"`
      });
    }
    this.closeConfirmDialog();
  }

  done() {
    this.select.emit(this.selectedWords);
    this.refreshWords();
  }
}
