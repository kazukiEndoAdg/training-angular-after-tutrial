import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private valueSubject = new BehaviorSubject<any>('initial');

  get valueChanges() {
    //subjectにはasObservableというメソッドがあるのか。
    return this.valueSubject.asObservable();
  }

  setValue(value: any) {
    //observableへ値を更新する場合はnext()を使用する
    this.valueSubject.next(value);
  }
}
