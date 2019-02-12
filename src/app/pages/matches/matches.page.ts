import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/data/firestore.service';
import { statNames, modifiedStatNames } from '../../consts';
import { currentEvent } from '../../consts';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';

@Component({
  selector: 'app-matches',
  templateUrl: 'matches.page.html',
  styleUrls: ['matches.page.scss'],
})

export class MatchesPage implements OnInit {

  matchCollectionObservable
  teamNumber: string
  showStats = false
  showTeamAverages = false
  team: any
  matchesArray = []
  stats = statNames
  teamName: string
  teamWebsite: string
  averageStats = modifiedStatNames

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private blueAllianceService: BlueAllianceService,
  ) { }

  // ionViewDidLoad() {
  ngOnInit() {
    this.teamNumber = this.route.snapshot.paramMap.get('teamNumber');
    this.matchCollectionObservable = this.firestoreService.getMatchList(currentEvent, this.teamNumber).valueChanges();
    
    this.blueAllianceService.getTeamInformation(`frc${this.teamNumber}`).subscribe(data => {
      this.teamName = data.nickname
      this.teamWebsite = data.website
    })
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

  toggleStats() {
    this.showStats = !this.showStats;
  }

  fuckubutfortheteam() {
    this.showTeamAverages = !this.showTeamAverages;
  }

  showPitData() {
    console.log('nothing actually happens here yet');
  }

}
