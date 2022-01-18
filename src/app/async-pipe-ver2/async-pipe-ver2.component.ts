import { DataService } from './../data.service';
import { map, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';

type State = {
  value: any;
};

@Component({
  selector: 'app-async-pipe-ver2',
  template: `
    // Async Pipeがsubscribeやunsubscribeといった処理を肩代わりしてくれている。
    そのためコードがとてもすっきりする。<br />
    Async Pipeが適用されたObservableは、<b
      >そのコンポーネントのライフサイクルに合わせて自動的に購読・購読解除が行われる。</b
    ><br />
    <b
      >これにより、開発者は面倒なRxJSのお作法から解放され、ビジネスロジックに集中することができる。</b
    >
    <br />
    <br />
    <b
      >↓OKパターン。(ngIf asとasyncを併用)<br />
      asyncパイプを適用したObservableを複数、同期的に記述することができる。<br />
      <ng-container *ngIf="state$ | async as state; else nullState">
        <div>{{ state.value }}</div>
        <div>{{ state.value }}</div>
      </ng-container>
      <ng-template #nullState> State is null </ng-template>

      <br />
      <br />
      【重要】
      <b
        >Asyncパイプは、コンポーネントの初期化時にフィールドとして存在する、無限なObservableにのみ使われるべきです。</b
      ><br />
      つまりユーザーインタラクションなどによって後から発生するHTTPリクエストのような<br />
      有限のObservableは、Asyncパイプを使うのに適していません。<br />
      <b
        >そのようなケースの場合は明示的にsubscriptionを開始し、onDestroy$をtakeUntilしたような方法を採る必要があります。</b
      >
      <br />
    </b>
  `,
})
export class AsyncPipeVer2Component {
  readonly state$: Observable<State>;

  constructor(private dataService: DataService) {
    this.state$ = combineLatest(
      [this.dataService.valueChanges], // 必要なストリームを合成する
      ([value]: any[]) => ({ value }) // 配列からオブジェクトに変換する
    );
  }
}
