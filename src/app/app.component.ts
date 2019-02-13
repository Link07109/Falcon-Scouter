import { Component } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './services/theme.service';
import { PopoverPage } from './pages/popover/popover.page';
import { themes, primaryMenuPages, secondaryMenuPages } from './consts';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  currentThemeStyle = 'light'
  pages = primaryMenuPages
  pages2 = secondaryMenuPages

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
    if (this.currentThemeStyle == 'dark') {
      this.currentThemeStyle = 'light'
      this.changeThemeHMMM('light')
    } else {
      this.currentThemeStyle = 'dark'
      this.changeThemeHMMM('dark')
    }
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
    });

    this.statusBar.overlaysWebView(false)
  }

  changeThemeHMMM(name) {
    const theme = themes[name]
    this.theme.setTheme(theme)
    this.statusBar.backgroundColorByHexString(theme['light'])
  }
}
