import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { CommentService } from 'src/app/services/comment/comment.service';
import { Comment } from '../../../models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() comments: Comment[]
  @Input() currUser: User
  constructor(private commentService: CommentService) { }

  resetSelectedComment(){
    this.commentService.setSelectedComment(null)
  }

}
