import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { TrainingService, VocabularyItem } from '../training.service';
const numberOfOptions = 5;
@Component({
  selector: 'app-interaction-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.sass']
})
export class TranslationComponent implements OnInit, OnChanges {
  @Input() input: VocabularyItem;
  @Output() outcome = new EventEmitter<boolean>();
  public list: VocabularyItem[] = [];
  public response: string;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.buildList();
  }
  buildList() {
    if (this.input) {
      this.trainingService.getRandomWords$(this.input, numberOfOptions)
      .subscribe((list: VocabularyItem[]) => {
        this.list = [this.input, ...list].sort(() => (Math.random() - 0.5));
      });
    } else {
      this.list = [];
    }
  }
  onSubmit() {
    this.outcome.emit(this.correctResponse());
  }

  setResponse(item: VocabularyItem) {
    this.response = item.translation;
  }

  validResponse(): boolean {
    return Boolean(this.response);
  }

  correctResponse(): boolean {
    return this.validResponse() && (this.response === this.input.translation);
  }

}
