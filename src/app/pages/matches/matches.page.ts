import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/data/firestore.service';
import { statNames } from '../../consts';

@Component({
  selector: 'app-matches',
  templateUrl: 'matches.page.html',
  styleUrls: ['matches.page.scss'],
})
export class MatchesPage implements OnInit {
  public matchCollectionObservable;
  public teamNumber: string;
  // public filteredArray = new Array<Match>();

  public stats = statNames;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute
  ) { }

  // ionViewDidLoad() {
  ngOnInit() {
    this.teamNumber = this.route.snapshot.paramMap.get('teamNumber');
    this.matchCollectionObservable = this.firestoreService.getMatchList(this.teamNumber).valueChanges();
  }

}
