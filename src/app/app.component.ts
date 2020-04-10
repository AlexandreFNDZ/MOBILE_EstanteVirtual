import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ColecaoService } from './service/colecao.service';
import { Manga } from './models/manga-model';
import { TitlesService } from './service/titulos/titles.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private titleService: TitlesService,
    private storage: Storage
  ) {
    
    this.initializeApp();
    
    this.storage.length().then((value) => {
      console.log("length do storage = " + value);
      Manga.setLastId(value);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
