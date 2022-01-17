import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-explicit-subscribe',
  template: `<div>{{ value }}</div>`,
})
export class ExplicitSubscribeComponent implements OnInit, OnDestroy {
  value: any;
  private onDestroy$ = new Subject();
  constructor(private dataService: DataService) {}

  ngOnInit() {
    // pipe内のtakeUntilオペレータによって事前に購読終了の条件を規定したうえで、
    // subscribeを開始する
    this.dataService.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value) => {
        this.value = value;
      });
  }

  ngOnDestroy() {
    // takeUntilは指定したsubjectに値が流れたタイミングでObservableを終了させる効果を持つ。
    // そして前提としてObservableが終了すると、そこで購読していたsubscriptionも自動的に終了する。
    // この性質とtakeUntilを利用して、コンポーネントが破棄されるタイミングでnext()で値を流すことによって、
    // 一括で漏れなくsubscribeを終了させる。というテクニック。
    this.onDestroy$.next('');
  }
}
