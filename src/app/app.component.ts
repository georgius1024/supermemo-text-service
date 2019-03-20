import { Component } from '@angular/core';
import { VocabularyItem, TrainingService } from './training.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'supermemo';
  options: any;
  input: VocabularyItem;
  trainingList: Array<VocabularyItem> = [];
  constructor(private trainingService: TrainingService) {
    this.trainingService.getAdditionalWord$([]).subscribe((word: VocabularyItem) => {
      this.input = word;
    });
  }
  outcome(result: boolean) {
    alert(result)
  }
  test() {
    this.trainingService.getNewWords$(10).subscribe(all => {
      console.log(all)
    });
  }

  wordsSelected(list: Array<VocabularyItem>) {
    this.trainingList = list;
  }
}
