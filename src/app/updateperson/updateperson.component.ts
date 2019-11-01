import { Component, OnInit } from '@angular/core';
import { User, RequestCreate, RequestUpdate } from '../homepage/pessoa.model';
import { ServicoService } from '../homepage/servico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isCPF, isCNPJ } from 'brazilian-values';


@Component({
  selector: 'app-updateperson',
  templateUrl: './updateperson.component.html',
  styleUrls: ['./updateperson.component.css']
})
export class UpdatepersonComponent implements OnInit {


  // [textMask]="{mask: cpfmask}"
  cpfmask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]
  //datamask = [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
  datamask = [/[0-2]/, /[1-9]/, '/', /[0-1]/, /[0-9]/, '/', /[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/]
  datainvertidamask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/]

  request: RequestUpdate;
  user: User;
  id: string;
  nasc: string;
  today: string;

  constructor(private ServicoService: ServicoService, private route: ActivatedRoute, private _route: Router, private toastrService: ToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.today = this.formatDate(new Date);
    this.ServicoService.getUser(this.id).subscribe(res => {
      this.nasc = this.formatDate(res.nascimento);
      this.request = {
        id: res.id,
        nome: res.nome,
        sobrenome: res.sobrenome,
        cpf: res.cpf,
        email: res.email,
        sexo: `${res.sexo}`,
        nascimento: res.nascimento
      }
    });
  }

  formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  update() {
    if (this.validarCamposUpdate(this.request) && this.validarEmail(this.request)) {
      this.ServicoService.updateUser(this.request).subscribe(res => {
        this.toastrService.success('Usuário atualizado com sucesso!');
        this._route.navigate(['']);
      }, erro => {
        console.error(erro.error.Message);
        console.error(erro)
        alert(erro.error.Message);
      })
    }
  }

  clearNascimento() {
    this.request.nascimento = null;
  }

  validarEmail(request: RequestCreate) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if ((request.email.length <= 5 || !EMAIL_REGEXP.test(request.email))) {
      alert("Insira um email válido!");
      return false;
    }

    return true;
  }

  validarCamposUpdate(request: RequestCreate): Boolean {

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
      else if (request = null) {
        alert("É obrigatório preencher todos os campos!");
        return false;
      }
    }
    return true;
  }
}

