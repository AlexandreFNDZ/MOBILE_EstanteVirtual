import { Component } from '@angular/core';
import { TitlesService } from '../service/titulos/titles.service';
import { Manga } from '../models/manga-model';
import { EditarPage } from '../editar/editar.page';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public mangas:any[];
  public filteredMangas:any[];
  public totalTitulos: number;
  public totalVolumes: number;

  constructor(private titleService: TitlesService, private popoverController: PopoverController) {}

  ionViewDidEnter(){
    this.mangas = this.titleService.getAndamentoMangas();
    this.filteredMangas = this.mangas;
    console.log(this.filteredMangas);

    this.totalTitulos = this.filteredMangas.length;
    this.totalVolumes = this.calculaTotalVolumes();
  }

  calculaTotalVolumes() {
    let totalReturn = 0;

    this.filteredMangas.forEach((manga) => {
      totalReturn += manga.lastIssue;
    });

    return totalReturn;
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

        this.totalVolumes = this.calculaTotalVolumes();
        this.titleService.editManga(elementClicked.id, manga);
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
