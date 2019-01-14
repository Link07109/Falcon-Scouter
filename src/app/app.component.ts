import { Component } from '@angular/core';

import { Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ThemeService } from './services/theme.service';

import { PopoverPage, selectedTheme } from './pages/popover/popover.page';

import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  timerr = timer(0, 750)
  currentTheme = ''

  pages = [
    { title: 'Intro', link: '/intro' },
    { title: 'Dashboard', link: '/dash' },
    { title: 'Teams', link: '/teams' },
    { title: 'Create', link: '/create' },
    { title: 'Form Editor', link: '/form_editor' },
    { title: 'Help', link: '/help' },
    { title: 'Picks', link: '/picks' },
  ];

  themesHMM = {
    rain: {
      primary: '#95b8d1',
      secondary: '#333333',
      tertiary: '#bfc8ad',
      dark: '#dbcfb0',
      medium: '#BCE784',
      light: '#666a86',
    },
    dusk: {
      primary: '#5d5e60',
      secondary: '#513B56',
      tertiary: '#348AA7',
      dark: '#ffffff',
      medium: '#5DD39E',
      light: '#2b2727'
    },
    nether: {
      primary: '#8f6593',
      secondary: '#cdcdcd',
      tertiary: '#e3e4db',
      dark: '#aea4bf',
      medium: '#BCE784',
      light: '#3b252c'
    }
  }

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
    this.theme.setTheme(this.themesHMM[name])
    this.currentTheme = name
    this.statusBar.backgroundColorByHexString(this.themesHMM[name]['primary']);
  }
}
