import { Injectable } from '@angular/core';
import { RequestCreate, ResponseCreate } from './homepage/pessoa.model';
import { NgForm } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ValidacaoService {

  constructor() { }

  protected onSubmit(f: NgForm): void {

    // code here

    f.resetForm(); // or f.reset();
  }

  request: ResponseCreate;

  validacaoCreate() {
    if (!this.request.nome && this.request.nome.length <= 0) {
      alert('O nome é inválido');
    }

  }
}
