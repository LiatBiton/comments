import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../../models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[]
  constructor() { }

  ngOnInit(): void {
  }

}
