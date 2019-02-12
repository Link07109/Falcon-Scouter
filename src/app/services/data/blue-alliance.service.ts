import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { xTBAauthKey } from '../../../app/credentials';

@Injectable({
  providedIn: 'root'
})
export class BlueAllianceService {

  baseUrl = 'https://www.thebluealliance.com/api/v3'
  sheetsUrl = 'https://script.google.com/macros/s/AKfycbwz580srBLDEkRADXlks_aDfydvGC4L0PWaAUUP2o0hJJn4HFnm/exec?'

  constructor(private http: Http) { }

  postDataToSpreadsheet(sheetId: string, matchData: any) {
    const url = this.sheetsUrl
    const json = {
      data: matchData,
      id: sheetId
    }

    return this.http.post(url, json);
  }

  getEventTeams(eventKey: string) { // year + event_code
    return this.http.get(`${this.baseUrl}/event/${eventKey}/teams/simple?X-TBA-Auth-Key=${xTBAauthKey}`)
      .pipe(map(res => res.json()))
  }

  getEventMatches(eventKey: string) {
    return this.http.get(`${this.baseUrl}/event/${eventKey}/matches/simple?X-TBA-Auth-Key=${xTBAauthKey}`)
      .pipe(map(res => res.json()))
  }

  getTeamInformation(teamKey: string) {
    return this.http.get(`${this.baseUrl}/team/${teamKey}?X-TBA-Auth-Key=${xTBAauthKey}`)
      .pipe(map(res => res.json()))
  }

  getTeamMatches(teamKey: string, eventKey: string) {
    return this.http.get(`${this.baseUrl}/team/${teamKey}/event/${eventKey}/matches/simple?X-TBA-Auth-Key=${xTBAauthKey}`)
      .pipe(map(res => res.json()))
  }

  getMatch(matchKey: string) { // eventKey + '_' + comp_level + matchNumber
    // comp levels:  qm, qf, sf, f
    return this.http.get(`${this.baseUrl}/match/${matchKey}?X-TBA-Auth-Key=${xTBAauthKey}`)
      .pipe(map(res => res.json()))
  }

  getSocialMedia(teamKey: string) {
    return this.http.get(`${this.baseUrl}/team/${teamKey}/social_media?X-TBA-Auth-Key=${xTBAauthKey}`)
      .pipe(map(res => res.json()))
  }

}
