import { Component, OnInit } from '@angular/core';
import { RequestCreate, ResponseCreate } from '../homepage/pessoa.model';
import { ServicoService } from '../homepage/servico.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private userService: ServicoService, private _router: Router, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  save() {
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

//testeeee
