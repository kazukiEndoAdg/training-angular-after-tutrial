import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //TODO research what's async pipe.
  //TODO It's Observable<User[]>
  users$ = this.userService.users$;

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.fetchUsers();
  }
}
