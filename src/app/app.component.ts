import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //TODO research what's async pipe.
  //It's Observable<User[]>
  users$ = this.userService.users$;

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.fetchUsers();
  }
}
