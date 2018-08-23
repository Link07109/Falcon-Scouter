import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { xTBAauthKey } from '../../../app/credentials';

@Injectable({
  providedIn: 'root'
})
export class BlueAllianceService {

  baseUrl = 'https://www.thebluealliance.com/api/v3';

  sheetsUrl = 'https://script.google.com/macros/s/AKfycbwz580srBLDEkRADXlks_aDfydvGC4L0PWaAUUP2o0hJJn4HFnm/exec?';
  // nice error u got there lul
  constructor(private http: Http) {
  }

  postDataToSpreadsheet(
    sheetId: string,
    teamNumber: number,
    matchNumber: number,
    scoutName: string,
    startingPosition: string,
    autoRun: boolean,
    autoSwitch: boolean,
    autoSwitchCubes: number,
    autoScale: boolean,
    autoScaleCubes: number,
    cubesSwitch: number,
    failedSwitch: number,
    cubesScale: number,
    failedScale: number,
    cubesExchange: number,
    climb: string,
    cards: string,
    comments: string
  ) {
    const url = this.sheetsUrl;

      const json = {
        startingPosition: startingPosition,
        matchNumber: matchNumber,
        scoutName: scoutName,
        autoRun: autoRun,
        autoSwitch: autoSwitch,
        autoSwitchCubes: autoSwitchCubes,
        autoScale: autoScale,
        autoScaleCubes: autoScaleCubes,
        switchCubes: cubesSwitch,
        switchFailedCubes: failedSwitch,
        scaleCubes: cubesScale,
        scaleFailedCubes: failedScale,
        exchangeCubes: cubesExchange,
        climbed: climb,
        cards: cards,
        comments: comments,
        teamNumber: teamNumber,
        id: sheetId
      };
      const headers = new Headers({'Content-Type': 'application/json'});
      // const options = new RequestOptions({ headers: headers });
      return this.http.post(url, json); // , options
  }

  getEventTeams(eventKey: string) { // year + event_code
    return this.http.get(`${this.baseUrl}/event/${eventKey}/teams/simple?X-TBA-Auth-Key=${xTBAauthKey}`)
    .pipe(map(res => res.json()));
  }

  getTeamMatches(teamKey: string, eventKey: string) {
    return this.http.get(`${this.baseUrl}/team/${teamKey}/event/${eventKey}/matches/simple?X-TBA-Auth-Key=${xTBAauthKey}`)
    .pipe(map(res => res.json()));
  }

  getMatch(matchKey: string) { // eventKey + '_' + comp_level + matchNumber
    // comp levels:  qm, qf, sf, f
    return this.http.get(`${this.baseUrl}/match/${matchKey}?X-TBA-Auth-Key=${xTBAauthKey}`)
    .pipe(map(res => res.json()));
  }

  getCcwmOpr(eventKey: string) { // year + event_code
    return this.http.get(`${this.baseUrl}/event/${eventKey}/oprs?X-TBA-Auth-Key=${xTBAauthKey}`)
    .pipe(map(res => res.json()));
  }

}
