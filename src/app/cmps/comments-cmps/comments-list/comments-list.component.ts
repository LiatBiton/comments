import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Comment } from '../../../models/comment.model';

@Component({
  selector: 'comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  @Input() comments: Comment[]
  @Input() currUser: User
  constructor() { }

  ngOnInit(): void {
  }

}
