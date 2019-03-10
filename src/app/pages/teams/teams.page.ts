import {Component, OnInit} from '@angular/core'
import { modifiedStatNames} from '../../consts'
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import { currentEvent } from '../settings/settings.page';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  teamCollectionObservable
  filteredArray = []
  originalArray = []
  team: any
  stats = modifiedStatNames
  
  constructor(
    private blueAllianceService: BlueAllianceService
  ) { }
  
  ngOnInit() {
    this.teamCollectionObservable = this.blueAllianceService.getEventTeams(currentEvent)
    
    this.teamCollectionObservable.subscribe(element => {
      element.forEach(el => {
        this.originalArray.push(el)
      })
    })
    this.filteredArray = this.originalArray
  }
  
  getItems(ev) {
    const val = ev.target.value
    
    if (val && val.trim() !== '') {
      this.filteredArray = this.originalArray.filter(item => {
        return item.key.substring(3).startsWith(val) // could also use .contains() if necessary
      })
    } else {
      this.filteredArray = this.originalArray
    }
  }
  
}
