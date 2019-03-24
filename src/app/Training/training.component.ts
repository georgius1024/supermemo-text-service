import { Component, OnInit } from '@angular/core';
import { TrainingService, VocabularyItem } from '../training.service';
import { ConfigService, Config } from '../config.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  public words: VocabularyItem[] = [];
  constructor(private trainingService: TrainingService, private configService: ConfigService) { }

  ngOnInit() {
    this.refreshWords();
  }

  refreshWords() {
    const config = this.configService.get();
    this.words = this.trainingService.getTrainingList(config.trainingLessonWordsQuantity, config.trainingSessionsNecessary);
  }

}
