import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
// The service that has responsibility only fetching data from API.
export class UserService {
  //TODO: What's Behavior Subject?
  private usersSubject = new BehaviorSubject<User[]>([]);

  get users$() {
    return this.usersSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  // TODO What's pipe?
  // →pipe is the function that combine multiple functions receives as args.
  // TODO: What's rxjs's map?
  // → the map function receives higher function that act as preference option and return a function that return observables.
  //TODO: What's the subject's property 'next'?
  // → 'next' means the function to stream args to Subject.
  fetchUsers(): void {
    this.http
      .get<{ data: User[] }>('https://reqres.in/api/users')
      .pipe(map((resp) => resp.data))
      .subscribe((users) => {
        this.usersSubject.next(users);
      });
  }
}
