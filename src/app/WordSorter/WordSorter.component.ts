import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { VocabularyItem } from '../training.service';

@Component({
  selector: 'app-word-sorter',
  templateUrl: './WordSorter.component.html',
  styleUrls: ['./WordSorter.component.scss']
})
export class WordSorterComponent implements OnInit {
  @Input() trainingList: Array<VocabularyItem>;
  randomizedTranslations: Array<string>;
  errors: Array<VocabularyItem> = [];
  success = false;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.shuffle();
  }

  words(): Array<string> {
    return this.trainingList.map(item => item.word);
  }

  translations(): Array<string> {
    return this.trainingList.map(item => item.translation);
  }

  shuffle()  {
    this.randomizedTranslations = [...this.translations()];
    this.randomizedTranslations.sort(() => Math.random() - 0.5 );
  }

  checkCorrect() {
    let errors = 0
    this.randomizedTranslations.forEach((translation: string, index: number) => {
      if (this.trainingList[index].translation !== translation) {
        this.alertService.add({
          className: 'error',
          message: this.trainingList[index].word + '=>' + this.trainingList[index].translation,
          icon: 'error-standart'
        });
        errors++;
      }
    });
    if (!errors) {
      this.alertService.add({
        className: 'success',
        message: 'Everything is cool',
        icon: 'success-standart'
      });
  }
  }


}
