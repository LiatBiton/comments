import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../../models/comment.model';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss']
})
export class CommentsPreviewComponent implements OnInit {
  @Input() comment: Comment
  user$: Observable<User>
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if(this.comment.ownerId){
      this.user$ = this.userService.getUserById(this.comment.ownerId)
    }
  }

}
