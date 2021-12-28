import { Component, OnInit } from '@angular/core';
import {Poll} from "../_models/poll";
import {PollService} from "../_services/poll.service";
import {NotificationService} from "../_services/notification.service";
import {first} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  polls: Poll[];
  constructor(private pollService: PollService, private notifService: NotificationService,) { }

  ngOnInit(): void {
    this.loadPolls()
  }

  private loadPolls() {

    this.pollService.getAllUser().subscribe(
      ret => {
        this.polls = ret.sort(compareVotes);
      })
  }

  deletePoll(date) {


    // this.userService.deleteActivity(date);
    this.pollService.delete(date).pipe(first()).subscribe( message => {
      this.notifService.showNotif(message, 'response');
      this.polls = null;
      this.loadPolls();
    }, error => {this.notifService.showNotif(error); });
  }

  vote(opt) {
    this.pollService.vote(opt).pipe(first()).subscribe(
      message => {
        this.notifService.showNotif(message, 'response');
        this.polls = null;
        this.loadPolls();
      }, error => {this.notifService.showNotif(error); }
    );

  }
}


function compareVotes(a, b) {
  console.log(typeof b.votes);
  console.log(typeof a.votes);
  return b.votes - a.votes;
}
