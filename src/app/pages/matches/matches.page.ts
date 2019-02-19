import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/data/firestore.service';
import { statNames, modifiedStatNames } from '../../consts';
import { currentEvent } from '../../consts';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-matches',
  templateUrl: 'matches.page.html',
  styleUrls: ['matches.page.scss'],
})

export class MatchesPage implements OnInit {

  matchCollectionObservable
  teamNumber: string
  showStats = true
  showEvents = true
  matchesArray = []
  stats = statNames
  teamName: string
  teamWebsite: string
  averageStats = modifiedStatNames
  eventsObservable
  socialMediaObservable

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private blueAllianceService: BlueAllianceService,
  ) { }

  // ionViewDidLoad() {
  ngOnInit() {
    this.teamNumber = this.route.snapshot.paramMap.get('teamNumber');
    this.matchCollectionObservable = this.firestoreService.getMatchList(currentEvent, this.teamNumber).valueChanges();
    this.eventsObservable = this.blueAllianceService.getTeamEvents(`frc${this.teamNumber}`, 2018)
    this.socialMediaObservable = this.blueAllianceService.getSocialMedia(`frc${this.teamNumber}`)

    this.blueAllianceService.getTeamInformation(`frc${this.teamNumber}`).subscribe(data => {
      this.teamName = data.nickname
      this.teamWebsite = data.website
    })

    this.getTeamIcon(+this.teamNumber)
  }

  getTeamIcon(teamNumber: number) {
    $.get('https://api.allorigins.ml/get?method=raw&url=' + encodeURIComponent(`https://thebluealliance.com/team/${teamNumber}/2018`) + '&callback=?', function (data) {
      const OOF = $.parseHTML(data)[73]['innerHTML']
      const OOFindex = OOF.indexOf('data:image/png')

      this.image = OOF.slice(OOFindex, -OOFindex).substring(0, OOF.indexOf('=">') - OOFindex + 1)
      console.log(this.image)

      $('#kms').attr('src', this.image)
    })
  }

  toggleMatchData() {
    this.showStats = !this.showStats
  }

  toggleEvents() {
    this.showEvents = ! this.showEvents
  }

  // an attempt to make the html less gay
  getMatchesArray(matchNumber) {
    this.matchCollectionObservable.subscribe(match => {
      match.forEach(stats => {
        if (stats.matchNumber == matchNumber) {
          Object.entries(stats).forEach(([key, value]) => {
            this.matchesArray.push(value)
            console.log(value)
          })
        }
      })
    })
  }

}
