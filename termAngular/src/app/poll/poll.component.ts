import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Poll } from '../_models/poll';
import { ChartOptions, ChartType, ChartDataSets} from "chart.js";
import { Label} from "ng2-charts";
import { Router } from '@angular/router';
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  @Input() poll: Poll;
  @Output() deleteEvent = new EventEmitter<Date>();
  @Output() voteEvent = new EventEmitter<{string, number}>();
  barChartOptions: ChartOptions = {
    responsive: true,
    scales : {
      yAxes: [{
        ticks: {
          stepSize : 5,
          max : 100,
          min: 0
        }
      }]
    }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  percs: number[] = [];
  barChartData: ChartDataSets[] = [];
  portrayDate: string;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.poll.options.length; i++)
    {
      this.barChartLabels.push(this.poll.options[i].option);
      this.percs.push(this.percolator(this.poll.options[i].count, this.poll.votes));
    }

    this.barChartData = [
      { data: this.percs , label: `%Percentage of votes for each option`}
    ];
    const date = new Date(this.poll.createdDate);
    this.portrayDate = date.getUTCMonth() + '/' +
      date.getUTCDay() + '/' + date.getUTCFullYear();
  }

  percolator(val: number, total: number): number {
    return Math.floor((val / total) * 100);
  }

  vote(opt) {
    this.voteEvent.emit(opt);
  }

  delete(date) {
    this.deleteEvent.emit(date);
  }

  go() {
    this.router.navigateByUrl('/create/' + this.poll.createdDate);
  }

  isCreator() {
    return this.authService.currentUserValue.username == this.poll.createdBy.username;
  }
}
