import { Component, OnInit } from '@angular/core';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import { FirestoreService } from '../../services/data/firestore.service';
import { Observable } from 'rxjs';
import { Match } from '../../models/match.interface';
import { currentEvent } from '../../consts';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.page.html',
  styleUrls: ['./dash.page.scss'],
})
export class DashPage implements OnInit {
  public matchCollectionObservable;
  public team = 'frc5190';
  public matchKys: Match;

  constructor(
    private blueAllianceService: BlueAllianceService
  ) { }

  ngOnInit() {
    this.matchCollectionObservable = this.blueAllianceService.getTeamMatches(this.team, currentEvent);
  }

  getItems(ev) {
    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.team = `frc${val}`;
      this.matchCollectionObservable = this.blueAllianceService.getTeamMatches(this.team, currentEvent);
    }
  }

}
