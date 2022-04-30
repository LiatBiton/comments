import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject, of, throwError, lastValueFrom } from 'rxjs';
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
    this._commentsDb = dataView;

    if (!commentsFromStorage){
      this._commentsDb = dataView.map(comment => ({
        ...comment,
        replies: data.filter(reply => reply.parentCommentId === comment.id)
      }));
      localStorage.setItem(this.KEY, JSON.stringify([...this._commentsDb]));
    }
  }

  private KEY = 'comments'

  private _commentsDb: Comment[]
  private _comments$ = new BehaviorSubject<Comment[]>([]);
  public comments$ = this._comments$.asObservable()

  private _selectedComment$ = new BehaviorSubject<Comment>(null);
  public selectedComment$ = this._selectedComment$.asObservable();

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

  public async addReply(newReply: Comment ){
    const comments = this._commentsDb
    const comment = this._selectedComment$.getValue()
    const commentIdx = comments.findIndex(c => c.id === comment.id)
    comments.splice(commentIdx, 1)
    newReply.id = this._makeId()
    newReply.parentCommentId = comment.id
    if (!comment.replies) {
      comment.replies = []
    }
    comment.replies.push(newReply)
    comments.push(comment)
    localStorage.setItem(this.KEY, JSON.stringify([...comments]));
    this._comments$.next(comments)
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

  public removeComment(commentId){
    const comments = this._commentsDb
    const commentIdx = comments.findIndex(comment => comment.id === commentId)
    comments.splice(commentIdx, 1)
    localStorage.setItem(this.KEY, JSON.stringify([...comments]));
    this._comments$.next(comments);
    return of({})
  }

  public removeReply(reply){
    const comments = this._commentsDb
    const commentIdx = comments.findIndex(comment => comment.id === reply.parentCommentId)
    const replyIdx = comments[commentIdx].replies.findIndex(d => d.id === reply.id)
    comments[commentIdx].replies.splice(replyIdx,1)
    localStorage.setItem(this.KEY, JSON.stringify([...comments]));
    this._comments$.next(comments);
    return of({})
  }

  public edit(comment: Comment) {
    const comments = this._commentsDb
    if(comment.parentCommentId){
      const parentIdx = comments.findIndex(_comment => _comment.id === comment.parentCommentId)
      const replyIdx = comments[parentIdx].replies.findIndex(d => d.id === comment.id)
      comments[parentIdx].replies[replyIdx] = comment
    }else{
      const commentIdx = comments.findIndex(_comment => _comment.id === comment.id)
      comments.splice(commentIdx, 1, comment)
      
    }
    localStorage.setItem(this.KEY, JSON.stringify([...comments]));
      this._comments$.next([...comments])
    return of(comment)
  }

  setSelectedComment(id: number | null) {
    if (id === null){
      this._selectedComment$.next(null);
    } else {
      this.getCommentById(id).subscribe((comment) => {
        this._selectedComment$.next(comment);
      });
    }
  }

  getCommentById(id: number): Observable<Comment> {
    const comment = this._commentsDb.find((comment) => comment.id == id);
    return of(comment)
  }

}
