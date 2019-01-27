import { Component, OnInit } from '@angular/core';

export var selectedTheme = ''

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  themes = [
    'Rain',
    'Dusk',
    'Nether',
    'Autumn',
    'Night',
    'Neon',
  ]

  constructor() { }

  ngOnInit() {
  }

  changeThisTheme(name: string) {
    selectedTheme = name
  }

}
