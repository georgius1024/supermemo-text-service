import { Component, OnInit } from '@angular/core';
import { ConfigService, Config } from '../config.service';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  public config: Config;
  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.config = this.configService.get();
  }

  saveChanges() {
    this.configService.set(this.config);
  }

  discardChanges() {
    this.config = this.configService.get();
  }
}
