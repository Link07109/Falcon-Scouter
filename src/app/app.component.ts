import { Component } from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './services/theme.service';
import { THEMES, PRIMARY_MENU_PAGES, SECONDARY_MENU_PAGES } from './consts';
import { BlueAllianceService } from './services/data/blue-alliance.service';

export let curYear = 2019

export let currentDistrict = '2019fnc'
export let districtName = 'FIRST North Carolina'

export let currentEvent = '2019nccmp'
export let eventName = 'FIRST North Carolina State Championship'

export let eventTeamsArray = []
export function setArray(someArray: Array<any>) {
  eventTeamsArray = someArray
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  currentThemeStyle = ''
  pages = PRIMARY_MENU_PAGES
  pages2 = SECONDARY_MENU_PAGES
  // showSplash = true
  showSplash = false
  themeIcon

  settingsToggle = false
  settingsItem = document.getElementsByClassName('settings')

  newEvent: string

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private theme: ThemeService,
    private statusBar: StatusBar,
    private router: NavController,
    private blueAllianceService: BlueAllianceService
  ) {
    this.changeThemeHMMM('light')
    this.initializeApp()
  }

  syncData() {
    // TODO
  }

  changeEvent(ev) {
    const val = ev.target.value
    
    if (val && val.trim() !== '') {
      this.newEvent = val
    } else {
      this.newEvent = currentEvent
    }
  }

  saveChanges() {
    // alert saying changes have been saved and then auto put them to the previous page
    // or
    // toast saying changes have been saved

    this.toggleSettings()

    currentEvent = this.newEvent
    curYear = +currentEvent.substring(0, 4)

    this.blueAllianceService.getEventInformation(currentEvent).subscribe(element => {
      eventName = element.short_name
      currentDistrict = element.district.key
      districtName = element.district.display_name

      console.log(element)
      console.log(element.name)
      console.log(element.district.display_name)
    })

    eventTeamsArray = []

    this.blueAllianceService.getEventTeams(currentEvent).subscribe(element => {
      element.forEach(el => {
        eventTeamsArray.push({ team: el, icon: this.blueAllianceService.getTeamIcon(el.team_number, 'image', curYear) })
      })
      eventTeamsArray = eventTeamsArray.sort((a, b) => a.team.team_number - b.team.team_number)
    })
  }

  toggleSettings() {
    if (!this.settingsToggle) { // OPEN
      const slideItem = this.settingsItem[0]
      slideItem.classList.remove('close')
      slideItem.classList.add('open')
    } else { // CLOSE
      const slideItem = this.settingsItem[0]
      slideItem.classList.remove('open')
      slideItem.classList.add('close')
    }
    this.settingsToggle = !this.settingsToggle
  }


  toggleThemeStyle() {
    this.currentThemeStyle = (this.currentThemeStyle == 'dark') ? 'light' : 'dark'
    this.themeIcon = (this.currentThemeStyle == 'dark') ? 'sunny' : 'moon'
    this.changeThemeHMMM(this.currentThemeStyle)
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()

    })

    this.theme.getTheme().then((cssText: string) => {
      this.currentThemeStyle = (cssText.includes('#6e4552')) ? 'light' : 'dark'
      this.changeThemeHMMM(this.currentThemeStyle)
      this.themeIcon = (this.currentThemeStyle == 'dark') ? 'sunny' : 'moon'
    })

    this.statusBar.overlaysWebView(false)
    this.router.navigateForward('/scouting')
  }

  changeThemeHMMM(name) {
    const theme = THEMES[name]
    this.theme.setTheme(theme)
    this.statusBar.backgroundColorByHexString(theme['light'])
    if (name == 'dark') {
      this.statusBar.styleBlackOpaque()
    } else {
      this.statusBar.styleDefault()
    }
  }
}
