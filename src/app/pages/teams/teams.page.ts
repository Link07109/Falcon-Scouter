import {Component, OnInit} from '@angular/core'
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import {currentEvent, curYear, eventName} from '../settings/settings.page'
import * as $ from 'jquery'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  teamCollectionObservable
  filteredArray = []
  originalArray = []
  team: any
  event
  
  constructor(
    public blueAllianceService: BlueAllianceService
  ) { }
  
  ngOnInit() {
    this.setup(null)
  }

  setup(ev) {
    this.originalArray = []
    this.filteredArray = []

    this.event = eventName
    this.teamCollectionObservable = this.blueAllianceService.getEventTeams(currentEvent)

    this.teamCollectionObservable.subscribe(element => {
      element.forEach(el => {
        const iconn = this.blueAllianceService.getTeamIcon(el.team_number, 'image', curYear)
        this.originalArray.push({ team: el, icon: iconn })
      })
      this.sortFilteredArray()
    })
  }

  setImages(teamNumber, iconn) {
    iconn.then(image => $(`#${teamNumber}`).attr('src', image))
  }

  sortFilteredArray() {
    this.filteredArray = this.originalArray.sort((a, b) => a.team.team_number - b.team.team_number)
    this.filteredArray.sort((a, b) => a.team.team_number - b.team.team_number).forEach(el => {
      this.setImages(el.team.team_number, el.icon)
    })
  }

  getItems(ev) {
    const val = ev.target.value
    
    if (val && val.trim() !== '') {
      this.filteredArray = this.originalArray.sort((a, b) => a.team.team_number - b.team.team_number).filter(item => {
        const teamNum = item.team.team_number
        this.setImages(teamNum, item.icon)

        return String(teamNum).startsWith(val) // could also use .contains() if necessary
      })
    } else {
      this.sortFilteredArray()
    }
  }
  
}
