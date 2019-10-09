import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../homepage/servico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, ResponseUser } from '../homepage/pessoa.model';

@Component({
  selector: 'app-deleteperson',
  templateUrl: './deleteperson.component.html',
  styleUrls: ['./deleteperson.component.css']
})
export class DeletepersonComponent implements OnInit {

  constructor(private ServicoService: ServicoService, private route: ActivatedRoute, private _route: Router) { }

  id: string;
  user: User;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ServicoService.getUser(this.id).subscribe(res => {
      this.user = res;

      this.user.cpf = this.user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    });
  }

  delete() {
    this.ServicoService.deleteUser(this.id).subscribe(res => {
      alert('Usuário removido!');
      this._route.navigate(['']);
    })
  }
}
