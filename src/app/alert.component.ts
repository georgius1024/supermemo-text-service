import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService, AlertMessage } from './alert.service';
import { Subscription } from 'rxjs';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('messageTrigger', [
      transition(':enter', [
        style({ maxHeight: 0, overflow: 'hidden' }),
        animate('0.3s ease-in', style({ maxHeight: 124 })),
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ maxHeight: 0, overflow: 'hidden' }))
      ])
    ]),
  ]
})

export class AlertComponent implements OnInit, OnDestroy {
  private defaults = {
    title: '',
    className: 'info',
    icon: 'info-standard',
    timeout: 10000
  };
  private alertsSource: Subscription;
  public alerts: Array<AlertMessage> = [];
  private counter = 0;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertsSource = this.alertService.alerts$.subscribe((alertMessage: AlertMessage) => {
      this.add(alertMessage);
    });
  }

  ngOnDestroy() {
    this.alertsSource.unsubscribe();
  }

  add(alertMessage: AlertMessage) {
    alertMessage.id = this.counter++;
    if (typeof alertMessage.title === 'undefined') {
      alertMessage.title = this.defaults.title;
    }
    if (typeof alertMessage.className === 'undefined') {
      alertMessage.className = this.defaults.className;
    }
    if (typeof alertMessage.icon === 'undefined') {
      alertMessage.icon = this.defaults.icon;
    }
    if (typeof alertMessage.timeout === 'undefined') {
      alertMessage.timeout = this.defaults.timeout;
    }
    this.alerts.push(alertMessage);
    if (alertMessage.timeout) {
      setTimeout(() => {
        this.remove(alertMessage.id)
      }, alertMessage.timeout)
    }
  }

  remove(id: number) {
    this.alerts = this.alerts.filter(item => item.id !== id);
  }

}
