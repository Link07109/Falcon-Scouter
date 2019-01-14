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
      description: 'A complete rewrite using Ionic of the original Java scouting app used by FRC Team 5190 during FIRST Power Up.',
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
