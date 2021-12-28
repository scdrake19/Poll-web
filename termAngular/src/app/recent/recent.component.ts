import { Component, OnInit } from '@angular/core';
import {Poll} from "../_models/poll";
import {PollService} from "../_services/poll.service";
import {NotificationService} from "../_services/notification.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {

  polls: Poll[];
  constructor(private pollService: PollService, private notifService: NotificationService) { }

  ngOnInit(): void {
    this.loadPolls();
  }

  private loadPolls() {
    this.pollService.getAll().subscribe(
      ret => {
        this.polls = ret.sort(compareDate);
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

function compareDate(a, b) {

  const ad = new Date(a.createdDate).valueOf();
  const bd = new Date(b.createdDate).valueOf();
  return bd - ad;
}


