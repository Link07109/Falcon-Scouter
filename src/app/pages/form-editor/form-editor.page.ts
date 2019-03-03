import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.page.html',
  styleUrls: ['./form-editor.page.scss'],
})
export class FormEditorPage implements OnInit {

  private templates
  private templateName
  templatesArray = []
  items = []
  templateHTML
  hasChosenTemplate = false
  useTemplate = false
  
  cargoInShip = 0
  cargoInLRocket = 0
  cargoInMRocket = 0
  cargoInHRocket = 0
  
  hatchInShip = 0
  hatchInLRocket = 0
  hatchInMRocket = 0
  hatchInHRocket = 0

  formData = { data: {} }

  constructor(
    public sanitizer: DomSanitizer,
    private firestoreService: FirestoreService,
    private blueAllianceService: BlueAllianceService,
    public alertController: AlertController,
  ) { }

  addCargoToShip() {
    this.cargoInShip += 1
  }
  
  addCargoToLRocket() {
    this.cargoInLRocket += 1
  }

  addCargoToMRocket() {
    this.cargoInMRocket += 1
  }

  addCargoToHRocket() {
    this.cargoInHRocket += 1
  }

  removeCargoToShip() {
    this.cargoInShip -= 1
  }
  
  removeCargoToLRocket() {
    this.cargoInLRocket -= 1
  }

  removeCargoToMRocket() {
    this.cargoInMRocket -= 1
  }

  removeCargoToHRocket() {
    this.cargoInHRocket -= 1
  }


  addHatchToShip() {
    this.hatchInShip += 1
  }

  addHatchToLRocket() {
    this.hatchInLRocket += 1
  }

  addHatchToMRocket() {
    this.hatchInMRocket += 1
  }

  addHatchToHRocket() {
    this.hatchInHRocket += 1
    console.log(this.hatchInHRocket)
  }

  removeHatchToShip() {
    this.hatchInShip -= 1
  }

  removeHatchToLRocket() {
    this.hatchInLRocket -= 1
  }

  removeHatchToMRocket() {
    this.hatchInMRocket -= 1
  }

  removeHatchToHRocket() {
    this.hatchInHRocket -= 1
  }

  ngOnInit() {
    this.templates = this.firestoreService.getAllScoutingTemplates().valueChanges()
    this.setupArray()
  }

  setupArray() {
    this.templates.subscribe(data => {
      data.forEach(element => {
        this.templatesArray.push(element)
      })
    })
  }

  toggleChosenTemplateBool() {
    this.hasChosenTemplate = true
  }

  submitData() {
    this.formData.data = {
      cargoInShip: this.cargoInShip,
      cargoInLRocket: this.cargoInLRocket,
      cargoInMRocket: this.cargoInMRocket,
      cargoInHRocket: this.cargoInHRocket,
    
      hatchInShip: this.hatchInShip,
      hatchInLRocket: this.hatchInLRocket,
      hatchInMRocket: this.hatchInMRocket,
      hatchInHRocket: this.hatchInHRocket,
    }

    this.firestoreService
      .createMatch('2019ncwak', this.formData)
      .then(() => {
        this.blueAllianceService.postDataToSpreadsheet('1o-y1iQ12cWgQ-3NxnNig9buxYptjNzNLkRrIFBMZoq8', this.formData)
        this.presentAlert('Success!', 'Form data submitted.')
      }, error => {
        console.error(error);
        // add to a queue if offline and detect when its online -> and then push them all at once with a button somewhere else
      })

  }

  loadHTMLToEdit(element) {
    this.templateHTML = this.sanitizer.bypassSecurityTrustHtml(element.templateHTML)
    this.hasChosenTemplate = true
  }

  loadHTMLToUse(element) {
    this.templateHTML = this.sanitizer.bypassSecurityTrustHtml(element.templateHTML)
    this.useTemplate = true
  }

  saveTemplate() {
    const template = document.getElementById('divID').innerHTML // outerHTML
    this.inputAlert('Save Template', template)
  }

  deelete(element: HTMLIonItemSlidingElement) {
    // element.parentNode.removeChild(element)
    document.getElementById('divID').removeChild(element)
    console.log(document.getElementById('divID').children)
  }

  createElement(html, id) {
    const elem = document.createElement('ion-item-sliding') //  (ionSwipe)="delete({{elem}})"
    elem.setAttribute('id', id)

    elem.innerHTML = 
    `
    <ion-grid>
      <ion-row>
        <ion-col size="1">
          <ion-reorder></ion-reorder>
        </ion-col>
        <ion-col size="9">
          <ion-item-options side="start">
            <ion-button (click)='deelete(elem)'>Delete</ion-button>
          </ion-item-options>
          ${html}
        </ion-col>
      </ion-row>
    </ion-grid>
   `

    if (elem.childNodes.length > 0) {
      document.getElementById('divID').appendChild(elem)
      this.items.push(elem)
      return elem.childNodes[0]
    }
  }

  async createComponent(componentName, html = '') {
    const alert = await this.alertController.create({
      header: `Create new ${componentName}`,
      inputs: [
        {
          name: 'labelName',
          type: 'text',
          placeholder: 'placeholder'
        },
      ],
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
          handler: data => {
            const name = data['labelName']

            html = `<ion-item>
                      <ion-label color="dark">${name}</ion-label>
                      <ion-${componentName} color="secondary" [(ngModel)]="formData.${name}" [ngModelOptions]="{standalone: true}" name="${name}">${html}</ion-${componentName}>
                    </ion-item>`
            
            this.createElement(html, name)
          }
        }
      ]
    })
    await alert.present()
  }

  async selectorAlert() {
    const alert = await this.alertController.create({
      header: 'Create Selector',
      inputs: [
        {
          name: 'labelName',
          type: 'text',
          placeholder: 'name'
        },
        {
          name: 'Option 1 Name',
          type: 'text',
          placeholder: 'option 1'
        },
        {
          name: 'Option 2 Name',
          type: 'text',
          placeholder: 'option 2'
        },
        {
          name: 'Option 3 Name',
          type: 'text',
          placeholder: 'option 3'
        },
      ],
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
          handler: data => {
            let stringg = ''
            const name = data['labelName']

            Object.entries(data).forEach(([key, value]) => {
              // skip the first one, which is just the name of the component
              if (key == 'labelName') {
                return
              }
              stringg += `<ion-select-option>${value}</ion-select-option>`
            })

            const html = name + `<ion-item><ion-select [(ngModel)]="formData.${name}" name="${name}">${stringg}</ion-select></ion-item>`
            this.createElement(html, name)
          }
        }
      ]
    })
    await alert.present()
  }

  async inputAlert(title: string, template) {
    const alert = await this.alertController.create({
      header: title,
      inputs: [
        {
          name: 'Template Name',
          type: 'text',
          placeholder: 'placeholder'
        },
      ],
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
          handler: data => {
            this.templateName = data['Template Name']
            this.presentAlert('Success!', 'Form template saved.')
            this.firestoreService.saveScoutingTemplate(this.templateName, template)
          }
        }
      ]
    })
    await alert.present()
  }

  async presentAlert(title: string, message?: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            document.location.reload()
          }
        }
      ]
    })
    await alert.present()
  }

}
