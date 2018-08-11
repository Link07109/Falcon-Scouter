import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Match } from '../../models/match.interface';
import { Team } from '../../models/team.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  createMatch(
    teamNumber: number,
    matchNumber: number,
    scoutName: string,
    startingPosition: string,
    autoRun: boolean,
    autoSwitch: boolean,
    autoSwitchCubes: number,
    autoScale: boolean,
    autoScaleCubes: number,
    switchCubes: number,
    switchFailedCubes: number,
    scaleCubes: number,
    scaleFailedCubes: number,
    exchangeCubes: number,
    climb: string,
    cards: string,
    comments: string
  ): Promise<void> {
    return this.firestore.doc(`teams/${teamNumber}/matches/${matchNumber}`).set({
      teamNumber, matchNumber, scoutName, startingPosition, autoRun, autoSwitch,
      autoSwitchCubes, autoScale, autoScaleCubes, switchCubes, switchFailedCubes,
      scaleCubes, scaleFailedCubes, exchangeCubes, climb, cards, comments
    });
  }

  getTeamList(): AngularFirestoreCollection<Team> {
    return this.firestore.collection(`teams`);
  }

  getMatchList(teamNumber: any): AngularFirestoreCollection<Match> {
    return this.firestore.collection(`teams/${teamNumber}/matches`);
  }

  getMatchDetail(teamNumber: any, matchNumber: any): AngularFirestoreDocument<Match> {
    return this.firestore.doc(`teams/${teamNumber}/matches/${matchNumber}`);
  }

}
