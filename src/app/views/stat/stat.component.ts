import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  @Input()
  showStat: boolean;

  @Input()
  totalTaskInCategory: number;
  @Input()
  completeTaskInCategory: number;
  @Input()
  uncompletedTaskInCategory: number;

  constructor() { }

  ngOnInit(): void {
  }

}
