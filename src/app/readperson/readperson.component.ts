import { Component, OnInit } from '@angular/core';
import { User } from '../homepage/pessoa.model';
import { ServicoService } from '../homepage/servico.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-readperson',
  templateUrl: './readperson.component.html',
  styleUrls: ['./readperson.component.css']
})
export class ReadpersonComponent implements OnInit {

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

}
