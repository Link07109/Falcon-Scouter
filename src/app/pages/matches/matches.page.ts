import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/data/firestore.service';
import { statNames, modifiedStatNames } from '../../consts';
 ;
import { currentEvent } from '../../consts';

@Component({
  selector: 'app-matches',
  templateUrl: 'matches.page.html',
  styleUrls: ['matches.page.scss'],
})

export class MatchesPage implements OnInit {
  public matchCollectionObservable;
  public teamNumber: string;
  public showStats = true;
  public showTeamAverages = false;
  public team: any;

  // these values would be the average number for each stat (percentages?) might need two graphs for that :thinking:
  // ability to comparae graphs with other teams would be a nice addition for the future
  public data = [
    { 'statName': 'auto run', 'value': .9, },
    { 'statName': 'auto switch', 'value': .4 },
    { 'statName': 'auto switch cubes', 'value': .2 },
    { 'statName': 'auto scale', 'value': .5 },
    { 'statName': 'auto scale cubes', 'value': .25 },
    { 'statName': 'switch cubes', 'value': .2 },
    { 'statName': 'switch failed cubes', 'value': .05 },
    { 'statName': 'scale cubes', 'value': .6 },
    { 'statName': 'scale failed cubes', 'value': .1 },
    { 'statName': 'exchange cubes', 'value': 0 },
    { 'statName': 'climbed', 'value': .7 }
  ];

  public stats = statNames;
  public averageStats = modifiedStatNames;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute
  ) { }

  // ionViewDidLoad() {
  ngOnInit() {
    this.teamNumber = this.route.snapshot.paramMap.get('teamNumber');
    this.matchCollectionObservable = this.firestoreService.getMatchList(currentEvent, this.teamNumber).valueChanges();
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
