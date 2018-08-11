import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/data/firestore.service';

@Component({
  selector: 'app-matches',
  templateUrl: 'matches.page.html',
  styleUrls: ['matches.page.scss'],
})
export class MatchesPage implements OnInit {
  public matchList;
  public teamNumber: string;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute
  ) { }

  // ionViewDidLoad() {
  ngOnInit() {
    this.teamNumber = this.route.snapshot.paramMap.get('teamNumber');
    this.matchList = this.firestoreService.getMatchList(`${this.teamNumber}`).valueChanges();
  }

}
