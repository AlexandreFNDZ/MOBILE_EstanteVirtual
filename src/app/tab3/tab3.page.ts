import { Component } from '@angular/core';
import { TitlesService } from '../service/titulos/titles.service';
import { Manga } from '../models/manga-model';
import { EditarPage } from '../editar/editar.page';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public mangas:any[];
  public filteredMangas:any[];

  constructor(private titleService: TitlesService, private popoverController: PopoverController) {}

  ionViewDidEnter(){
    this.mangas = this.titleService.getFinalizadoMangas();
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
          this.titleService.editManga(editId, editForm);
          this.ionViewDidEnter();
        }
      });

    return await popover.present();
  }
}
