import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { xTBAauthKey } from '../../../app/credentials';
import * as $ from 'jquery';
import { curYear } from '../../pages/settings/settings.page';

@Injectable({
  providedIn: 'root'
})
export class BlueAllianceService {

  baseUrl = 'https://www.thebluealliance.com/api/v3'
  sheetsUrl = 'https://script.google.com/macros/s/AKfycbwz580srBLDEkRADXlks_aDfydvGC4L0PWaAUUP2o0hJJn4HFnm/exec?'

  constructor(private http: Http) { }

  postDataToSpreadsheet(sheetId: string, matchData: any) {
    const json = {
      id: sheetId,
      matchData: matchData
    }

    return this.http.post(this.sheetsUrl, json)
  }

  // eventKey = year + event_code
  // teamKey = frc + team_number

  getTeamIcon(teamNumber: number, imgID: string) {
    $.get('https://api.allorigins.ml/get?method=raw&url=' + encodeURIComponent(`https://thebluealliance.com/team/${teamNumber}/${curYear}`) + '&callback=?', function (data) {
      const OOF = $.parseHTML(data)[73]['innerHTML']
      const OOFindex = OOF.indexOf('data:image/png')

      $(`#${imgID}`).attr('src', OOF.slice(OOFindex, -OOFindex).substring(0, OOF.indexOf('=">') - OOFindex + 1))
    })
  }

  getTeamEvents(teamKey: string, year: number) {
    return this.http.get(`${this.baseUrl}/team/${teamKey}/events/${year}?X-TBA-Auth-Key=${xTBAauthKey}`)
      .pipe(map(res => res.json()))
  }

  getEventInformation(eventKey: string) {
    return this.http.get(`${this.baseUrl}/event/${eventKey}?X-TBA-Auth-Key=${xTBAauthKey}`)
      .pipe(map(res => res.json()))
  }

  getEventTeams(eventKey: string) {
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
