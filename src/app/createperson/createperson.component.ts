import { Component, OnInit } from '@angular/core';
import { RequestCreate, ResponseCreate } from '../homepage/pessoa.model';
import { ServicoService } from '../homepage/servico.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidacaoService } from '../validacao.service';

@Component({
  selector: 'app-createperson',
  templateUrl: './createperson.component.html',
  styleUrls: ['./createperson.component.css']
})
export class CreatepersonComponent implements OnInit {

  cpfmask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]
  datamask = [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]

  request = new RequestCreate;

  response: ResponseCreate

  constructor(private userService: ServicoService, private _router: Router, private toastrService: ToastrService, private validacaoCreate: ValidacaoService) { }

  ngOnInit() {
  }

  save() {
    if (this.validarCampos(this.request, this.response)) {
      this.userService.createUser(this.request).subscribe(res => {
        this.response = res
        console.log('Este é o retorno do sucesso');
        console.log(res);
        this.toastrService.success('Usuário criado com sucesso!');
        this._router.navigate(['']);
      }, erro => {
        console.error('Este é o retorno do erro');
        console.error(erro)
      });
    }
  }

  validarCampos(request: RequestCreate, response: ResponseCreate): Boolean {

    if (request != null) {
      if (!request.nome || request.nome.length === 0) {
        alert("Preencha o campo 'Nome'!");
        return false;
      }
      if (!request.sobrenome || request.sobrenome.length === 0) {
        alert("Preencha o campo 'Sobrenome'!");
        return false;
      }
      if (!request.cpf || request.cpf.length === 0) {
        alert("Preencha o campo 'CPF'!");
        return false;
      }
      if (!request.email || request.email.length === 0) {
        alert("Preencha o campo 'Email'!");
        return false;
      }
      if (!request.sexo || request.sexo.length === 0) {
        alert("Preencha o campo 'Sexo'!");
        return false;
      }
      if (!request.nascimento) {
        alert("Preencha o campo 'Nascimento'!");
        return false;
      }
      else if (response = null) {
        alert("É obrigatório preencher todos os campos!");
        return false;
      }
    }
    return true;
  }
}

//testeeee
