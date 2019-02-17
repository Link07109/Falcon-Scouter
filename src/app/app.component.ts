import { Component } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './services/theme.service';
import { PopoverPage } from './pages/popover/popover.page';
import { themes, primaryMenuPages, secondaryMenuPages } from './consts';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  currentThemeStyle = ''
  pages = primaryMenuPages
  pages2 = secondaryMenuPages
  shouldShowSearchbar = false
  showSplash = true

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private theme: ThemeService,
    private popoverController: PopoverController,
    private statusBar: StatusBar
  ) {
    this.initializeApp()
  }

  toggleThemeStlye() {
    this.currentThemeStyle = (this.currentThemeStyle == 'dark') ? 'light' : 'dark'
    this.changeThemeHMMM(this.currentThemeStyle)
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      translucent: true
    })
    popover.present()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()

      timer(3000).subscribe(() => this.showSplash = false)
    })

    this.theme.getTheme().then((cssText: string) => {
      this.currentThemeStyle = (cssText.includes('#6e4552')) ? 'light' : 'dark'
      this.changeThemeHMMM(this.currentThemeStyle)
    })

    this.statusBar.overlaysWebView(false)
  }

  changeThemeHMMM(name) {
    const theme = themes[name]
    this.theme.setTheme(theme)
    this.statusBar.backgroundColorByHexString(theme['light'])
    if (name == 'dark') {
      this.statusBar.styleBlackOpaque()
    } else {
      this.statusBar.styleDefault()
    }
  }
}
