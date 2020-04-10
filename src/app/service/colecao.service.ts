import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Manga } from '../models/manga-model';
import { MangaList } from '../models/manga-list-model';

@Injectable({
  providedIn: 'root'
})
export class ColecaoService {

  constructor(private storage: Storage) { }

  public insert(mangaParam: Manga) {
    this.save(mangaParam);
  }

  public update(mangaParam: Manga) {
    this.save(mangaParam);
  }

  private save(mangaParam: Manga) {
    this.storage.set(mangaParam.id.toString(), mangaParam);
  }

  public remove(mangaParam: Manga) {
    this.storage.remove(mangaParam.id.toString());
  }

  public async getAll() {
    let mangaList: MangaList[] = [];
    let mangas: Manga[] = [];

    
    await this.storage.forEach((value: Manga, key: string, iterationNumber: number) => {
      let manga = new MangaList();

      manga.key = key;
      manga.manga = value;

      mangaList.push(manga);
    });

    mangaList.forEach((item) => {
      mangas.push(item.manga);
    })

    return mangas;
  }
}
