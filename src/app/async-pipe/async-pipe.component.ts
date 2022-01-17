import { DataService } from './../data.service';
import { map, Observable } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-async-pipe',
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
      <ng-container *ngIf="value$ | async as state">
        <div>{{ state }}</div>
        <div>{{ state }}</div>
      </ng-container>

      <br />
      <br />
      <b
        >↓NGパターン。
        複数の変数間で結果が常にイコール(同期的)とならないため。</b
      >
      <div>{{ value$ | async }}</div>
      <div>{{ value$ | async }}</div>
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
export class AsyncPipeComponent {
  //$ はObservable型であることを表す
  value$: Observable<any>;
  constructor(private dataService: DataService) {
    // async pipeが自動的に購読を開始・終了してくれるため、明示的にsubscribeする必要はない。
    // 通常subscribeを開始する前に実行しているpipeなどの処理を適用した状態でObservableを返すようにすれば良いということ。
    this.value$ = this.dataService.valueChanges.pipe(
      map((value) => `Value: ${value}`)
    );
  }
}
