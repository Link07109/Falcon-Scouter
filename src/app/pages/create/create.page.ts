import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import { Router } from '../../../../node_modules/@angular/router';

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
  public createMatchForm: FormGroup;
  public listOfTeams = new Array;
  public listOfTeamsInMatch = new Array;

  constructor(
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
    this.putTeamsInSelect('2018gal');
    // this.putTeamsInSelectByMatch('2018gal', 'qm', 12); // 12 will be replaced with the matchNumber
  }

  async createMatch() {
    const loading = await this.loadingCtrl.create();

    const teamNumber = this.createMatchForm.value.teamNumber;
    const matchNumber = this.createMatchForm.value.matchNumber;
    const scoutName = this.createMatchForm.value.scoutName;
    const startingPosition = this.createMatchForm.value.startingPosition;
    const autoRun = this.createMatchForm.value.autoRun;
    const autoSwitch = this.createMatchForm.value.autoSwitch;
    const autoScale = this.createMatchForm.value.autoScale;
    const climb = this.createMatchForm.value.climb;
    const cards = this.createMatchForm.value.cards;
    const comments = this.createMatchForm.value.comments;

    this.firestoreService
      .createMatch(teamNumber, matchNumber, scoutName, startingPosition, autoRun, autoSwitch,
        this.autoSwitchCubes, autoScale, this.autoScaleCubes, this.cubesSwitch, this.failedSwitch,
        this.cubesScale, this.failedScale, this.cubesExchange, climb, cards, comments)
      .then(() => {
        loading.dismiss().then(() => {
          // dont do this - make it refresh the page somehow instead
          this.router.navigateByUrl('teams');
        });
      }, error => {
        console.error(error);
      });
    this.blueAllianceService.postDataToSpreadsheet('1o-y1iQ12cWgQ-3NxnNig9buxYptjNzNLkRrIFBMZoq8', teamNumber, matchNumber,
      scoutName, startingPosition, autoRun, autoSwitch, this.autoSwitchCubes, autoScale, this.autoScaleCubes, this.cubesSwitch,
      this.failedSwitch, this.cubesScale, this.failedScale, this.cubesExchange, climb, cards, comments).subscribe();

    return await loading.present();
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

      data.alliances.red.team_keys.forEach(teamKey => {
        this.listOfTeamsInMatch.push(teamKey.substring(3));
      });

      data.alliances.blue.team_keys.forEach(teamKey => {
        this.listOfTeamsInMatch.push(teamKey.substring(3));
      });

    });
  }

  // find a way to make all of these into a multipurpose function or something
  // this is the way i did it before in the android app and its so cancer
  addCubesAutoSwitch() {
    this.autoSwitchCubes++;
  }

  removeCubesAutoSwitch() {
    if (this.autoSwitchCubes > 0) {
      this.autoSwitchCubes--;
    }
  }

  addCubesAutoScale() {
    this.autoScaleCubes++;
  }

  removeCubesAutoScale() {
    if (this.autoScaleCubes > 0) {
      this.autoScaleCubes--;
    }
  }

  addCubesSwitch() {
    this.cubesSwitch++;
  }

  removeCubesSwitch() {
    if (this.cubesSwitch > 0) {
      this.cubesSwitch--;
    }
  }

  addCubesFailedSwitch() {
    this.failedSwitch++;
  }

  removeCubesFailedSwitch() {
    if (this.failedSwitch > 0) {
      this.failedSwitch--;
    }
  }

  addCubesScale() {
    this.cubesScale++;
  }

  removeCubesScale() {
    if (this.cubesScale > 0) {
      this.cubesScale--;
    }
  }

  addCubesFailedScale() {
    this.failedScale++;
  }

  removeCubesFailedScale() {
    if (this.failedScale > 0) {
      this.failedScale--;
    }
  }

  addCubesExchange() {
    this.cubesExchange++;
  }

  removeCubesExchange() {
    if (this.cubesExchange > 0) {
      this.cubesExchange--;
    }
  }

}
