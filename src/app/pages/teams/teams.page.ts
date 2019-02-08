import {Component, OnInit} from '@angular/core'
import {FirestoreService} from '../../services/data/firestore.service'
import {currentEvent, modifiedStatNames} from '../../consts'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  teamCollectionObservable
  filteredArray = []
  kmsAray = []
  team: any
  stats = modifiedStatNames
  
  constructor(private firestoreService: FirestoreService) {
  }
  
  // ionViewDidLoad() {
  ngOnInit() {
    this.teamCollectionObservable = this.firestoreService.getTeamList(currentEvent).valueChanges()
  
    this.teamCollectionObservable.subscribe(element => {
      element.forEach(el => {
        this.kmsAray.push(el)
      })
    })
    this.filteredArray = this.kmsAray
  }
  
  getItems(ev) {
    const val = ev.target.value
    
    if (val && val.trim() !== '') {
      this.filteredArray = this.kmsAray.filter(item => {
        return item['teamNumber'].startsWith(val) // could also use .contains() if necessary
      })
    } else {
      this.filteredArray = this.kmsAray
    }
  }
  
}
