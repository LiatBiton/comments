import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { User } from 'src/app/models/user.model';
import { CommentService } from 'src/app/services/comment/comment.service';
import { UserService } from 'src/app/services/user/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'add-cmp',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  @Input() currUser: User
  @ViewChild('form') slForm: NgForm;
  
  constructor(private commentService: CommentService) { }

  addComment(form: NgForm){
    console.log(form.value)
    const newComment = this.commentService.getEmptyComment();
    newComment.txt = form.value.comment;
    newComment.createdAt = new Date();
    newComment.ownerId = this.currUser.id;
    
    this.commentService.addComment(newComment)
    form.reset();
  }
}
