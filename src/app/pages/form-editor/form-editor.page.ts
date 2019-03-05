import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import * as $ from 'jquery';
import { AlertInput } from '@ionic/core';

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
    this.cargoInShip += (this.cargoInShip >= 8) ? 0 : 1
  }

  removeCargoToShip() {
    this.cargoInShip -= (this.cargoInShip <= 0) ? 0 : 1
  }

  addCargoToHRocket() {
    this.cargoInHRocket += (this.cargoInHRocket >= 8) ? 0 : 1
  }

  removeCargoToHRocket() {
    this.cargoInHRocket -= (this.cargoInHRocket <= 0) ? 0 : 1
  }

  addHatchToShip() {
    this.hatchInShip += (this.hatchInShip >= 8) ? 0 : 1
  }

  removeHatchToShip() {
    this.hatchInShip -= (this.hatchInShip <= 0) ? 0 : 1
  }

  addHatchToHRocket() {
    this.hatchInHRocket += (this.hatchInHRocket >= 8) ? 0 : 1
  }

  removeHatchToHRocket() {
    this.hatchInHRocket -= (this.hatchInHRocket <= 0) ? 0 : 1
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
      hatchesInShip: this.hatchInShip,      
      cargoInRocket: this.cargoInHRocket,
      hatchesInRocket: this.hatchInHRocket,
    }

    console.log(this.formData)

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
    const template = document.getElementById('divID').innerHTML
    console.log(template)

    this.inputAlert('Save Template', template)
  }

  createElement(html) {
    const elem = document.createElement('ion-item-sliding')

    elem.innerHTML = 
      `
      <ion-grid>
        <ion-row>
          <ion-col size="1" style="margin-top: .75vh">
            <ion-reorder></ion-reorder>
          </ion-col>
          <ion-col size="9">
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
      cssClass: `alertCSS`,
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
                      <ion-${componentName} color="secondary" [(ngModel)]="formData.${name}" name="${name}">${html}</ion-${componentName}>
                    </ion-item>`
            
            this.createElement(html)
          }
        }
      ]
    })
    await alert.present()
  }

  async questionSelectorAlert() {
    const alert = await this.alertController.create({
      header: 'Number of options',
      cssClass: `alertCSS`,
      inputs: [
        {
          name: 'optionNumber',
          type: 'number',
          min: 2,
          max: 6
        }
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
            const number = data['optionNumber']
            this.selectorAlert(number)
          }
        }
      ]
    })
    await alert.present()
  }

  async selectorAlert(numberOfInputs: number) {    
    const generatedNumberOfInputs: AlertInput[] = [
      {
        name: 'labelName',
        type: 'text',
        placeholder: 'Component Name'
      },
    ]

    for (let i = 0; i < numberOfInputs; i++) {
      const input: AlertInput = {
        name: `${i + 1}`,
        type:'text',
        placeholder: `Option ${i + 1}`
      }
      generatedNumberOfInputs.push(input)
    }

    const alert = await this.alertController.create({
      header: 'Create Selector',
      cssClass: `alertCSS`,
      inputs: generatedNumberOfInputs,
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
            let selectOptionsHTMLString: string
            const name = data['labelName']

            Object.entries(data).forEach(([key, value]) => {
              // skip the first one, which is just the name of the component
              if (key == 'labelName') { return }
              // if its not the first one, add them to the select
              selectOptionsHTMLString += `<ion-select-option>${value}</ion-select-option>`
            })

            const html = `<ion-grid><ion-row><ion-col size="5" text-start>${name}</ion-col><ion-col size="5" text-center><ion-select interface="action-sheet" [(ngModel)]="formData.${name}" name="${name}">${selectOptionsHTMLString}</ion-select></ion-col></ion-row></ion-grid>`
            this.createElement(html)
          }
        }
      ]
    })
    await alert.present()
  }

  async inputAlert(title: string, template) {
    const alert = await this.alertController.create({
      header: title,
      cssClass: `alertCSS`,
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
