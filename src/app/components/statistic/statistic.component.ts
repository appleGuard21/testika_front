import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {StatisticService} from "../../services/statistic.service";
import {IStatisticTest} from "../../interfaces/statistic/IStatisticTest";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatisticComponent implements OnInit {

  displayedColumnsOfMy: string[] = ['position', 'title', 'author', 'points'];
  displayedColumnsOfTasks: string[] = ['position', 'title', 'solver', 'points'];
  resultsOfMy: IStatisticTest[] = [];
  resultsOfTasks: IStatisticTest[] = [];
  username: string = '';

  constructor(private statisticService: StatisticService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.username.subscribe(data=>{
      if(data){
        this.username = data;
      }
    });
    this.statisticService.getStatistic(this.username).subscribe(data=>{
      this.resultsOfMy = data;
    });
    this.statisticService.getTasksStatistic(this.username).subscribe(data=>{
      this.resultsOfTasks = data;
    });
  }
}
