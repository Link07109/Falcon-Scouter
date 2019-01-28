import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { xTBAauthKey } from '../../../app/credentials';
 ;

@Injectable({
  providedIn: 'root'
})
export class BlueAllianceService {

  baseUrl = 'https://www.thebluealliance.com/api/v3';

  sheetsUrl = 'https://script.google.com/macros/s/AKfycbwz580srBLDEkRADXlks_aDfydvGC4L0PWaAUUP2o0hJJn4HFnm/exec?';
  // nice error u got there lul
  constructor(private http: Http) {
  }

  postDataToSpreadsheet(sheetId: string, match: any) {
    const url = this.sheetsUrl;
    // const json = {
    //   startingPosition: match.startingPosition,
    //   matchNumber: match.matchNumber,
    //   scoutName: match.scoutName,
    //   autoRun: match.autoRun,
    //   autoSwitch: match.autoSwitch,
    //   autoSwitchCubes: match.autoSwitchCubes,
    //   autoScale: match.autoScale,
    //   autoScaleCubes: match.autoScaleCubes,
    //   switchCubes: match.cubesSwitch,
    //   switchFailedCubes: match.failedSwitch,
    //   scaleCubes: match.cubesScale,
    //   scaleFailedCubes: match.failedScale,
    //   exchangeCubes: match.cubesExchange,
    //   climbed: match.climb,
    //   cards: match.cards,
    //   comments: match.comments,
    //   teamNumber: match.teamNumber,
    //   id: sheetId
    // };

    // return this.http.post(url, json); // , options
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
