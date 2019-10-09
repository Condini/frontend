import { Component, OnInit } from '@angular/core';
import { User, RequestCreate, RequestUpdate } from '../homepage/pessoa.model';
import { ServicoService } from '../homepage/servico.service';
import { ActivatedRoute, Router } from '@angular/router';


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

  constructor(private ServicoService: ServicoService, private route: ActivatedRoute, private _route: Router) { }

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
    this.ServicoService.updateUser(this.request).subscribe(res => {
      alert('Dados atualizados');
      this._route.navigate(['']);
    })
  }

}
