import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slides = [
    {
      title: 'FalconScoutApp',
      description: 'A complete rewrite using Ionic of the original Java scouting app used by FRC Team 5190 during FIRST Power Up.',
      image: '../assets/imgs/FalconColor.svg',
    },
    {
      title: 'Page 2 title',
      description: 'Page 2 description',
      image: '',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
