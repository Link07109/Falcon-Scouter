import { Component, OnInit } from '@angular/core';
import {currentEvent, AppComponent} from '../../app.component'
import {BlueAllianceService} from '../../services/data/blue-alliance.service'

@Component({
  selector: 'app-event-info',
  templateUrl: './event-rankings.page.html',
  styleUrls: ['./event-rankings.page.scss'],
})
export class EventRankingsPage implements OnInit {

  rankingArray = []

  constructor(
    private blueAllianceService: BlueAllianceService,
    public appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.refresh()
  }

  refresh() {
    this.rankingArray = []

    this.blueAllianceService.getEventRankings(currentEvent).subscribe(element => {
      if (element != null) { 
        element.rankings.forEach(el => {
          this.blueAllianceService.getTeamInformation(el.team_key).subscribe(ell => {
            console.log(el)
            this.rankingArray.push([el, ell.nickname, el.qual_average])
            this.rankingArray = this.rankingArray.sort((a, b) => a[0].rank - b[0].rank)
          })
        })
      }
    })
  }

}
