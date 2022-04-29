import { Component, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { User } from '../models/user.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'pick-user',
  templateUrl: './pick-user.component.html',
  styleUrls: ['./pick-user.component.scss']
})
export class PickUserComponent implements OnInit {
  @Input() users: User[]
  // @Output() selectedUser = new EventEmitter

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.users)
  }

  onPickUser(ev){
    console.log(ev.target)
    this.userService.setSelectedUser(ev.target.value)
  }

}
