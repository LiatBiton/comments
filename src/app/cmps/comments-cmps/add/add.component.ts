import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { User } from 'src/app/models/user.model';
import { CommentService } from 'src/app/services/comment/comment.service';
import { UserService } from 'src/app/services/user/user.service';
import { NgForm } from '@angular/forms';
import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'add-cmp',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @Input() currUser: User;
  @ViewChild('scrollBottom') private scrollBottom: ElementRef;
  selectedComment: Comment;
  contentList: any;

  constructor(private commentService: CommentService) { }
  
  ngOnInit(): void {
    this.commentService.selectedComment$.subscribe(
      (comment) => this.selectedComment = comment)
  }

  async addComment(form: NgForm){
    const newComment = this.commentService.getEmptyComment();
    newComment.txt = form.value.comment;
    newComment.createdAt = new Date();
    newComment.ownerId = this.currUser.id;
    if (this.selectedComment){
      this.commentService.addReply(newComment)
    } else{
      this.commentService.addComment(newComment)
    }
    form.reset();
    this.selectedComment = null
    
  }


}
