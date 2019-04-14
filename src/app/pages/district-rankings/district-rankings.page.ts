import { Component, OnInit } from '@angular/core';
import {BlueAllianceService} from '../../services/data/blue-alliance.service'
import { AppComponent, currentDistrict } from '../../app.component'

@Component({
  selector: 'app-district-rankings',
  templateUrl: './district-rankings.page.html',
  styleUrls: ['./district-rankings.page.scss'],
})
export class DistrictRankingsPage implements OnInit {

  rankingArray = []

  constructor(
    private blueAllianceService: BlueAllianceService,
    public appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.refreshList()
  }

  refreshList() {
    this.rankingArray = []

    this.blueAllianceService.getDistrictRankings(currentDistrict).subscribe(element => {
      element.forEach(el => {
        console.log(el)
        this.blueAllianceService.getTeamInformation(el.team_key).subscribe(ell => {
          this.rankingArray.push([el, ell.nickname])
          console.log(el)
          this.rankingArray = this.rankingArray.sort((a, b) => a[0].rank - b[0].rank)
        })
      })
    })
  }

}
