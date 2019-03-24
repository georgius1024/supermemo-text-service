import { Component, OnInit } from '@angular/core';
import { TrainingService, VocabularyItem } from '../training.service';
import { ConfigService, Config } from '../config.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public pool: VocabularyItem[] = [];
  public canAddWords = false;
  public addWords = false;
  constructor(private trainingService: TrainingService, private configService: ConfigService) { }

  ngOnInit() {
    this.refreshPool();
  }

  refreshPool() {
    this.pool = this.trainingService.getPool();
    this.canAddWords = this.configService.get().wordsInTrainingQuantity > this.pool.length;
  }

  addPortion(portion: VocabularyItem[]) {
    this.trainingService.addToPool(portion);
    this.addWords = false;
    this.refreshPool();
  }

}
