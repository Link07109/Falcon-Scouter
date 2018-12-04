import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Match } from '../../models/match.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  createMatch(event: string, match: Match): Promise<void> {
    return this.firestore.doc(`events/${event}/teams/${match.teamNumber}/matches/${match.matchNumber}`)
      .set(match);
  }

  getTeamList(event: string): AngularFirestoreCollection {
    // return this.firestore.collection(`events/${event}/teams`);
    return this.firestore.collection(`teams`);
  }

  getMatchList(event: string, teamNumber: any): AngularFirestoreCollection<Match> {
    // return this.firestore.collection(`events/${event}/teams/${teamNumber}/matches`);
    return this.firestore.collection(`teams/${teamNumber}/matches`);
  }

  getMatchDetail(event: string, teamNumber: any, matchNumber: any): AngularFirestoreDocument<Match> {
    // return this.firestore.doc(`events/${event}/teams/${teamNumber}/matches/${matchNumber}`);
    return this.firestore.doc(`teams/${teamNumber}/matches/${matchNumber}`);
  }


  saveScoutingTemplate(templateName: string, html: string) {
    return this.firestore.doc(`templates/${templateName}`).set({ name: templateName, templateHTML: html });
  }

  getScoutingTemplate(templateName: string) {
    return this.firestore.doc(`templates/${templateName}`);
  }

  getAllScoutingTemplates() {
    return this.firestore.collection(`templates`);
  }

}
