import { Component } from '@angular/core';
import { TitlesService } from '../service/titulos/titles.service';
import { Manga } from '../models/manga-model';
import { PopoverController } from '@ionic/angular';
import { EditarPage } from '../editar/editar.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public mangas:any[];
  public filteredMangas:any[];

  constructor(private titleService: TitlesService, public popoverController: PopoverController) {}

  ionViewDidEnter(){
    this.mangas = this.titleService.getAllMangas();
    this.filteredMangas = this.mangas;
  }

  filterList(event) {
    let busca = event.detail.value.toLowerCase();

    if (event == null || busca.length < 1) {
      this.filteredMangas = this.mangas;

    } else {
      this.filteredMangas = [];
      
      this.mangas.forEach((manga:Manga) => {
        if (manga.title.toLowerCase().includes(busca)) {
          this.filteredMangas.push(manga);
        }
      });
    }

  }

  abreConfirmacao(elementClicked) {
    console.log(elementClicked);

    this.filteredMangas.forEach((manga:Manga) => {
      if (manga.id == elementClicked.id) {
        manga.lastIssue++;
      }
    });
  }

  abreEditar(elementPressed) {
    console.log(elementPressed);

    this.presentPopover(elementPressed);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: EditarPage,
      componentProps: {
        idSelected: ev.id
      },
      event: ev,
      translucent: true
    });

    popover.onDidDismiss()
      .then((form) => {
        let editForm = form['data']['editForm'];
        let editId = form['data']['id'];

        if (editForm != undefined && editForm != null) {
          console.log(editForm);

          if(editForm == -1) {
            this.titleService.deleteManga(editId);
          } else {
            this.titleService.editManga(editId, editForm);
          }
          
          this.ionViewDidEnter();
        }
      });

    return await popover.present();
  }
}
