import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
 

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  createMatch(event: string, match: any) {
    return this.firestore.doc(`events/${event}/teams/${match.teamNumber}/matches/${match.matchNumber}`).set(match)
  }

  getTeamList(event: string): AngularFirestoreCollection {
    return this.firestore.collection(`events/${event}/teams`)
  }

  getMatchList(event: string, teamNumber: any): AngularFirestoreCollection<any> {
    return this.firestore.collection(`events/${event}/teams/${teamNumber}/matches`)
  }

  getMatchDetail(event: string, teamNumber: any, matchNumber: any): AngularFirestoreDocument<any> {
    return this.firestore.doc(`events/${event}/teams/${teamNumber}/matches/${matchNumber}`)
  }


  saveScoutingTemplate(templateName: string, html: string) {
    this.firestore.doc(`templates/${templateName}`).set({ name: templateName, templateHTML: html })
  }

  deleteScoutingTemplate(templateName: string) {
    return this.firestore.doc(`templates/${templateName}`).delete()
  }

  getScoutingTemplate(templateName: string) {
    return this.firestore.doc(`templates/${templateName}`)
  }

  getAllScoutingTemplates() {
    return this.firestore.collection(`templates`)
  }

}
