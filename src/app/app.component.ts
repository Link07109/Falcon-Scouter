import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './services/theme.service';
import { THEMES, PRIMARY_MENU_PAGES, SECONDARY_MENU_PAGES } from './consts';
import { timer } from 'rxjs';
import {FirestoreService} from './services/data/firestore.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  currentThemeStyle = ''
  pages = PRIMARY_MENU_PAGES
  pages2 = SECONDARY_MENU_PAGES
  showSplash = true
  themeIcon

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private theme: ThemeService,
    private statusBar: StatusBar,
  ) {
    this.initializeApp()
  }

  syncData() {
    // TODO
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

      timer(1500).subscribe(() => this.showSplash = false)
    })

    this.changeThemeHMMM('light')
    this.theme.getTheme().then((cssText: string) => {
      this.currentThemeStyle = (cssText.includes('#6e4552')) ? 'light' : 'dark'
      this.changeThemeHMMM(this.currentThemeStyle)
      this.themeIcon = (this.currentThemeStyle == 'dark') ? 'sunny' : 'moon'
    })

    this.statusBar.overlaysWebView(false)
    // this.router.navigateByUrl('/dash')
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
