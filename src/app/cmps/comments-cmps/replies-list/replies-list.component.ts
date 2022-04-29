import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment.model';

@Component({
  selector: 'replies-list',
  templateUrl: './replies-list.component.html',
  styleUrls: ['./replies-list.component.scss']
})
export class RepliesListComponent implements OnInit {
  @Input() replies: Comment[]
  constructor() { }

  ngOnInit(): void {
  }

}
