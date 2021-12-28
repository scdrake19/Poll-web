import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {FormControl} from "@angular/forms";
import {NotificationService} from "../_services/notification.service";
import {PollService} from "../_services/poll.service";

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {

  isNew: boolean;
  initDate;
  pollDate: Date;
  question = '';
  options: {option: string, count: number}[] = [];
  questionControl = new FormControl(this.question);
  votes: number = 0;
  portrayDate: string;
  constructor(private pollservice: PollService,
              private notif: NotificationService, private route: ActivatedRoute) { }

  ngOnInit() {
    /*this.route.queryParams.route.(params => {
      this.initDate = params['date'];
      console.log(params['date']);
    });*/
    this.initDate = this.route.snapshot.paramMap.get('date');
    console.log(this.initDate);
    // tslint:disable-next-line:triple-equals
    if (this.initDate != 0) {
      this.isNew = false;
      this.pollDate = new Date(this.initDate);
      this.pollservice.get(this.initDate).pipe(first()).subscribe(
        record => {
          this.question = record.question;
          this.options = record.options;
          this.votes = record.votes;
        },
        error => {
          this.notif.showNotif(error);
        }
      );
      this.portrayDate = this.pollDate.getUTCMonth() + '/' +
        this.pollDate.getUTCDay() + '/' + this.pollDate.getUTCFullYear();
    } else {
      this.isNew = true;
    }
  }



  addRecord() {

    this.pollservice.add(this.question, this.options, this.pollDate).pipe(first()).subscribe(
      message => {
        this.notif.showNotif(message, 'confirmation');
      },
      error => {this.notif.showNotif(error);
      }
    );
  }




  setRecord() {
    this.pollservice.set(this.question, this.options, this.votes, this.pollDate).pipe(first()).subscribe(
      message => {
        this.notif.showNotif(message, 'confirmation');
      },
      error => {this.notif.showNotif(error);
      }
    );
  }

  addOption() {
    let toPush = {option: '', count: 0}
    this.options.push(toPush);
  }


  deleteOption(index) {
    let sub = this.options[index].count;
    this.votes = this.votes - sub;
    this.options.splice(index,1);

  }
}
