import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/data/firestore.service';
import { Observable } from 'rxjs';
import { Match } from '../../models/match.interface';
import { currentEvent } from '../intro/intro.page';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public match: Observable<Match>;
  public team;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.team = this.route.snapshot.paramMap.get('number').split(' ')[0];
    const matchNumber = this.route.snapshot.paramMap.get('number').split(' ')[1];
    this.match = this.firestoreService.getMatchDetail(currentEvent, this.team, matchNumber).valueChanges();
  }
}
