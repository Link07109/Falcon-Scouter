import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Team } from '../../models/team.interface';
import { statNames } from '../../consts';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  public teamCollectionObservable;
  public filteredArray: Array<Team>;

  public stats = statNames;

  constructor(private firestoreService: FirestoreService) { }

  getItems(ev) {
    this.filteredArray = this.teamCollectionObservable;
    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.filteredArray = this.teamCollectionObservable.filter((item) => {
        return item.teamNumber.startsWith(val); // could also use .contains() if necessary
      });
    }
  }

  // ionViewDidLoad() {
  ngOnInit() {
    this.teamCollectionObservable = this.firestoreService.getTeamList().valueChanges();
    this.filteredArray = this.teamCollectionObservable;
  }

}
