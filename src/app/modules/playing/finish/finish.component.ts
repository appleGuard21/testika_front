import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {

  points: string = '';
  from: string = '';
  author: string = '';

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParam:any)=> {
      this.points = queryParam['points'];
      this.from = queryParam['from'];
    });
  }


  finish() {
    if(this.from.includes('tasks')){
      this.router.navigate(['tasks']);
    } else {
      this.router.navigate(['']);
    }
  }
}
