import { Component } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './services/theme.service';
import { PopoverPage, selectedTheme } from './pages/popover/popover.page';
import { timer } from 'rxjs';
import { themes, menuPages } from './consts';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  timerr = timer(0, 750)
  currentTheme = ''

  pages = menuPages

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private theme: ThemeService,
    private popoverController: PopoverController,
    private statusBar: StatusBar
  ) {
    this.initializeApp()
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

    this.timerr.subscribe(() => {
      if (this.currentTheme == selectedTheme) {
        return
      }
      this.changeThemeHMMM(selectedTheme)
    });
  }

  changeThemeHMMM(name) {
    const theme = themes[name]
    this.theme.setTheme(theme)
    this.currentTheme = name
    this.statusBar.backgroundColorByHexString(theme['primary']);
  }
}
