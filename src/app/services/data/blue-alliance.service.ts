import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { xTBAauthKey } from '../../../app/credentials';

@Injectable({
  providedIn: 'root'
})
export class BlueAllianceService {

  baseUrl = 'http://www.thebluealliance.com/api/v3';

  constructor(private http: Http) {
  }

  getEventTeams(eventKey: string): any { // year + event_code
    return this.http.get(`${this.baseUrl}/event/${eventKey}/teams/simple?X-TBA-Auth-Key=${xTBAauthKey}`)
    .pipe(map(res => res.json()));
  }

  getMatch(matchKey: string): any { // eventKey + '_' + comp_level + matchNumber
    // comp levels:  qm, qf, sf, f
    return this.http.get(`${this.baseUrl}/match/${matchKey}?X-TBA-Auth-Key=${xTBAauthKey}`)
    .pipe(map(res => res.json()));
  }

  getCcwmOpr(eventKey: string): any { // year + event_code
    return this.http.get(`${this.baseUrl}/event/${eventKey}/oprs?X-TBA-Auth-Key=${xTBAauthKey}`)
    .pipe(map(res => res.json()));
  }

}
