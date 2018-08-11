import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  public teamList;

  constructor(private firestoreService: FirestoreService) { }

  // search filter method
  // getItems(ev) {
  //   // Reset items back to all of the items
  //   // this.initializeItems();

  //   // set val to the value of the ev target
  //   const val = ev.target.value;

  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() !== '') {
  //     this.teamList = this.teamList.filter((item) => {
  //       return (item.teamNumber.indexOf(val) > -1);
  //     });
  //   }
  // }

  // ionViewDidLoad() {
  ngOnInit() {
    this.teamList = this.firestoreService.getTeamList().valueChanges();
  }

}
