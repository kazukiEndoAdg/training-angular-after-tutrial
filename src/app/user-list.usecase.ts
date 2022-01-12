import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs/operators';
import { Store } from './store/store.service';

@Injectable({
  providedIn: 'root',
})
// The service that has responsibility only fetching data from API.
export class UserListUsecase {
  private usersSubject = new BehaviorSubject<User[]>([]);

  get users$() {
    return this.store
      .select((state) => state.userList)
      .pipe(
        map(({ items, filter }) =>
          items.filter((user) =>
            (user.first_name + user.last_name).includes(filter.nameFilter)
          )
        )
      );
    // return this.usersSubject.asObservable();
  }

  get filter$() {
    return this.store.select((state) => state.userList.filter);
  }

  constructor(private http: HttpClient, private store: Store) {}

  // fetchUsers(): void {
  //   this.http
  //     .get<{ data: User[] }>('https://reqres.in/api/users')
  //     .pipe(map((resp) => resp.data))
  //     .subscribe((users) => {
  //       this.usersSubject.next(users);
  //     });
  // }

  async fetchUsers() {
    const users = await firstValueFrom(
      this.http
        .get<{ data: User[] }>('https://reqres.in/api/users')
        .pipe(map((resp) => resp.data))
    );

    this.store.update((state) => ({
      ...state,
      userList: {
        ...state.userList,
        items: users,
      },
    }));
  }

  setNameFilter(nameFilter: string) {
    this.store.update((state) => ({
      ...state,
      userList: {
        ...state.userList,
        filter: {
          nameFilter,
        },
      },
    }));
  }
}
