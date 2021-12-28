
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';




@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`http://localhost:3030/user/allusers`);
  }



  register(user: User) {
    return this.http.post(`http://localhost:3030/user/register`, user);
  }


  getName() {
    return this.http.get<{firstName: string, lastName: string}>('http://localhost:3030/user/name');
  }

  getRankings() {
    return this.http.get<{ username: string, firstName: string, lastName: string, calories: number,
      calPerc: number, calorieGoal: number, minutes: number, minPerc: number,
      minuteGoal: number}[]>('http://localhost:3030/user/ranking');
  }


}
