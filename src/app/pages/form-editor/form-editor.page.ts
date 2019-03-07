import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import * as $ from 'jquery';
import { AlertInput } from '@ionic/core';
import { delay } from 'q';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.page.html',
  styleUrls: ['./form-editor.page.scss'],
})
export class FormEditorPage implements OnInit {

  private templates
  private templateName
  templatesArray = []
  componentsArray = []
  templateHTML
  hasChosenTemplate = false
  useTemplate = false
  mainEditMode = false
  
  //counter values
  cargoInShip = 0
  cargoInLRocket = 0
  cargoInMRocket = 0
  cargoInHRocket = 0
  hatchInShip = 0
  hatchInLRocket = 0
  hatchInMRocket = 0
  hatchInHRocket = 0

  formData = { data: {} }

  //sliding bullshit
  loadSlideItems = document.getElementsByClassName('loadSlide')
  editSlideItems = document.getElementsByClassName('editSlide')
  editScaleItems = document.getElementsByClassName('editScale')
  toggleSlide = false

  constructor(
    public sanitizer: DomSanitizer,
    private firestoreService: FirestoreService,
    private blueAllianceService: BlueAllianceService,
    public alertController: AlertController,
  ) { }

  addCargoToShip() {this.cargoInShip += (this.cargoInShip >= 8) ? 0 : 1}

  removeCargoToShip() {this.cargoInShip -= (this.cargoInShip <= 0) ? 0 : 1}

  addCargoToHRocket() {this.cargoInHRocket += (this.cargoInHRocket >= 12) ? 0 : 1}

  removeCargoToHRocket() {this.cargoInHRocket -= (this.cargoInHRocket <= 0) ? 0 : 1}

  addHatchToShip() {this.hatchInShip += (this.hatchInShip >= 8) ? 0 : 1}

  removeHatchToShip() {this.hatchInShip -= (this.hatchInShip <= 0) ? 0 : 1}

  addHatchToHRocket() {this.hatchInHRocket += (this.hatchInHRocket >= 8) ? 0 : 1}

  removeHatchToHRocket() {this.hatchInHRocket -= (this.hatchInHRocket <= 0) ? 0 : 1}

  // Lukes sliding bullshit that doesn't work
  // nevermind it works now

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async toggleEditMode() {

    //OPEN
    if(this.toggleSlide == false) 
    { 
      for(let i = 0; i < this.editSlideItems.length; i++)
      {
        let slideItem = this.editSlideItems[i]
        let scaleItem = this.editScaleItems[i]
        slideItem.classList.remove('left')
        slideItem.classList.add('right')
        scaleItem.classList.remove('stretch')
        scaleItem.classList.add('compress')
        await this.delay(100)
      }
    } 

    //CLOSE
    else 
    {
      for(let i = this.editSlideItems.length-1; i > -1; i--)
      {
        let slideItem = this.editSlideItems[i]
        let scaleItem = this.editScaleItems[i]
        slideItem.classList.remove('right')
        slideItem.classList.add('left')
        scaleItem.classList.remove('compress')
        scaleItem.classList.add('stretch')
        await this.delay(100)
      }
    }
    if(this.toggleSlide == false){this.toggleSlide = true} else {this.toggleSlide = false}
  }  

  //More Sliding Bullshit
  async slideOnLoad() {
    await delay(4000)
    for(let i = 0; i < this.loadSlideItems.length; i++)
    {
      let slideItem = this.loadSlideItems[i]
      slideItem.classList.add('load')
      await delay(100)
    }
  }
  async slideOnClose() {
    for(let i = 0; i < this.loadSlideItems.length; i++)
    {
      let slideItem = this.loadSlideItems[i]
      slideItem.classList.remove('load')
      let currentStyle = slideItem.getAttribute("style")
      slideItem.setAttribute("style", currentStyle + "; left: -110%")
    }
  }

  ionViewWillLeave() {this.slideOnClose()}

  ionViewDidEnter() {this.slideOnLoad()}

  ngOnInit() {
    this.templates = this.firestoreService.getAllScoutingTemplates().valueChanges()
    this.setupArray()
  }

  setupArray() {
    this.templates.subscribe(data => {
    data.forEach(element => {
    this.templatesArray.push(element)
  })})}

  toggleChosenTemplateBool() {this.hasChosenTemplate = true}

  backButton() {
    this.hasChosenTemplate = false
    this.useTemplate = false
    this.slideOnLoad()
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
    console.log(element.name)
    this.templateHTML = this.sanitizer.bypassSecurityTrustHtml(element.templateHTML)
    this.hasChosenTemplate = true
  }

  loadHTMLToUse(element) {
    console.log(element.name)
    this.templateHTML = this.sanitizer.bypassSecurityTrustHtml(element.templateHTML)
    this.useTemplate = true
  }

  saveTemplate() {
    console.log(this.componentsArray)

    this.inputAlert('Save Template', this.componentsArray)
  }

  // -------------------------------------------------- //
  // Creates an Input component in the template creator //
  // v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v- //
  async createInput() {const alert = await this.alertController.create({
    header: `Create new input box`, cssClass: `alertCSS`, 
    inputs: [{name: 'inputName', type: 'text', placeholder: 'Name'},
      {name: 'inputPlaceholder', type: 'text', placeholder: 'Placeholder'}], 
    buttons: [{text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: () => {}},
      {text: 'Ok', handler: data => {
        const name = data['inputName']
        const placeholder = data['inputPlaceholder']
      
        const html = 
        `
        <ion-grid>
          <ion-row>
            <ion-col col-2><ion-label style="margin-top: 0px; margin-bottom: 0px; font-size: 1.25em">${name}</ion-label></ion-col>
            <ion-col col-2><ion-input [(ngModel)]="formData.${name}" placeholder="${placeholder}" name="${name}"></ion-input></ion-col>
          </ion-row>
        </ion-grid>
        `
            
        this.componentsArray.push(this.sanitizer.bypassSecurityTrustHtml(html))
        console.log(html)
      }}]}) 
    await alert.present()
  }

  // --------------------------------------------------- //
  // Creates a Counter component in the template creator //
  // v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v //
  async createCounter() {const alert = await this.alertController.create({
    header: `Create new counter box`, cssClass: `alertCSS`, 
    inputs: [{name: 'counterName', type: 'text', placeholder: 'Name'},], 
    buttons: [{text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: () => {}},
      {text: 'Ok', handler: data => {
        const name = data['counterName']
      
        const html = //ivan fix pls thx
        ` 
        <ion-grid>
          <ion-row>
            <ion-col size="6"><ion-label style="margin-top: 8px; margin-bottom: 0px; margin-right: 0px; font-size: 1.3em">${name}</ion-label></ion-col>
            <ion-col size="2" text-center><ion-button                 ><ion-icon name="remove"></ion-icon></ion-button></ion-col>
            <ion-col size="2" text-center><ion-input readonly placeholder='0' style="margin-left: 6px; font-size: 1.3em; font-weight: 850;"                ></ion-input></ion-col>
            <ion-col size="2" text-center><ion-button                 ><ion-icon name="add"></ion-icon></ion-button></ion-col>
          </ion-row>
        </ion-grid>
        `
            
        this.componentsArray.push(this.sanitizer.bypassSecurityTrustHtml(html))
        console.log(html)
      }}]}) 
    await alert.present()
  }

  // -------------------------------------------------- //
  // Creates a Toggle component in the template creator //
  // v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v- //
  async createToggle() {const alert = await this.alertController.create({
    header: `Create new toggle box`, cssClass: `alertCSS`, 
    inputs: [{name: 'toggleName', type: 'text', placeholder: 'Name'},
      {name: 'toggleValue', type: 'text', placeholder: 'Value (on or off)'}], 
    buttons: [{text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: () => {}},
      {text: 'Ok', handler: data => {
        const name = data['toggleName']
        const value = data['toggleValue']
      
        const html =
        ` 
        <ion-grid>
          <ion-row>
            <ion-col col-2> <ion-label style="margin-top: 8px; margin-bottom: 0px; font-size: 1.25em">${name}</ion-label></ion-col>
            <ion-col col-2> <ion-toggle color="secondary" [(ngModel)]="formData.${name}" name="${name}">
              <input type="hidden" class="aux-input" name="${name}" value="${value}">
            </ion-toggle></ion-col>
          </ion-row>
        </ion-grid>
        `
            
        this.componentsArray.push(this.sanitizer.bypassSecurityTrustHtml(html))
        console.log(html)
      }}]}) 
    await alert.present()
  }

  // ---------------------------------------------------- //
  // Creates a Selector component in the template creator //
  // v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v- //
  async createSelectorElem() {const alert = await this.alertController.create({
    header: 'Number of options', cssClass: `alertCSS`,
    inputs: [{name: 'optionNumber', type: 'number', min: 2, max: 6}],
    buttons: [{text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: () => {}},
      {text: 'Ok', handler: data => {
          const number = data['optionNumber']
    this.selectorAlert(number)
    }}]})
    await alert.present()
  }

  async selectorAlert(numberOfInputs: number) {    
    const generatedNumberOfInputs: AlertInput[] = [{name: 'labelName', type: 'text', placeholder: 'Selector Name'},
      {name:'selPlaceholder', type: 'text', placeholder: 'Placeholder'}]

    for (let i = 0; i < numberOfInputs; i++) {
      const input: AlertInput = {
        name: `${i + 1}`,
        type:'text',
        placeholder: `Option ${i + 1}`
      }
      generatedNumberOfInputs.push(input)
    }

    const alert = await this.alertController.create({
      header: 'Create Selector', cssClass: `alertCSS`, inputs: generatedNumberOfInputs,
      buttons: [{text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: () => {}},
        {text: 'Ok', handler: data => {
          let selectOptionsHTMLString: string = "" 
          const name = data['labelName']
          const placeholder = data['selPlaceholder']
          Object.entries(data).forEach(([key, value]) => {
            // skip the first one, which is just the name of the component
            if (key == 'labelName' || key == 'selPlaceholder') { return }
            // if its not the first one, add them to the select
            selectOptionsHTMLString += `<ion-select-option>${value}</ion-select-option>`
          })

            const html = `
              <ion-grid><ion-row>
                <ion-col col-2><ion-label vertical="middle" style="margin-top: 8px; margin-bottom: 0px; font-size: 1.25em">${name}</ion-label></ion-col>
                <ion-col col-2><ion-select placeholder="${placeholder}" [(ngModel)]="formData.${name}" name="${name}">${selectOptionsHTMLString}</ion-select></ion-col>
              </ion-row></ion-grid>
              `

            this.componentsArray.push(this.sanitizer.bypassSecurityTrustHtml(html))
            console.log(html)
          }
        }
      ]
    })
    await alert.present()
  }
  // ^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^- //
  // ---------------------------------------------------- //

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
