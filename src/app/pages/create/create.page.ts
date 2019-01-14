import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import { Router } from '../../../../node_modules/@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { currentEvent } from '../intro/intro.page';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  public templateHTML;
  public matchNumber: number;
  public createMatchForm: FormGroup;
  public listOfTeams = [];
  public listOfTeamsInMatch = [];
  someArray2 = []
  hmm = true

  constructor(
    public kms: DomSanitizer,
    public router: Router,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    private blueAllianceService: BlueAllianceService,
    public alertController: AlertController,
    FormEditor: FormBuilder
  ) {
    this.createMatchForm = FormEditor.group({
      teamNumber: ['', Validators.required],
      matchNumber: [1, Validators.required],
      scoutName: ['', Validators.required],
      startingPosition: ['', Validators.required],
      autoRun: [false, Validators.required],
      autoSwitch: [false, Validators.required],
      autoScale: [false, Validators.required],
      climb: ['', Validators.required],
      cards: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  ngOnInit() {
    // this.putTeamsInSelect('2018gal');
    // this.putTeamsInSelectByMatch(currentEvent, 'qm', 1); // this.matchNumber
    // this.setMatchNumber();
    this.firestoreService.getAllScoutingTemplates().valueChanges().forEach(hi => {
      hi.forEach(bye => {
        this.someArray2.push({
          name: bye['name'],
          label: bye['name'],
          type: 'radio',
          value: bye
        })
      })
    })
  }

  async createMatch() {
    const loading = await this.loadingCtrl.create();

    // match = {[stuff]}
    // this.firestoreService.createMatch(currentEvent, match).then(() => {
    //   loading.dismiss().then(() => {
    //     // make it refresh the page instead of doing this
    //     this.router.navigateByUrl('teams');
    //   });
    // }, error => {
    //   console.error(error);
    // });

    // this.blueAllianceService.postDataToSpreadsheet('1o-y1iQ12cWgQ-3NxnNig9buxYptjNzNLkRrIFBMZoq8', match).subscribe();

    return await loading.present();
  }

  setMatchNumber() {
    // set it based on the number of times the submission button has been pressed
    // have a manual override button next to the label as well that turns it into an input

    // this.matchNumber = this.firestoreService.countFirestoreDocuments();
  }

  getVariablesFromHTMLComponenets(templateComponents) {
    const hi = templateComponents['templateComponents']

    console.log(hi)
    hi.forEach(thing => {
      console.log(thing.labelName)
      console.log(document.getElementById(thing.labelName))
    })
  }

  async showScoutingTemplate() {
    const alert = await this.alertController.create({
      header: 'Choose a template',
      inputs: this.someArray2,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          handler: (data: string) => {
            this.someArray2 = []
            this.hmm = false
            this.templateHTML = this.kms.bypassSecurityTrustHtml(data['templateHTML'])
            this.getVariablesFromHTMLComponenets(data)
          }
        }
      ]
    })
    await alert.present()
  }

  putTeamsInSelect(eventKey: string) {
    this.blueAllianceService.getEventTeams(eventKey).subscribe(data => {
      data.forEach(team => {
        this.listOfTeams.push(team.team_number);
      });
    });
  }

  putTeamsInSelectByMatch(eventKey: string, compLevel: string, matchNumber: any) {
    const matchKey = eventKey + '_' + compLevel + matchNumber;
    this.blueAllianceService.getMatch(matchKey).subscribe(data => {

      const alliances = [data.alliances.red.team_keys, data.alliances.blue.team_keys];
      alliances.forEach(alliance => {
        alliance.forEach(teamKey => {
          this.listOfTeamsInMatch.push(teamKey.substring(3));
        });
      });

    });
  }

}
