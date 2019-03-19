import {Component, OnInit} from '@angular/core'
import {BlueAllianceService} from '../../services/data/blue-alliance.service'
import {eventName, eventTeamsArray} from '../settings/settings.page'
import * as $ from 'jquery'
import {FirestoreService} from '../../services/data/firestore.service'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  filteredArray = []
  team: any
  event
  eventTeams = []

  constructor(
    public blueAllianceService: BlueAllianceService,
  ) { }

  ngOnInit() {
    this.setup(null)
  }

  setup(ev = event) {
    this.event = eventName
    this.eventTeams = []

    eventTeamsArray.forEach(element => {
      this.eventTeams.push(element)
    })
    this.setImages()
  }

  setImages() {
    this.filteredArray = this.eventTeams
    this.filteredArray.forEach(el => {
      el.icon.then(image => $(`#${el.team.team_number}`).attr('src', image))
    })
  }

  getItems(ev) {
    const val = ev.target.value

    if (val && val.trim() !== '') {
      if (/\d/.test(val)) { // check if it contains a number
        this.filteredArray = this.eventTeams.filter(item => {
          const teamNum = item.team.team_number
          this.setImages()
          return String(teamNum).includes(val) // includes  or  startsWith
        })
      } else { //  if it doesn't contain a number, search for the team name
        this.filteredArray = this.eventTeams.filter(item => {
          const teamName = item.team.nickname.toUpperCase()
          this.setImages()
          return teamName.includes(val.toUpperCase()) // includes  or  startsWith
        })
      }
    } else {
      this.setImages()
    }
  }

}
