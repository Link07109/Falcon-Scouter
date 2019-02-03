import { Component, OnInit } from '@angular/core';
import { themes } from '../../consts';
import { selectedTheme } from '../popover/popover.page';
import { RadioGroup } from '@ionic/angular';

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

  changeThisTheme(name: string) {
    // selectedTheme = name
    const hmmmm = document.getElementById("radioGroup")
    // console.log(hmmmm.value)
    console.log(hmmmm)
  }

}
