import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Team } from '../../models/team.interface';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  private teamCollectionObservable;
  public firestoreDataArray = new Array<Team>();
  private filteredArray: Array<Team>;

  constructor(private firestoreService: FirestoreService) { }

  getItems(ev) {
    this.filteredArray = this.firestoreDataArray;
    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.filteredArray = this.firestoreDataArray.filter((item) => {
        return item.teamNumber.startsWith(val); // could also use .contains() if necessary
      });
    }
  }

  initializeArray() {
    this.teamCollectionObservable.subscribe(data => {
      data.forEach(doc => {
        this.firestoreDataArray.push(doc);
      });
    });
  }

  // ionViewDidLoad() {
  ngOnInit() {
    this.teamCollectionObservable = this.firestoreService.getTeamList().valueChanges();
    this.initializeArray();
    this.filteredArray = this.firestoreDataArray;
  }

}
