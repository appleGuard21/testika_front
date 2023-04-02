import {Component, OnInit} from '@angular/core';
import {TestService} from "../../../services/test.service";
import {ITest} from "../../../interfaces/test/ITest";
import {ActivatedRoute, Router} from "@angular/router";
import {StatisticService} from "../../../services/statistic.service";
import {IStatisticTest} from "../../../interfaces/statistic/IStatisticTest";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  test: ITest = {author: "", questions: [], title: ""};
  pointer: number = 0;
  isLast: boolean = false;
  points: number = 100;
  fineNumber: number = 0;
  from: string = '';
  username: string = '';

  constructor(private service:TestService,
              private router: Router,
              private dataService: TestService,
              private route: ActivatedRoute,
              private statisticService: StatisticService,
              private authService: AuthService) { }

  ngOnInit(): void {
    let id: number = 0;
    this.route.params.subscribe(params=> {
      id = params['id']
    });
    if (id !== 0){
      this.dataService.getTest(id).subscribe((data: ITest)=>{
        data.questions.forEach(q=>q.answers.forEach(a=>a.checked=false));
        this.test = data;
        if(this.test.questions.length ===1){
          this.isLast = true;
        }
      });
    } else console.warn('id is 0');
    this.route.queryParams.subscribe((queryParam:any)=> {
      this.from = queryParam['from'];
    });
    this.authService.username.subscribe(data=>{
      if(data){
        this.username = data;
      }
    });
  }

  process(i:number):number{
    return i*100/this.test.questions.length
  }

  nextQuestion() {
    if(this.pointer===this.test.questions.length-2){
      this.isLast = true;
    }
    this.pointer = this.pointer+1;
  }

  finish() {
    this.countFineNumber();
    this.countPoints();
    this.createStatistic();
  }

  countPoints(){
    this.test.questions.forEach(question=>question.answers.forEach(answer=>{
      if(answer.checked !== answer.right){
        this.points = this.points - this.fineNumber
      }
    }));
  }

  countFineNumber(){
    let ansCount = 0;
      this.test.questions.forEach(question=> ansCount = ansCount + question.answers.length)
    this.fineNumber = 100/ansCount;
  }
  createStatistic(){
    const statisticTest: IStatisticTest = {
      testId: this.test.id,
      username: this.username,
      author: this.test.author,
      points: this.points,
      title: this.test.title
    }
    this.statisticService.createStatistic(statisticTest).subscribe(()=>{
      this.toFinish();
    });
  }
  toFinish(){
    this.router.navigate(['finish'], {queryParams:{'points': this.points, 'from':this.from}});
  }
}
