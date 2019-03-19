import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface AlertMessage {
  title?: string;
  message: string;
  className?: string;
  icon?: string;
  timeout?: number;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertFlow = new Subject<AlertMessage>();

  public alerts$: Observable<AlertMessage> = this.alertFlow.asObservable();

  constructor() { }

  add(alert: AlertMessage) {
    this.alertFlow.next(alert);
  }

}
