import { Component, OnInit } from '@angular/core';
import {BlueAllianceService} from '../../services/data/blue-alliance.service'

export let currentEvent = '2019ncgui'
// 2019ncwak, 2019ncash, 2019nccmp
export let curYear = 2019
export let eventName = ''

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {

  newEvent: string

  constructor(private blueAllianceService: BlueAllianceService) { }

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
    // alert saying changes have been saved and then auto put them to the previous page
    // or
    // toast saying changes have been saved and thats it
    currentEvent = this.newEvent
    curYear = +currentEvent.substring(0, 4)

    this.blueAllianceService.getEventInformation(currentEvent).subscribe(element => {
      eventName = element.name.slice(element.name.indexOf('t ') + 1)
      console.log(element.name)
    })
  }

}
