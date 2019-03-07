import { Component, OnInit } from '@angular/core';
import { BlueAllianceService } from '../../services/data/blue-alliance.service';
import { currentEvent } from '../settings/settings.page';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.page.html',
  styleUrls: ['./dash.page.scss'],
})
export class DashPage implements OnInit {

  matchCollectionObservable
  socialMediaObservable
  accountName = ''
  match
  curComp = currentEvent

  loadSlideItems = document.getElementsByClassName('loadSlide')

  constructor(
    private blueAllianceService: BlueAllianceService,
  ) { }

  //slide on load
  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async slideOnLoad() {
    await this.delay(1000)
    for(let i = 0; i < this.loadSlideItems.length; i++)
    {
      let slideItem = this.loadSlideItems[i]
      slideItem.classList.add('load')
      await this.delay(100)
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

  ionViewWillLeave() {
    this.slideOnClose()
  }

  ionViewDidEnter() {
    this.slideOnLoad()
  }

  ngOnInit() {
    this.matchCollectionObservable = this.blueAllianceService.getEventMatches(currentEvent)
  }

  getItems(ev) {
    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.match = `qm${val}`
      // this.matchCollectionObservable = this.matchCollectionObservable.filter
    }
  }

}
