import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/data/firestore.service';
import { STAT_NAMES } from '../../consts';
import { currentEvent, curYear } from '../settings/settings.page';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-matches',
  templateUrl: 'matches.page.html',
  styleUrls: ['matches.page.scss'],
})

export class MatchesPage implements OnInit {

  matchCollectionObservable
  teamNumber: string
  teamNUMBER: number
  showStats = false
  showMatches = true
  showEvents = false
  matches
  stats = STAT_NAMES
  teamName: string
  teamNumberName
  teamWebsite: string
  eventsObservable
  socialMediaObservable
  event = currentEvent

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    public blueAllianceService: BlueAllianceService,
  ) { }

  // ionViewDidLoad() {
  ngOnInit() {
    this.setup(null)
  }

  setup(ev) {
    this.teamNumber = this.route.snapshot.paramMap.get('teamNumber');
    this.teamNUMBER = +this.teamNumber

    this.matchCollectionObservable = this.firestoreService.getMatchList(currentEvent, this.teamNumber)

    this.eventsObservable = this.blueAllianceService.getTeamEvents(`frc${this.teamNumber}`, curYear)
    this.socialMediaObservable = this.blueAllianceService.getSocialMedia(`frc${this.teamNumber}`)
    this.blueAllianceService.getTeamInformation(`frc${this.teamNumber}`).subscribe(data => {
      this.teamName = data.nickname
      this.teamNumberName = this.teamNumber + ' - ' + this.teamName
      this.teamWebsite = data.website
    })
    this.matches = this.blueAllianceService.getTeamMatches(`frc${this.teamNumber}`, currentEvent)
    this.blueAllianceService.getTeamIcon(this.teamNUMBER, 'image', curYear).then(image => $(`#image`).attr('src', image))
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
