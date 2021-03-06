import { Component, OnInit } from '@angular/core';
import { RequestCreate, ResponseCreate } from '../homepage/pessoa.model';
import { ServicoService } from '../homepage/servico.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidacaoService } from '../validacao.service';
import { isCPF } from 'brazilian-values';



@Component({
  selector: 'app-createperson',
  templateUrl: './createperson.component.html',
  styleUrls: ['./createperson.component.css']
})
export class CreatepersonComponent implements OnInit {

  cpfmask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]

  request = new RequestCreate;

  response: ResponseCreate

  constructor(private userService: ServicoService, private _router: Router, private toastrService: ToastrService, private validacaoCreate: ValidacaoService) { }

  ngOnInit() {
  }

  save() {
    if (this.validarCampos(this.request, this.response) && this.validarEmail(this.request)) {
      this.userService.createUser(this.request).subscribe(res => {
        this.response = res
        console.log('Este é o retorno do sucesso');
        console.log(res);
        this.toastrService.success('Usuário criado com sucesso!');
        this._router.navigate(['']);
      }, erro => {
        console.error(erro.error.Message);
        console.error(erro)
        alert(erro.error.Message);
      });
    }
  }


  validarEmail(request: RequestCreate) {
    let EMAIL_REGEXP = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ((request.email.length <= 5 || !EMAIL_REGEXP.test(request.email))) {
      alert("Insira um email válido!");
      return false;
    }
    return true;
  }

  validarCampos(request: RequestCreate, response: ResponseCreate): Boolean {
    var date1 = new Date(request.nascimento);
    var date2 = new Date();
    var date3 = new Date("01-01-1900");
    if (date1 < date3) {
      alert("Não são permitidas datas antecedentes ao ano 1900.");
      return false;
    }
    if (date1 > date2) {
      alert("Não são permitidas datas futuras ao dia de hoje no campo 'Data de Nascimento'.");
      return false;
    }
    let NOMES_REGEXP = /^([a-zA-ZáéíóúüÁÉÍÓÚÜãõÃÕâêîôûÂÊÎÔÛ$][a-zA-Z áéíóúüÁÉÍÓÚÜãõÃÕâêîôûÂÊÎÔÛ$]*)+$/;
    if (!NOMES_REGEXP.test(request.nome)) {
      alert("Insira um nome válido");
      return false;
    }
    if (!NOMES_REGEXP.test(request.sobrenome)) {
      alert("Insira um sobrenome válido");
      return false;
    }
    //////
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
      //Verificação se CPF existe ou não
      if (!isCPF(request.cpf)) {
        alert("O CPF inserido não existe ou não é válido.");
        return false;
      }
      //
    } else {
      alert("É obrigatório preencher todos os campos!");
      return false;
    }
    return true;
  }
}


