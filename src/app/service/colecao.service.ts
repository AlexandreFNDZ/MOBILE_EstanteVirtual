import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Manga } from '../models/manga-model';
import { MangaList } from '../models/manga-list-model';

@Injectable({
  providedIn: 'root'
})
export class ColecaoService {

  constructor(private storage: Storage) { }

  public getLastKey() {
    let lastKey = 0;

    this.storage.forEach((key: string) => {
      lastKey = Number.parseInt(key);
    }).then(() => {
      return lastKey;
    })

    return lastKey;
  }

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

  public getAll() {
    let mangaList: MangaList[] = [];
    let mangas: Manga[] = [];

    this.storage.forEach((value: Manga, key: string, iterationNumber: number) => {
      let manga = new MangaList();

      manga.key = key;
      manga.manga = value;

      mangaList.push(manga);
    }).then(() => {
      mangaList.forEach((item) => {
        mangas.push(item.manga);
      })

      return mangas;
    }).catch((error) => {
      return mangas;
    });

    return mangas;
  }
}
