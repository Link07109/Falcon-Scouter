import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import { AlertInput } from '@ionic/core';
import { currentEvent } from '../settings/settings.page';
import { Network } from '@ionic-native/network/ngx';
import { delay } from 'q';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.page.html',
  styleUrls: ['./form-editor.page.scss'],
})
export class FormEditorPage implements OnInit {

  templatesArray = []
  matchDataArray = []
  items = []
  formsInQueue = []

  templates
  templateHTML
  templateName

  hasChosenTemplate = false
  useTemplate = false
  mainEditMode = false
  toggleSlide = false

  cargoInShip = 0
  cargoInLRocket = 0
  cargoInMRocket = 0
  cargoInHRocket = 0
  hatchInShip = 0
  hatchInLRocket = 0
  hatchInMRocket = 0
  hatchInHRocket = 0
  // for testing
  // spreadsheetID = '1KbRLPUCyk51VJRRFVsv3k7XX__P1w4qW_ec2afk80W8'

  // actual one
  spreadsheetID = '1_7OBGwGLoxHWSPlTTdQtneQRnVCnl9cNL5A4YTv9_uA'

  formData = { 
    id: this.spreadsheetID,
    data: {},
    matchNumber: 0,
    teamNumber: 0,
    startingPoint: 'Center',
    HABLevel: '1',
    result: 'None',
    interference: 'Neither',
    playsDefense: false,
    climb: 'Level 1',
    stability: 'Good',
    driver: 'Good',
    penalties: 'None',
    comments: ''
  }

  loadSlideItems = document.getElementsByClassName('loadSlide')
  editSlideItems = document.getElementsByClassName('editSlide')
  editScaleItems = document.getElementsByClassName('editScale')

  constructor(
    public sanitizer: DomSanitizer,
    private firestoreService: FirestoreService,
    private blueAllianceService: BlueAllianceService,
    public alertController: AlertController,
    private network: Network,
    public toast: ToastController
  ) { 
    this.network.onConnect().subscribe(() => {
      this.showToast()
    })

    this.network.onDisconnect().subscribe(() => {
      this.showToast('Network Disconnected')
    })
  }

  async showToast(message: string = 'Network Connected', duration: number = 3000) {
    const toat = await this.toast.create({
      message: message,
      duration: duration
    })
    await toat.present()
  }

  addCargoToShip() { this.cargoInShip += (this.cargoInShip >= 8) ? 0 : 1 }
  removeCargoToShip() { this.cargoInShip -= (this.cargoInShip <= 0) ? 0 : 1 }

  addCargoToHRocket() { this.cargoInHRocket += (this.cargoInHRocket >= 12) ? 0 : 1 }
  removeCargoToHRocket() { this.cargoInHRocket -= (this.cargoInHRocket <= 0) ? 0 : 1 }


  addHatchToShip() { this.hatchInShip += (this.hatchInShip >= 8) ? 0 : 1 }
  removeHatchToShip() { this.hatchInShip -= (this.hatchInShip <= 0) ? 0 : 1 }

  addHatchToHRocket() { this.hatchInHRocket += (this.hatchInHRocket >= 12) ? 0 : 1 }
  removeHatchToHRocket() { this.hatchInHRocket -= (this.hatchInHRocket <= 0) ? 0 : 1 }

  async delay(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)) }

  async toggleEditMode() {
    if (!this.toggleSlide) { // OPEN
      for (let i = 0; i < this.editSlideItems.length; i++) {
        const slideItem = this.editSlideItems[i]
        const scaleItem = this.editScaleItems[i]
        slideItem.classList.remove('left')
        slideItem.classList.add('right')
        scaleItem.classList.remove('stretch')
        scaleItem.classList.add('compress')
        await this.delay(100)
      }
    } else { // CLOSE
      for (let i = this.editSlideItems.length - 1; i > -1; i--) {
        const slideItem = this.editSlideItems[i]
        const scaleItem = this.editScaleItems[i]
        slideItem.classList.remove('right')
        slideItem.classList.add('left')
        scaleItem.classList.remove('compress')
        scaleItem.classList.add('stretch')
        await this.delay(100)
      }
    }
    this.toggleSlide = !this.toggleSlide
  }

  async slideOnLoad() {
    await delay(1000)
    for (let i = 0; i < this.loadSlideItems.length; i++) {
      const slideItem = this.loadSlideItems[i]
      slideItem.classList.add('load')
      await delay(100)
    }
  }

  async slideOnClose() {
    for (let i = 0; i < this.loadSlideItems.length; i++) {
      const slideItem = this.loadSlideItems[i]
      slideItem.classList.remove('load')
      const currentStyle = slideItem.getAttribute('style')
      slideItem.setAttribute('style', `${currentStyle}; left: -110%`)
    }
  }

  ionViewWillLeave() { this.slideOnClose() }

  ionViewDidEnter() { this.slideOnLoad() }

  backButton() {
    this.hasChosenTemplate = false
    this.useTemplate = false
    this.slideOnLoad()
  }

  ngOnInit() {
    this.setupArray()
  }

  setupArray() {
    this.templates = []
    this.templatesArray = []
    this.templates = this.firestoreService.getAllScoutingTemplates().valueChanges()

    this.templates.subscribe(data => {
      data.forEach(element => {
        this.templatesArray.push(element)
      })
    })
  }

  submitData() {
    this.formData.data = {
      cargoInShip: this.cargoInShip,
      hatchesInShip: this.hatchInShip,
      cargoInRocket: this.cargoInHRocket,
      hatchesInRocket: this.hatchInHRocket,
    }
    const stringData = JSON.stringify(this.formData)
    console.log(stringData)

    this.firestoreService.createMatch(currentEvent, this.formData)
      .then(() => {
        this.blueAllianceService.postDataToSpreadsheet(stringData)
        this.presentAlert('Success!', 'Data Submitted.')
      }, error => {
        console.error(error)
        this.formsInQueue.push(this.formData)
        // add to a queue if offline and detect when its online -> and then push them all at once with a button somewhere else
      })
  }

  // true = loadHTMLToEdit
  // false = loadHTMLToUse
  loadHTML(element, which: boolean) {
    this.templateName = element.name
    this.templateHTML = this.sanitizer.bypassSecurityTrustHtml(element.templateHTML)

    this.hasChosenTemplate = which
    this.useTemplate = !which
  }

  saveTemplate() {
    const template = document.getElementById('divID').innerHTML
    console.log(template)

    this.inputAlert('Save Template', template)
  }

  deleteTemplate(template) {
    this.firestoreService.deleteScoutingTemplate(template.name).then(() => {
      this.setupArray()

      this.presentAlert('Success!', `Deleted Template "${template.name}".`)
    })
  }

  createElement(html) {
    const elem = document.createElement('div') // ion-grid

    elem.innerHTML = html
    //   `
    //   <ion-row>
    //     <ion-col size="1" style="margin-top: .75vh">
    //       <ion-reorder></ion-reorder>
    //     </ion-col>
    //     <ion-col size="9">
    //       ${html}
    //     </ion-col>
    //   </ion-row>
    // `

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
      enableBackdropDismiss: false,
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

            html =  `
                    <ion-item>
                      <ion-label color="dark">${name}</ion-label>
                      <ion-${componentName} color="secondary" [(ngModel)]="formData.${name}" name="${name}">${html}</ion-${componentName}>
                    </ion-item>
                    `
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
      enableBackdropDismiss: false,
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
        type: 'text',
        placeholder: `Option ${i + 1}`
      }
      generatedNumberOfInputs.push(input)
    }

    const alert = await this.alertController.create({
      header: 'Create Selector',
      cssClass: `alertCSS`,
      enableBackdropDismiss: false,
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
      enableBackdropDismiss: false,
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
            const templateName = data['Template Name']
            this.presentAlert('Success!', `Template "${templateName}" was saved.`)
            this.firestoreService.saveScoutingTemplate(templateName, template)
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
      cssClass: `alertCSS`,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            document.forms[0].reset()
            this.formData = {
              id: this.spreadsheetID,
              data: {},
              matchNumber: 0,
              teamNumber: 0,
              startingPoint: 'Center',
              HABLevel: '1',
              result: 'None',
              interference: 'Neither',
              playsDefense: false,
              climb: 'Level 1',
              stability: 'Good',
              driver: 'Good',
              penalties: 'None',
              comments: ''
            }
            this.backButton()
          }
        }
      ]
    })
    await alert.present()
  }

}
