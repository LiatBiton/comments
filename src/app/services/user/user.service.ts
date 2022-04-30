import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { User } from '../../models/user.model'
import data from '../../../assets/user.json'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    this._usersDb = data
  }

  private _usersDb: User[]
  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable()

  private _currentUser$ = new BehaviorSubject<User>(null);
  public currentUser$ = this._currentUser$.asObservable();

  public loadUsers(): void {
    const users = this._usersDb
    this._users$.next(users)
    this._currentUser$.next({
      "id": 1,
      "displayName": "Apu Nahasapeemapetilon"
    })
  }

  getUserById(id: number): Observable<User> {
    const user = this._usersDb.find((user) => user.id === Number(id));
    return user ? of(user) : throwError(() => `user id ${id} wasnt found`);
  }

  setSelectedUser(id: number) {
    this.getUserById(id).subscribe((user) => {
      this._currentUser$.next(user);
    });
  }
}
