import { Component, OnInit } from '@angular/core';
import { themes } from '../../consts';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  themees = []

  constructor() { }

  ngOnInit() {
    for (var theme in themes) {
      this.themees.push(theme)
    }
  }

  fun() {
    console.log(document.getElementById('themeSelector').nodeValue)
  }

}
