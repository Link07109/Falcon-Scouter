import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.page.html',
  styleUrls: ['./form-builder.page.scss'],
})
export class FormBuilderPage implements OnInit {

  private templates;
  public templatesArray = [];
  public templateHTML;
  public hasChosenTemplate = false;

  constructor(
    public kms: DomSanitizer,
    private firestoreService: FirestoreService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.templates = this.firestoreService.getAllScoutingTemplates().valueChanges();
    this.setupArray();
  }

  setupArray() {
    this.templates.subscribe(data => {
      data.forEach(element => {
        console.log(element);
        this.templatesArray.push(element);
      });
    });
  }

  loadHTML() {
    this.templatesArray.forEach(element => {
      this.templateHTML = this.kms.bypassSecurityTrustHtml(element.templateHTML);
    });
    this.hasChosenTemplate = true;
  }

  createElement(html) {
    const elem = document.createElement('ion-item');
    elem.innerHTML = html;
    if (elem.childNodes.length > 0) {
      document.getElementById('divID').appendChild(elem);
      return elem.childNodes[0];
    }
  }

  save() {
    // this.template = document.getElementById('divID').outerHTML;
    // this.firestoreService.saveScoutingTemplate('idfk', this.template);

    this.presentAlert('Template saved');
  }

  async presentAlert(title: string, message?: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

}
