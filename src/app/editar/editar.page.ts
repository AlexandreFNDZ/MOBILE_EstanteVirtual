import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Manga } from '../models/manga-model';
import { TitlesService } from '../service/titulos/titles.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  editForm: FormGroup;
  formValid: boolean;
  idSelected: number = null;
  selectedManga: Manga;

  constructor(private popCtrl: PopoverController, private navParams: NavParams, private titleService: TitlesService) { }

  ngOnInit() {
    this.idSelected = this.navParams.get('idSelected');
    this.selectedManga = this.titleService.getMangaById(this.idSelected);

    this.editForm = new FormGroup({
      'lastIssue': new FormControl('', Validators.required),
      'status': new FormControl('', Validators.required),
      'thumb': new FormControl(''),
    });

    this.formValid = false;

    this.editForm.controls['lastIssue'].setValue(this.selectedManga.lastIssue);
    this.editForm.controls['status'].setValue(this.selectedManga.status);
    this.editForm.controls['thumb'].setValue(this.selectedManga.thumb);
  }

  onSubmit(objForm) {
    let objReturn = {
      "id": this.idSelected,
      "editForm": objForm,
    }

    if(this.editForm.valid) {
      this.formValid = false;
      this.popCtrl.dismiss(objReturn);
    } else {
      this.formValid = true;
    }
  }

  onDelete() {
    let objReturn = {
      "id": this.idSelected,
      "editForm": -1,
    }

    this.popCtrl.dismiss(objReturn);
  }

}
