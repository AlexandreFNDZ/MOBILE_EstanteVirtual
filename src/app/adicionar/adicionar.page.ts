import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})
export class AdicionarPage implements OnInit {

  mangaForm: FormGroup;
  formValid: boolean;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.mangaForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'lastIssue': new FormControl('', Validators.required),
      'status': new FormControl('', Validators.required),
      'thumb': new FormControl(''),
    });

    this.formValid = false;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit(objForm) {
    if(this.mangaForm.valid) {
      this.formValid = false;
      this.modalCtrl.dismiss(objForm);
    } else {
      this.formValid = true;
    }

  }

}
