import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Poll } from "../_models/poll";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class PollService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  getAll() {
    return this.http.get<Poll[]>(`http://localhost:3030/polls/getPolls`);
  }

  getAllUser() {
    return this.http.get<Poll[]>('http://localhost:3030/polls/get4User');
  }



  add(quest, opts, date) {
    const poll = {
      question: quest,
      options: opts,
      totalCount: 0,
      createdDate: date,
      votedOn: [],
      edited: false,
    };

    return this.http.post(`http://localhost:3030/polls/addPoll`, poll);

  }


  delete(date: string) {
    return this.http.delete(`http://localhost:3030/polls/${date}`);

  }

  get(date: string) {
    return this.http.get<Poll>(`http://localhost:3030/polls/create/${date}`);
  }

  set(quest, opts, votes, date) {
    const poll = {
      question: quest,
      options: opts,
      totalCount: votes,
      createdDate: date,
      votedOn: [],
    };

    return this.http.post(`http://localhost:3030/polls/set`, poll);
  }

  vote(vot) {
    return this.http.post(`http://localhost:3030/polls/vote`, vot)
  }


}


