import { Component, OnInit } from '@angular/core';
import { ServicoService } from './servico.service';
import { User } from './pessoa.model';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  cpfmask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]

  datamask = [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]

  users: any;

  constructor(private userService: ServicoService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;

      for (let x = 0; x < this.users.length; x++) {
        this.users[x].cpf = this.users[x].cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
      }

      console.log(this.users)
    });
  }
}
