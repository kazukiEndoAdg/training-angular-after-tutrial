import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  queueScheduler,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { initialState, State } from './userList/state';

@Injectable({ providedIn: 'root' })
export class Store {
  private _state$ = new BehaviorSubject<State>(initialState);

  // require argument is callback func that require & return State value.
  // this func apply callback func to update state value.
  update(fn: (state: State) => State) {
    const current = this._state$.value;
    queueScheduler.schedule(() => {
      this._state$.next(fn(current));
    });
  }

  // This func require callback func that require state as args & return state value selected.
  select<T>(selector: (state: State) => T) {
    return this._state$.pipe(map(selector), distinctUntilChanged());
  }
}
