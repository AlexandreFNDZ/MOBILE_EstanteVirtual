import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdicionarPage } from '../adicionar/adicionar.page';
import { Manga } from '../models/manga-model';
import { TitlesService } from '../service/titulos/titles.service';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public mangaForm: Manga;

  constructor(public modalCtrl: ModalController, private titleService: TitlesService, private eventEmitterService: EventEmitterService) {

  }

  firstComponentFunction(){    
    this.eventEmitterService.onFirstComponentButtonClick();    
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AdicionarPage
    });

    modal.onDidDismiss()
      .then((form) => {
        this.mangaForm = form['data'];
        if (this.mangaForm != undefined && this.mangaForm != null) {
          console.log(this.mangaForm);
          this.titleService.setManga(this.mangaForm);
          this.firstComponentFunction();
        }
        
    });

    return await modal.present();
  }

}
