import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../services/comment/comment.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  users$: Observable<User[]>
  currentUser$: Observable<User>
  comments$: Observable<Comment[]>

  constructor(
    private userService: UserService,
    private commentService: CommentService
    ) { }

  ngOnInit(): void {
    this.userService.loadUsers()
    this.users$ = this.userService.users$
    this.currentUser$ = this.userService.currentUser$

    this.commentService.query()
    this.comments$= this.commentService.comments$
  }

}
