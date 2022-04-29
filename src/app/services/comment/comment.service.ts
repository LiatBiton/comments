import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Comment } from '../../models/comment.model'
import data from '../../../assets/comments.json'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
    const commentsFromStorage = JSON.parse(localStorage.getItem(this.KEY));

    const initialComments = commentsFromStorage ? commentsFromStorage : data;

    const dataView = (<Comment[]>initialComments).filter(comment => comment.parentCommentId == null)
    this._commentsDb = dataView.map(comment => ({
      ...comment,
      replies: data.filter(reply => reply.parentCommentId === comment.id)
    }));
  }

  private KEY = 'comments'

  private _commentsDb: Comment[]
  private _comments$ = new BehaviorSubject<Comment[]>([]);
  public comments$ = this._comments$.asObservable()

  public query(){
    this._comments$.next(this._commentsDb)
  }

  public addComment(comment: Comment){
    comment.id = this._makeId()
    this._commentsDb.push(comment)
    localStorage.setItem(this.KEY, JSON.stringify([...this._commentsDb]));
    this._comments$.next([...this._commentsDb])
    return of(comment)
  }

  public getEmptyComment() : Comment {
    return {
      "parentCommentId": null,
      "txt": "",
      "deletedAt": null
    } as Comment
  }

  private _makeId(length = 5) {
    var id = "";
    var possible = "0123456789";
    for (var i = 0; i < length; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return Number(id);
  }
}
