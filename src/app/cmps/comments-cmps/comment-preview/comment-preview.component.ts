import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../../models/comment.model';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss']
})
export class CommentsPreviewComponent implements OnInit {
  @Input() comment: Comment
  user$: Observable<User>
  currUser$: Observable<User>
  editMode: boolean = false

  constructor(
    private userService: UserService,
    private commentService: CommentService
    ) { }

  ngOnInit(): void {
    if(this.comment.ownerId){
      this.user$ = this.userService.getUserById(this.comment.ownerId)
    }
    this.currUser$ = this.userService.currentUser$
  }

  onDelete(comment){
    this.commentService.remove(comment)
  }

  onEdit(){
    this.editMode = !this.editMode
  }

  onSave(newTxt){
    this.editMode = false
    const newComment = this.comment
    newComment.txt = newTxt
    newComment.createdAt = new Date()
    this.commentService.edit(newComment)
  }

  selectComment(ev: MouseEvent){
    ev.stopPropagation();
    this.commentService.setSelectedComment(this.comment)
  }
}