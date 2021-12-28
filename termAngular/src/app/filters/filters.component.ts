import { Component, OnInit } from '@angular/core';
import {Poll} from "../_models/poll";
import {PollService} from "../_services/poll.service";
import {NotificationService} from "../_services/notification.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  polls: Poll[];
  type: string;
  constructor(private pollService: PollService, private notifService: NotificationService) { }

  ngOnInit(): void {
    this.pollService.getAll().pipe(first()).subscribe(
      ret => {

        this.polls = ret.sort(compareVotes);
      }
    )

  }

  private loadPolls() {
    this.pollService.getAll().pipe(first()).subscribe(
        ret => {

          this.polls = ret.sort(compareVotes);
        }
      )


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

function compareVotes(a, b) {

  return b.votes - a.votes;
}
