import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouteReuseStrategy} from '@angular/router'

import {IonicModule, IonicRouteStrategy} from '@ionic/angular'
import {SplashScreen} from '@ionic-native/splash-screen/ngx'
import {StatusBar} from '@ionic-native/status-bar/ngx'

import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'

import {AngularFireModule} from 'angularfire2'
import {AngularFirestoreModule} from 'angularfire2/firestore'
import {firebaseConfig} from './credentials'
import {BlueAllianceService} from './services/data/blue-alliance.service'
import {HttpModule} from '@angular/http'
// import { IgxCategoryChartModule } from 'igniteui-angular-charts/ES5/igx-category-chart-module';
// import { IgxGridModule } from 'igniteui-angular';
import {IonicStorageModule} from '@ionic/Storage'
import {PopoverPageModule} from './pages/popover/popover.module'
import { FormsModule } from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    PopoverPageModule,
    IonicStorageModule.forRoot(),
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    // IgxGridModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    HttpModule,
    // IgxCategoryChartModule
    ComponentsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BlueAllianceService,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
