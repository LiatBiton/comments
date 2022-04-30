import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../../models/comment.model'
import data from '../../../assets/comments.json'

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private KEY = 'comments'

  private _commentsDb: Comment[]
  private _comments$ = new BehaviorSubject<Comment[]>([]);
  public comments$ = this._comments$.asObservable()

  private _selectedComment$ = new BehaviorSubject<Comment>(null);
  public selectedComment$ = this._selectedComment$.asObservable();

  constructor(private http: HttpClient) {
    let data = JSON.parse(localStorage.getItem(this.KEY));

    if (!data) {
      data = this.initDbFromJson();
      localStorage.setItem(this.KEY, JSON.stringify([...data]));
    }

    this._commentsDb = data;
  }

  private omitSubArray(array, itemsToRemove) {
    return array.filter(c => !itemsToRemove.find(n => n.id === c.id))
  }

  private initDbFromJson() {
    let tempData = data;
    const roots = (<Comment[]>data).filter(comment => comment.parentCommentId == null)
    tempData = this.omitSubArray(tempData, roots);
    let currentRoots = roots;

    while (tempData.length > 0) {
      const currentLevelRoots = [];
      currentRoots.forEach(curr => {
        curr.replies = tempData.filter(child => child.parentCommentId === curr.id);;
        tempData = this.omitSubArray(tempData, curr.replies);
        currentLevelRoots.push(...curr.replies);
      });
      currentRoots = currentLevelRoots;
    }

    return roots;
  }

  public query(){
    this._comments$.next(this._commentsDb)
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

  public addComment(comment: Comment){
    comment.id = this._makeId()
    this._commentsDb.push(comment)

    localStorage.setItem(this.KEY, JSON.stringify([...this._commentsDb]));
    this._comments$.next([...this._commentsDb])
  }

  // TODO : Combine

  public async addReply(newReply: Comment) {
    const parent = this._selectedComment$.getValue()
    newReply.id = this._makeId()
    newReply.parentCommentId = parent.id

    this.updateComment(newReply)
  }

  public remove(comment: Comment){
    this.updateComment(comment, true)
  }

  public edit(comment: Comment) {
    this.updateComment(comment)
  }

  public updateComment(comment, shouldDelete = false){
    const comments = this._commentsDb

    let commentIdx = comments.findIndex(_comment => _comment.id === comment.id)
    if (commentIdx === -1) {
      this.recursiveUpdate(comments, comment, shouldDelete)
    } else if (shouldDelete){
      comments[commentIdx].deletedAt = new Date().toISOString();
    } else {
      comments[commentIdx] = comment;
    }

    localStorage.setItem(this.KEY, JSON.stringify([...comments]));
    this._comments$.next([...comments]);
  }

  public recursiveUpdate(comments: Comment[] = [], commentToUpdate: Comment, shouldDelete = false){
    if (!comments.length) { return false; }
    let parent = comments.find(_comment => _comment.id === commentToUpdate.parentCommentId)
    
    let replyIdx = parent && parent.replies ? 
      parent.replies.findIndex(d => d.id === commentToUpdate.id) :
      -1;
    
    if (!parent){
        comments.forEach(_comment => 
          this.recursiveUpdate(_comment.replies, commentToUpdate, shouldDelete)
        )
    } else {
        if (shouldDelete && replyIdx >= 0) {
          parent.replies[replyIdx].deletedAt = new Date().toISOString();
        } else if (!parent.replies?.length) {
          parent.replies = [commentToUpdate]
        } else if (replyIdx >= 0) {
          parent.replies[replyIdx] = commentToUpdate
        } else {
          parent.replies.push(commentToUpdate)
        }
        return true
    }
    return true
  }

  setSelectedComment(comment: Comment) {
      this._selectedComment$.next(comment);
  }
}
