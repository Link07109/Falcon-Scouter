import { Component, OnInit } from '@angular/core';
import {BlueAllianceService} from '../../services/data/blue-alliance.service'

export let curYear = 2019

export let currentDistrict = '2019fnc'
export let districtName = 'FIRST North Carolina'

export let currentEvent = '2019ncash'
export let eventName = 'UNC Asheville'

export let eventTeamsArray = []
export function setArray(someArray: Array<any>) {
    eventTeamsArray = someArray
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {

  newEvent: string

  constructor(
    private blueAllianceService: BlueAllianceService,
  ) { }

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
    // toast saying changes have been saved
    currentEvent = this.newEvent
    curYear = +currentEvent.substring(0, 4)

    this.blueAllianceService.getEventInformation(currentEvent).subscribe(element => {
      eventName = element.short_name
      currentDistrict = element.district.key
      districtName = element.district.display_name

      console.log(element)
      console.log(element.name)
      console.log(element.district.display_name)
    })

    eventTeamsArray = []

    this.blueAllianceService.getEventTeams(currentEvent).subscribe(element => {
      element.forEach(el => {
        eventTeamsArray.push({ team: el, icon: this.blueAllianceService.getTeamIcon(el.team_number, 'image', curYear) })
      })
      eventTeamsArray = eventTeamsArray.sort((a, b) => a.team.team_number - b.team.team_number)
    })
  }

}
