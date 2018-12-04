import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Team } from '../../models/team.interface';
import { modifiedStatNames, currentEvent } from '../../consts';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  public teamCollectionObservable;
  public filteredArray: Team[];
  public team: Team;
  public stats = modifiedStatNames;

  constructor(private firestoreService: FirestoreService) { }

  // ionViewDidLoad() {
  ngOnInit() {
    this.teamCollectionObservable = this.firestoreService.getTeamList(currentEvent).valueChanges();
    this.filteredArray = this.teamCollectionObservable;
  }

  getItems(ev) {
    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.filteredArray = this.teamCollectionObservable.filter((item) => {
        return item.teamNumber.startsWith(val); // could also use .contains() if necessary
      });
    }
  }

  // public averageMatchData(teamNumber): Team {
  //   let autoRunSum = 0;
  //   let autoSwitchSum = 0;
  //   let autoSwitchCubesSum = 0;
  //   let autoScaleSum = 0;
  //   let autoScaleCubesSum = 0;
  //   let cubesSwitchSum = 0;
  //   let failedSwitchSum = 0;
  //   let cubesScaleSum = 0;
  //   let failedScaleSum = 0;
  //   let cubesExchangeSum = 0;
  //   let climbSum = 0;

  //   let autoRunAvg = 0;
  //   let autoSwitchAvg = 0;
  //   let autoSwitchCubesAvg = 0;
  //   let autoScaleAvg = 0;
  //   let autoScaleCubesAvg = 0;
  //   let cubesSwitchAvg = 0;
  //   let failedSwitchAvg = 0;
  //   let cubesScaleAvg = 0;
  //   let failedScaleAvg = 0;
  //   let cubesExchangeAvg = 0;
  //   let climbAvg = 0;

  //   this.firestoreService.getMatchList(currentEvent, teamNumber).valueChanges().subscribe(matches => {
  //     matches.forEach(match => {
  //       autoRunSum += match.autoRun ? 1 : 0;

  //       autoSwitchSum += match.autoSwitch ? 1 : 0;

  //       const autoSwitchCubes = match.autoSwitchCubes;
  //       autoSwitchCubesSum += autoSwitchCubes;

  //       const autoScale = match.autoScale ? 1 : 0;
  //       autoScaleSum += autoScale;

  //       const autoScaleCubes = match.autoScaleCubes;
  //       autoScaleCubesSum += autoScaleCubes; // from here on out it seems to fuck up the numbers

  //       const cubesSwitch = match.cubesSwitch;
  //       cubesSwitchSum += cubesSwitch;

  //       const failedSwitch = match.failedSwitch;
  //       failedSwitchSum += failedSwitch;

  //       const cubesScale = match.cubesScale;
  //       cubesScaleSum += cubesScale;

  //       const failedScale = match.failedScale;
  //       failedScaleSum += failedScale;

  //       const cubesExchange = match.cubesExchange;
  //       cubesExchangeSum += cubesExchange;

  //       const climb = match.climb === 'Climbed' ? 1 : 0;
  //       climbSum += climb;
  //     });

  //     autoRunAvg = this.averagee(autoRunSum, matches.length);
  //     autoSwitchAvg = this.averagee(autoSwitchSum, matches.length);
  //     autoSwitchCubesAvg = this.averagee(autoSwitchCubesSum, matches.length);
  //     autoScaleAvg = this.averagee(autoScaleSum, matches.length);
  //     autoScaleCubesAvg = this.averagee(autoScaleCubesSum, matches.length);
  //     cubesSwitchAvg = this.averagee(cubesSwitchSum, matches.length);
  //     failedSwitchAvg = this.averagee(failedSwitchSum, matches.length);
  //     cubesScaleAvg = this.averagee(cubesScaleSum, matches.length);
  //     failedScaleAvg = this.averagee(failedScaleSum, matches.length);
  //     cubesExchangeAvg = this.averagee(cubesExchangeSum, matches.length);
  //     climbAvg = this.averagee(climbSum, matches.length);

  //     this.team = {
  //       teamNumber: 0,
  //       startingPosition: '',
  //       autoRunPercent: autoRunAvg,
  //       autoSwitchPercent: autoSwitchAvg,
  //       avgAutoSwitchCubes: autoSwitchCubesAvg,
  //       autoScalePercent: autoScaleAvg,
  //       avgAutoScaleCubes: autoScaleCubesAvg,
  //       avgSwitchCubes: cubesSwitchAvg,
  //       avgSwitchFailedCubes: failedSwitchAvg,
  //       avgScaleCubes: cubesScaleAvg,
  //       avgScaleFailedCubes: failedScaleAvg,
  //       avgExchangeCubes: cubesExchangeAvg,
  //       climbPercent: climbAvg
  //     };
  //   });
  //   return this.team;
  // }

  averagee(sum, length) {
    return sum / length;
  }

}
