import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { xTBAauthKey } from '../../credentials';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class BlueAllianceService {

  baseUrl = 'https://www.thebluealliance.com/api/v3'
  sheetsUrl = 'https://script.google.com/macros/s/AKfycbzxu_K5x1WRH6EpX8_I6VUWUgQ4jVVBjHZQWTGL8EPB2MGWUQlU/exec?test=TEST HERE'
  cors_api_url = 'https://cors-anywhere.herokuapp.com/'

  constructor(private http: Http) { }

  doCORSRequest(options, printResult) {
    const x = new XMLHttpRequest()
    x.open(options.method, this.cors_api_url + options.url)
    x.onload = x.onerror = function () {
      printResult(
        options.method + ' ' + options.url + '\n' +
        x.status + ' ' + x.statusText + '\n\n' +
        (x.responseText || '')
      )
    }
    if (/^POST/i.test(options.method)) { x.setRequestHeader('Content-Type', 'application/json'); x.send(options.data) } // x-www-form-urlencoded
  }

  postDataToSpreadsheet(matchData: any) {
    // this.http.post(this.sheetsUrl + 'id=' + matchData['id'], matchData)

    this.doCORSRequest({
      method: 'POST',
      url: this.sheetsUrl, //  + 'id=' + matchData['id']
      data: matchData
    }, function(data) {
      console.log(data)
    })
  }

  // eventKey = year + event_code
  // teamKey = frc + team_number

  getTeamIcon = async (teamNumber: number, imgID: string, year) => {
    let finalOOF = ''
    await $.get('https://api.allorigins.win/raw?url=' + encodeURIComponent(`https://thebluealliance.com/team/${teamNumber}/${year}`) + '&callback=?', function (data) {
      const OOF = $.parseHTML(data)[73]['innerHTML']
      const OOFindex = OOF.indexOf('data:image/png')
      finalOOF = OOF.slice(OOFindex, -OOFindex).substring(0, OOF.indexOf('Team') - OOFindex - 20)
    })
    return finalOOF
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
