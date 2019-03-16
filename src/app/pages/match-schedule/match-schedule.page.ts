import { Component, OnInit } from '@angular/core';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import {currentEvent, eventName} from '../settings/settings.page'

@Component({
  selector: 'app-dash',
  templateUrl: './match-schedule.page.html',
  styleUrls: ['./match-schedule.page.scss'],
})
export class MatchSchedulePage implements OnInit {

  matchCollectionObservable
  matchCollectionArray = []
  filteredArray = []
  socialMediaObservable
  event
  curComp

  constructor(
    private blueAllianceService: BlueAllianceService,
  ) { }

  ngOnInit() {
    this.refresh(null)
  }

  refresh(ev) {
    this.curComp = currentEvent
    this.event = eventName
    this.matchCollectionObservable = this.blueAllianceService.getEventMatches(currentEvent)

    this.matchCollectionObservable.subscribe(element => {
      element.forEach(el => {
        this.matchCollectionArray.push(el)
      })
      this.filteredArray = this.matchCollectionArray.sort((a, b) => a.predicted_time - b.predicted_time)
    })
  }

  getItems(ev) {
    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.filteredArray = this.matchCollectionArray.sort((a, b) => a.actual_time - b.actual_time).filter(item => {
        // return String(item.match_number).startsWith(val) // this only lets you search with the number of the match, regardless of comp_level
        return String(item.key.slice(item.key.indexOf('_') + 1)).startsWith(val) // this lets you search with the comp_level
      })
    } else {
      this.filteredArray = this.matchCollectionArray.sort((a, b) => a.actual_time - b.actual_time)
    }
  }

}
