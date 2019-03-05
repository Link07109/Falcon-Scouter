import { Component, OnInit } from '@angular/core';

export let currentEvent = '2019ncwak'
// 2019ncwak, 2019ncash, 2019nccmp
export let curYear = 2019

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {

  newEvent: string

  constructor() { }

  ngOnInit() { }

  changeEvent(ev) {
    const val = ev.target.value
    
    if (val && val.trim() !== '') {
      this.newEvent = val
    } else {
      this.newEvent = currentEvent
    }
  }
  saveChanges() {
    currentEvent = this.newEvent
    console.log(currentEvent)
    curYear = +currentEvent.substring(0, 4)
  }

}
