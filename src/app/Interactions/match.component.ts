import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { TrainingService, VocabularyItem } from '../training.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit, OnChanges {
  @Input() input: VocabularyItem[];
  @Output() outcome = new EventEmitter<boolean>();
  public randomizedList: string[];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.buildList();
  }

  buildList() {
    if (this.input) {
      this.randomizedList = this.input.map(e => e.translation);
      this.randomizedList.sort(() => Math.random() - 0.5);
    } else {
      this.randomizedList = [];
    }
  }

}
