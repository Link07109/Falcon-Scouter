import { Component } from '@angular/core';
import { Platform, PopoverController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './services/theme.service';
import { PopoverPage } from './pages/popover/popover.page';
import { themes, primaryMenuPages, secondaryMenuPages } from './consts';
import { timer } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import { totalmem } from 'os';

export let showSplash: boolean

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
    private statusBar: StatusBar,
    private network: Network,
    public toast: ToastController
  ) {
    this.initializeApp()
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

  syncData() {
    // TODO
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
      console.log("kill me please")

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
