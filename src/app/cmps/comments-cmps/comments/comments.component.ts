import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Comment } from '../../../models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[]
  @Input() currUser: User
  constructor() { }

  ngOnInit(): void {
  }

}
