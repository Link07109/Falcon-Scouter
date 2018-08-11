import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/data/firestore.service';
import { Observable } from 'rxjs';
import { Match } from '../../models/match.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public match: Observable<Match>;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const team = this.route.snapshot.paramMap.get('number').split(' ')[0];
    const matchNumber = this.route.snapshot.paramMap.get('number').split(' ')[1];
    this.match = this.firestoreService.getMatchDetail(team, matchNumber).valueChanges();
  }
}
