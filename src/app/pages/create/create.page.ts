import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import { Router } from '../../../../node_modules/@angular/router';
import { Match } from '../../models/match.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { currentEvent } from '../../consts';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  public autoSwitchCubes = 0;
  public autoScaleCubes = 0;
  public cubesSwitch = 0;
  public failedSwitch = 0;
  public cubesScale = 0;
  public failedScale = 0;
  public cubesExchange = 0;

  public templateHTML;
  public matchNumber: number;
  public createMatchForm: FormGroup;
  public listOfTeams = [];
  public listOfTeamsInMatch = [];

  constructor(
    public kms: DomSanitizer,
    public router: Router,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    private blueAllianceService: BlueAllianceService,
    formBuilder: FormBuilder
  ) {
    this.createMatchForm = formBuilder.group({
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
  }

  async createMatch() {
    const loading = await this.loadingCtrl.create();

    const match: Match = {
      teamNumber: this.createMatchForm.value.teamNumber,
      matchNumber: this.createMatchForm.value.matchNumber,
      scoutName: this.createMatchForm.value.scoutName,
      startingPosition: this.createMatchForm.value.startingPosition,
      autoRun: this.createMatchForm.value.autoRun,
      autoSwitch: this.createMatchForm.value.autoSwitch,
      autoSwitchCubes: this.autoSwitchCubes,
      autoScale: this.createMatchForm.value.autoScale,
      autoScaleCubes: this.autoScaleCubes,
      cubesSwitch: this.cubesSwitch,
      failedSwitch: this.failedSwitch,
      cubesScale: this.cubesScale,
      failedScale: this.failedScale,
      cubesExchange: this.cubesExchange,
      climb: this.createMatchForm.value.climb,
      cards: this.createMatchForm.value.cards,
      comments: this.createMatchForm.value.comments
    };

    this.firestoreService.createMatch(currentEvent, match).then(() => {
      loading.dismiss().then(() => {
        // make it refresh the page instead of doing this
        this.router.navigateByUrl('teams');
      });
    }, error => {
      console.error(error);
    });

    this.blueAllianceService.postDataToSpreadsheet('1o-y1iQ12cWgQ-3NxnNig9buxYptjNzNLkRrIFBMZoq8', match).subscribe();

    return await loading.present();
  }

  setMatchNumber() {
    // this.matchNumber = this.firestoreService.countFirestoreDocuments();
  }

  showScoutingTemplate() {
    this.firestoreService.getScoutingTemplate('idfk').valueChanges().subscribe(data => {
      this.templateHTML = this.kms.bypassSecurityTrustHtml(data['templateHTML']);
    });
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

      // gay way
      // data.alliances.red.team_keys.forEach(teamKey => {
      //   this.listOfTeamsInMatch.push(teamKey.substring(3));
      // });
      // data.alliances.blue.team_keys.forEach(teamKey => {
      //   this.listOfTeamsInMatch.push(teamKey.substring(3));
      // });

    });
  }

  // this is still gay
  addCubes(varToChange) {
    switch (varToChange) {
      case 'autoScaleCubes':
        this.autoScaleCubes++;
        break;

      case 'autoSwitchCubes':
        this.autoSwitchCubes++;
        break;

      case 'cubesSwitch':
        this.cubesSwitch++;
        break;

      case 'failedSwitch':
        this.failedSwitch++;
        break;

      case 'cubesScale':
        this.cubesScale++;
        break;

      case 'failedScale':
        this.failedScale++;
        break;

      case 'cubesExchange':
        this.cubesExchange++;
        break;
    }
  }

  removeCubes(varToChange) {
    switch (varToChange) {
      case 'autoScaleCubes':
        if (this.autoScaleCubes > 0) { this.autoScaleCubes--; }
        break;

      case 'autoSwitchCubes':
        if (this.autoSwitchCubes > 0) { this.autoSwitchCubes--; }
        break;

      case 'cubesSwitch':
        if (this.cubesSwitch > 0) { this.cubesSwitch--; }
        break;

      case 'failedSwitch':
        if (this.failedSwitch > 0) { this.failedSwitch--; }
        break;

      case 'cubesScale':
        if (this.cubesScale > 0) { this.cubesScale--; }
        break;

      case 'failedScale':
        if (this.failedScale > 0) { this.failedScale--; }
        break;

      case 'cubesExchange':
        if (this.cubesExchange > 0) { this.cubesExchange--; }
        break;
    }
  }

}
