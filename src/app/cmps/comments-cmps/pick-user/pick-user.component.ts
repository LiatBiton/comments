import { Component, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'pick-user',
  templateUrl: './pick-user.component.html',
  styleUrls: ['./pick-user.component.scss']
})
export class PickUserComponent {
  @Input() users: User[]

  constructor(private userService: UserService) { }

  onPickUser(ev){
    this.userService.setSelectedUser(ev.target.value)
  }
}
