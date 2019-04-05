import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import { AlertInput } from '@ionic/core';
import { currentEvent } from '../settings/settings.page';
import { delay } from 'q';

@Component({
  selector: 'app-form-editor',
  templateUrl: './scouting.page.html',
  styleUrls: ['./scouting.page.scss'],
})
export class ScoutingPage implements OnInit {

  templatesArray = []
  items = []
  formsInQueue = []

  templates
  templateHTML
  templateName

  hasChosenTemplate = false
  useTemplate = false
  // mainEditMode = false
  toggleSlide = false

  cargoInShip = 0
  hatchesInShip = 0

  cargoInR1 = 0
  hatchesInR1 = 0

  cargoInR2 = 0
  hatchesInR2 = 0

  cargoInR3 = 0
  hatchesInR3 = 0

  // for testing
  // spreadsheetID = '1KbRLPUCyk51VJRRFVsv3k7XX__P1w4qW_ec2afk80W8'

  // 2019 State Championship Event
  spreadsheetID ='1BMlEPqBLSg6ofJy-q55S8mil2V6zktdp0EkOfEp34jM'

  formData = {
    scoutName: '',
    matchNumber: 0,
    teamNumber: 0,
    driverStation: 'Center',
    startingPoint: 'Center',
    HABLevel: '1',
    result: 'None',
    interference: 'Neither',
    playsDefense: false,
    cargoInShip: 0,
    hatchesInShip: 0,
    cargoInR1: 0,
    hatchesInR1: 0,
    cargoInR2: 0,
    hatchesInR2: 0,
    cargoInR3: 0,
    hatchesInR3: 0,
    climb: 'Level 1',
    stability: 'Good',
    driver: 'Good',
    penalties: 'None',
    comments: '',
    id: this.spreadsheetID,
  }

  loadSlideItems = document.getElementsByClassName('loadSlide')
  editSlideItems = document.getElementsByClassName('editSlide')
  editScaleItems = document.getElementsByClassName('editScale')

  constructor(
    public sanitizer: DomSanitizer,
    private firestoreService: FirestoreService,
    private blueAllianceService: BlueAllianceService,
    public alertController: AlertController,
    public toast: ToastController
  ) { }

  addCargoToShip() { this.cargoInShip += (this.cargoInShip >= 8) ? 0 : 1 }
  removeCargoToShip() { this.cargoInShip -= (this.cargoInShip <= 0) ? 0 : 1 }

  addHatchToShip() { this.hatchesInShip += (this.hatchesInShip >= 8) ? 0 : 1 }
  removeHatchToShip() { this.hatchesInShip -= (this.hatchesInShip <= 0) ? 0 : 1 }


  addCargoToR1() { this.cargoInR1 += (this.cargoInR1 >= 12) ? 0 : 1 }
  removeCargoToR1() { this.cargoInR1 -= (this.cargoInR1 <= 0) ? 0 : 1 }

  addHatchToR1() { this.hatchesInR1 += (this.hatchesInR1 >= 12) ? 0 : 1 }
  removeHatchToR1() { this.hatchesInR1 -= (this.hatchesInR1 <= 0) ? 0 : 1 }


  addCargoToR2() { this.cargoInR2 += (this.cargoInR2 >= 12) ? 0 : 1 }
  removeCargoToR2() { this.cargoInR2 -= (this.cargoInR2 <= 0) ? 0 : 1 }

  addHatchToR2() { this.hatchesInR2 += (this.hatchesInR2 >= 12) ? 0 : 1 }
  removeHatchToR2() { this.hatchesInR2 -= (this.hatchesInR2 <= 0) ? 0 : 1 }


  addCargoToR3() { this.cargoInR3 += (this.cargoInR3 >= 12) ? 0 : 1 }
  removeCargoToR3() { this.cargoInR3 -= (this.cargoInR3 <= 0) ? 0 : 1 }

  addHatchToR3() { this.hatchesInR3 += (this.hatchesInR3 >= 12) ? 0 : 1 }
  removeHatchToR3() { this.hatchesInR3 -= (this.hatchesInR3 <= 0) ? 0 : 1 }

  async delay(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)) }

  // async toggleEditMode() {
  //   if (!this.toggleSlide) { // OPEN
  //     for (let i = 0; i < this.editSlideItems.length; i++) {
  //       const slideItem = this.editSlideItems[i]
  //       const scaleItem = this.editScaleItems[i]
  //       slideItem.classList.remove('left')
  //       slideItem.classList.add('right')
  //       scaleItem.classList.remove('stretch')
  //       scaleItem.classList.add('compress')
  //       await this.delay(100)
  //     }
  //   } else { // CLOSE
  //     for (let i = this.editSlideItems.length - 1; i > -1; i--) {
  //       const slideItem = this.editSlideItems[i]
  //       const scaleItem = this.editScaleItems[i]
  //       slideItem.classList.remove('right')
  //       slideItem.classList.add('left')
  //       scaleItem.classList.remove('compress')
  //       scaleItem.classList.add('stretch')
  //       await this.delay(100)
  //     }
  //   }
  //   this.toggleSlide = !this.toggleSlide
  // }

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
    this.templates = this.firestoreService.getAllScoutingTemplates()

    this.templates.subscribe(data => {
      data.forEach(element => {
        this.templatesArray.push(element)
      })
    })
  }

  submitData() {
    this.formData.cargoInShip = this.cargoInShip
    this.formData.hatchesInShip = this.hatchesInShip
    this.formData.cargoInR1 = this.cargoInR1
    this.formData.hatchesInR1 = this.hatchesInR1
    this.formData.cargoInR2 = this.cargoInR2
    this.formData.hatchesInR2 = this.hatchesInR2
    this.formData.cargoInR3 = this.cargoInR3
    this.formData.hatchesInR3 = this.hatchesInR3

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

  // deleteTemplate(template) {
  //   this.firestoreService.deleteScoutingTemplate(template.name).then(() => {
  //     this.setupArray()
  //
  //     this.presentAlert('Success!', `Deleted Template "${template.name}".`)
  //   })
  // }

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
      mode: 'ios',
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
      mode: 'ios',
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
        type: 'text',
        placeholder: `Option ${i + 1}`
      }
      generatedNumberOfInputs.push(input)
    }

    const alert = await this.alertController.create({
      mode: 'ios',
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
      mode: 'ios',
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
      mode: 'ios',
      header: title,
      message: message,
      cssClass: `alertCSS`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            document.forms[0].reset()
            this.cargoInShip = 0
            this.hatchesInShip = 0
            this.cargoInR1 = 0
            this.hatchesInR1 = 0
            this.cargoInR2 = 0
            this.hatchesInR2 = 0
            this.cargoInR3 = 0
            this.hatchesInR3 = 0

            this.formData = {
              scoutName: '',
              matchNumber: 0,
              teamNumber: 0,
              driverStation: 'Center',
              startingPoint: 'Center',
              HABLevel: '1',
              result: 'None',
              interference: 'Neither',
              playsDefense: false,
              cargoInShip: 0,
              hatchesInShip: 0,
              cargoInR1: 0,
              hatchesInR1: 0,
              cargoInR2: 0,
              hatchesInR2: 0,
              cargoInR3: 0,
              hatchesInR3: 0,
              climb: 'Level 1',
              stability: 'Good',
              driver: 'Good',
              penalties: 'None',
              comments: '',
              id: this.spreadsheetID,
            }
            this.backButton()
          }
        }
      ]
    })
    await alert.present()
  }

}
