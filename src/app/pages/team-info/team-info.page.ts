import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {FirestoreService} from '../../services/data/firestore.service'
import {STAT_NAMES} from '../../consts'
import {currentEvent, curYear, eventName} from '../settings/settings.page'
import {BlueAllianceService} from '../../services/data/blue-alliance.service'
import * as $ from 'jquery'

@Component({
  selector: 'app-matches',
  templateUrl: 'team-info.page.html',
  styleUrls: ['team-info.page.scss'],
})

export class TeamInfoPage implements OnInit {

  teamNumber: string
  teamNUMBER: number
  teamName: string
  teamRanking

  showStats = false
  showMatches = true
  showEvents = false

  event = eventName
  eventsObservable

  matchCollectionObservable
  matches
  matchesArray = []

  stats = STAT_NAMES
  teamWebsite: string
  socialMediaObservable

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    public blueAllianceService: BlueAllianceService,
  ) { }

  ngOnInit() {
    this.setup(null)
  }

  setup(ev) {
    this.teamNumber = this.route.snapshot.paramMap.get('teamNumber')
    this.teamNUMBER = +this.teamNumber
    const teamKey = `frc${this.teamNumber}`

    this.matchCollectionObservable = this.firestoreService.getMatchList(currentEvent, this.teamNumber)

    this.eventsObservable = this.blueAllianceService.getTeamEvents(teamKey, curYear)

    this.socialMediaObservable = this.blueAllianceService.getTeamSocialMedia(teamKey)
    this.blueAllianceService.getTeamIcon(this.teamNUMBER, 'image', curYear).then(image => $(`#image`).attr('src', image))

    this.blueAllianceService.getTeamInformation(`frc${this.teamNumber}`).subscribe(data => {
      this.teamName = data.nickname
      this.teamWebsite = data.website
    })

    this.blueAllianceService.getEventStatusOfTeam(teamKey, currentEvent).subscribe(el => {
      this.teamRanking = el.qual.ranking.rank
    })

    this.matches = this.blueAllianceService.getTeamMatches(teamKey, currentEvent)
    this.matches.subscribe(element => {
      element.forEach(el => {
        this.matchesArray.push(el)
      })
      this.matchesArray = this.matchesArray.sort((a, b) => a.predicted_time - b.predicted_time)
    })

  }

  toggleMatchData() {
    this.showStats = true
    this.showEvents = false
    this.showMatches = false
  }

  toggleMatches() {
    this.showMatches = true
    this.showEvents = false
    this.showStats = false
  }

  toggleEvents() {
    this.showEvents = true
    this.showStats = false
    this.showMatches = false
  }

}
