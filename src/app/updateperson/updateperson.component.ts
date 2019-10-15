import { Component, OnInit } from '@angular/core';
import { User, RequestCreate, RequestUpdate } from '../homepage/pessoa.model';
import { ServicoService } from '../homepage/servico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-updateperson',
  templateUrl: './updateperson.component.html',
  styleUrls: ['./updateperson.component.css']
})
export class UpdatepersonComponent implements OnInit {


  // [textMask]="{mask: cpfmask}"
  cpfmask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]

  datamask = [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
  datainvertidamask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/]

  request: RequestUpdate;
  user: User;
  id: string;

  constructor(private ServicoService: ServicoService, private route: ActivatedRoute, private _route: Router, private toastrService: ToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ServicoService.getUser(this.id).subscribe(res => {
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

  update() {
    if (this.validarCamposUpdate(this.request)) {
      this.ServicoService.updateUser(this.request).subscribe(res => {
        this.toastrService.success('Usuário atualizado com sucesso!');
        this._route.navigate(['']);
      })
    }
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
      else if (request = null) {
        alert("É obrigatório preencher todos os campos!");
        return false;
      }
    }
    return true;
  }
}

