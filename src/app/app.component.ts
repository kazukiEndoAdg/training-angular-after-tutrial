import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `<app-explicit-subscribe></app-explicit-subscribe>
    <button (click)="updateValue()">Update Value</button>`,
})
export class AppComponent {
  constructor(private dataService: DataService) {}

  updateValue() {
    const value = new Date().toISOString();
    this.dataService.setValue(value);
  }
}
