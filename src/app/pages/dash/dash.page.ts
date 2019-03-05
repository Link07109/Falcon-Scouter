import { Component, OnInit } from '@angular/core';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import { currentEvent } from '../settings/settings.page';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.page.html',
  styleUrls: ['./dash.page.scss'],
})
export class DashPage implements OnInit {

  matchCollectionObservable
  socialMediaObservable
  accountName = ''
  match
  curComp = currentEvent

  constructor(
    private blueAllianceService: BlueAllianceService,
  ) { }

  ngOnInit() {
    this.matchCollectionObservable = this.blueAllianceService.getEventMatches(currentEvent)
  }

  getItems(ev) {
    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.match = `qm${val}`
      // this.matchCollectionObservable = this.matchCollectionObservable.filter
    }
  }

}
