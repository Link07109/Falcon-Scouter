import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.page.html',
  styleUrls: ['./form-editor.page.scss'],
})
export class FormEditorPage implements OnInit {

  private templates
  private templateName
  public templatesArray = []
  templateComponents = []
  public templateHTML
  public hasChosenTemplate = false

  constructor(
    public kms: DomSanitizer,
    private firestoreService: FirestoreService,
    public alertController: AlertController,
  ) {  }

  ngOnInit() {
    this.templates = this.firestoreService.getAllScoutingTemplates().valueChanges()
    this.setupArray()
    const reorderGroup = document.getElementById('reorder')
    // reorderGroup.disabled = false
  }

  setupArray() {
    this.templates.subscribe(data => {
      data.forEach(element => {
        this.templatesArray.push(element)
      })
    })
  }

  loadHTML(element) {
    this.templateHTML = this.kms.bypassSecurityTrustHtml(element.templateHTML)
    this.hasChosenTemplate = true
  }

  deelete(element: HTMLIonItemSlidingElement) {
    // element.parentNode.removeChild(element)
    document.getElementById('divID').removeChild(element)
    console.log(document.getElementById('divID').children)
  }

  createElement(html, id) {
    const elem = document.createElement('ion-item-sliding') //  (ionSwipe)="delete({{elem}})"
    elem.setAttribute('id', id)
    elem.innerHTML = html + `<ion-item-options side="start"><ion-button (click)='deelete(elem)'>Delete</ion-button></ion-item-options>`
    // let kms = document.createElement('button')
    // kms.onclick = {() => this.deelete(elem)}
    
    if (elem.childNodes.length > 0) {
      document.getElementById('divID').appendChild(elem)
      return elem.childNodes[0]
    }
  }

  die() {
    this.hasChosenTemplate = true
  }

  save() {
    const template = document.getElementById('divID').outerHTML
    // const template = this.templateHTML
    this.inputAlert('Save Template', template)
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
              console.log(key, value)

              stringg += `<ion-select-option>${value}</ion-select-option>`
            })

            const html = name + `<ion-select id="${name}">${stringg}</ion-select>`
            this.createElement(html, name)
            this.templateComponents.push(data)
          }
        }
      ]
    });
    await alert.present();
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
            let prefix = ''
            const name = data['labelName']

            if (componentName == 'button') {
              html = name
            } else {
              prefix = name
            }
            html = `<ion-item><ion-label color="dark">${prefix}</ion-label><ion-${componentName} color="secondary" id="${data['labelName']}"}>${html}</ion-${componentName}></ion-item>`
            this.createElement(html, name)
            this.templateComponents.push(data)
          }
        }
      ]
    });
    await alert.present();
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
            this.templateName = data['Template Name'];
            this.presentAlert('Template Saved');
            this.firestoreService.saveScoutingTemplate(this.templateName, template, this.templateComponents);
          }
        }
      ]
    });
    await alert.present();
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
