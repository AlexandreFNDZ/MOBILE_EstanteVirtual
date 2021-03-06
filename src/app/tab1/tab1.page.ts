import { Component, OnInit } from '@angular/core';
import { TitlesService } from '../service/titulos/titles.service';
import { Manga } from '../models/manga-model';
import { PopoverController } from '@ionic/angular';
import { EditarPage } from '../editar/editar.page';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public mangas: any[];
  public filteredMangas: any[];
  public totalTitulos: number;
  public totalVolumes: number;

  constructor(private titleService: TitlesService, public popoverController: PopoverController, private eventEmitterService: EventEmitterService) {}

  ngOnInit() {   
    this.eventEmitterService.subsVar = this.eventEmitterService.    
    invokeFirstComponentFunction.subscribe(() => {    
      this.ionViewDidEnter();    
    });     
  }

  async ionViewDidEnter(){
    await this.titleService.isReady();
    this.mangas = this.titleService.getAllMangas();
    this.filteredMangas = this.mangas;

    this.setTotals();
    console.log("entrou tab1DidEnter");
  }

  setTotals() {
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

        this.setTotals();
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
        
        if (form['data'] != undefined && form['data'] != null) {
          let editForm = form['data']['editForm'];
          let editId = form['data']['id'];

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
