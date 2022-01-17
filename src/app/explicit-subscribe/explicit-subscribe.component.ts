import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-explicit-subscribe',
  template: `<div>{{ value }}</div>`,
})
export class ExplicitSubscribeComponent implements OnInit, OnDestroy {
  value: any;
  private subscription!: Subscription;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.subscription = this.dataService.valueChanges.subscribe((value) => {
      this.value = value;
    });
  }

  ngOnDestroy() {
    //   コンポーネントが破棄されるタイミングで購読解除されるように
    //   explicit unsubscribe
    this.subscription.unsubscribe();
  }
}
