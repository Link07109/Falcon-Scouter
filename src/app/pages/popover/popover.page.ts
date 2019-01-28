import { Component, OnInit } from '@angular/core';
import { themes } from '../../consts';

export var selectedTheme = ''

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  themees = []

  constructor() { }

  ngOnInit() {
    for (var theme in themes) {
      this.themees.push(theme)
    }
  }

  changeThisTheme(name: string) {
    selectedTheme = name
  }

}
