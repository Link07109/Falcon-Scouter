import { Component, OnInit } from '@angular/core';

export var currentEvent = '2018nccmp'
// 2019NCWAK, 2019NCASH, 2019NCCMP

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slides = [
    {
      title: '',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  saveComp() {
    currentEvent = document.getElementById('hi').nodeValue
    console.log(currentEvent)
  }

}
