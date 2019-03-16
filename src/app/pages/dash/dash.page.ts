import { Component, OnInit } from '@angular/core';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import {currentEvent, eventName} from '../settings/settings.page'

@Component({
  selector: 'app-dash',
  templateUrl: './dash.page.html',
  styleUrls: ['./dash.page.scss'],
})
export class DashPage implements OnInit {

  matchCollectionObservable
  matchCollectionArray = []
  filteredArray= []
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
        console.log(el)
        this.matchCollectionArray.push(el)
      })
      this.filteredArray = this.matchCollectionArray.sort((a, b) => (a.comp_level < b.comp_level) ? 1 : -1)// .sort((a, b) => (a.match_number - b.match_number))
    })
  }

  getItems(ev) {
    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.filteredArray = this.matchCollectionArray.filter(item => {
        // return String(item.match_number).startsWith(val) // this only lets you search with the number of the match, regardless of comp_level
        return String(item.key.slice(item.key.indexOf('_') + 1)).startsWith(val) // this lets you search with the comp_level
      })
    }
  }

}
