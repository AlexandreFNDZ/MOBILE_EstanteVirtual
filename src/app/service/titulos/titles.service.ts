import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Manga } from 'src/app/models/manga-model';
import { ColecaoService } from '../colecao.service';

@Injectable({
  providedIn: 'root'
})
export class TitlesService {
  private URL_API:string = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey";
  private API_KEY:string = "5577cbe028c4adfb8878314a80a40a76";
  private HASH_KEY:string = "a85a176848ff535239b605700eb0a3f7"; // md5 of ts + private key + public key
  private imageArray:string[] = [
    "https://i.pinimg.com/564x/1b/c8/c9/1bc8c969dd63c9cca0c6bf16ed0de27a.jpg"
    // "https://i.pinimg.com/564x/c9/82/34/c98234dbee41f26bd47ac1833a79a720.jpg",
    // "https://i.pinimg.com/564x/34/e3/da/34e3dafa67def4b31743d7d31c94d28a.jpg",
    // "https://i.pinimg.com/564x/94/5a/ac/945aac49311347d05fb5a8869c0cf3f8.jpg"
  ];

  private allMangas: Manga[];
  private andamentoMangas: Manga[];
  private finalizadoMangas: Manga[]; 
  public static isReadyProp: boolean = false;

  constructor(private httpClient: HttpClient, private colecaoService: ColecaoService) {
    if(!TitlesService.isReadyProp) {
      this.isReady();
    }
  }

  public async isReady() {
    if (!TitlesService.isReadyProp) {
      await this.getMangas().then((value) => {
        this.allMangas = value;
  
        this.andamentoMangas = this.getAndamento();
        this.finalizadoMangas = this.getFinalizado();
  
        TitlesService.isReadyProp = true;
      });
    }
  }

  getAllTitles() {
    return this.httpClient.get(this.URL_API + "=" + this.API_KEY + "&hash=" + this.HASH_KEY);
  }

  public getAllMangas() {
    return this.allMangas;
  }

  public getAndamentoMangas() {
    return this.andamentoMangas;
  }

  public getFinalizadoMangas() {
    return this.finalizadoMangas;
  }

  public getMangaById(idParam: number) {
    let mangaReturned: Manga = null;

    this.allMangas.forEach((manga) => {
      if (manga.id == idParam) {
        mangaReturned = manga;
      }
    });

    return mangaReturned;
  }

  public setManga(mangaParam) {
    let mangaNovo = new Manga(mangaParam.title, mangaParam.lastIssue, mangaParam.status, mangaParam.thumb);
    mangaNovo = this.verificaThumb(mangaNovo);

    this.allMangas.push(mangaNovo);

    if (mangaNovo.status == 'andamento') {
      this.andamentoMangas.push(mangaNovo);
    } else if (mangaNovo.status == 'finalizado') {
      this.finalizadoMangas.push(mangaNovo);
    }

    this.colecaoService.insert(mangaNovo);
  }

  public editManga(idParam, editParam) {
    this.allMangas.forEach((manga) => {
      if (manga.id == idParam) {
        manga.lastIssue = editParam.lastIssue;
        manga.status = editParam.status;
        manga.thumb = editParam.thumb;

        this.colecaoService.update(manga);
      }
    });

    this.finalizadoMangas = this.getFinalizado();
    this.andamentoMangas = this.getAndamento();
  }

  public deleteManga(idParam) {
    for (let i = 0; i < this.allMangas.length; i++) {
      if (this.allMangas[i].id == idParam) {
        this.colecaoService.remove(this.allMangas[i]);

        this.allMangas.splice(i,1);
        break;
      }
    }

    this.finalizadoMangas = this.getFinalizado();
    this.andamentoMangas = this.getAndamento();
  }

  private async getMangas() {
    // let mangas = Manga.populaManga();
    let mangas;

    mangas = await this.colecaoService.getAll();
      
    if (mangas) {
      mangas.forEach((manga) => {
        manga = this.verificaThumb(manga);
      });
    } else {
      mangas = [];
    }
    
    return mangas;
  }

  private getFinalizado() {
    let mangas = this.allMangas;
    let finalizados: Manga[] = [];

    mangas.forEach((manga) => {
      manga = this.verificaThumb(manga);

      if (manga.status == 'finalizado') {
        finalizados.push(manga);
      }
    })

    return finalizados;
  }

  private getAndamento() {
    let mangas = this.allMangas;
    let andamento: Manga[] = [];

    mangas.forEach((manga) => {
      manga = this.verificaThumb(manga);
      
      if (manga.status == 'andamento') {
        andamento.push(manga);
      }
    })

    return andamento;
  }

  private verificaThumb(manga: Manga) {
    // let index = Math.floor(Math.random() * 4);
    let index = 0;

    if(manga.thumb.trim().length <= 0) {
      manga.thumb = this.imageArray[index]
    }

    return manga;
  }
}
