import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  dataItem = 'idk'
  number = 0
  minNumber = 0
  maxNumber = 8

  constructor() { }

  ngOnInit() { }

  add() {
    this.number += (this.number >= this.maxNumber) ? 0 : 1
  }

  remove() {
    this.number -= (this.number <= this.minNumber) ? 0 : 1
  }

}
