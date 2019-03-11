import { Component, OnInit } from '@angular/core';
import { currentEvent } from '../settings/settings.page';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  sliderConfig = {
    navigation: {
      nextEl: '.hi'
    }
  }

  constructor() { }

  ngOnInit() { }

}
