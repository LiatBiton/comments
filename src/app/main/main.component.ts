import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  users$: Observable<User[]>
  currentUser$: Observable<User>

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.loadUsers()
    this.users$ = this.userService.users$
    this.currentUser$ = this.userService.currentUser$
  }

}
