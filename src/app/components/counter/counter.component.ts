import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  number = 0;

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.number ++;
  }

  remove() {
    if (this.number > 0) { this.number --; }
  }

}
