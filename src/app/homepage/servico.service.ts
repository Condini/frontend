import { Injectable } from '@angular/core';
import { Observable, observable, throwError, of } from 'rxjs';
import { ResponseUsers, ResponseCreate, RequestCreate, ResponseUser, User, RequestUpdate, ResponseUpdate } from './pessoa.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private _url = 'http://localhost:49971/api';

  user: User;
  users: any

  constructor(private http: HttpClient) { }

  private handleError(res: Response | any) {
    alert("CPF já existente");
    return Observable.throw('CPF JÁ EXISTENTE');
  }


  getUsers(): Observable<User> {
    return this.http.get<User>(this._url + '/GetPessoaData');
  }

  createUser(request: RequestCreate): Observable<ResponseCreate> {
    return this.http.post<ResponseCreate>(this._url + '/PessoaInsert', request);
  }

  getUser(id: string): Observable<User> {
    const url = this._url + '/GetPessoaById/' + id;
    return this.http.get<User>(url);
  }
  updateUser(request: RequestUpdate): Observable<ResponseUpdate> {
    const url = this._url + '/UpdatePessoa';
    return this.http.put<ResponseUpdate>(url, request);
  }

  deleteUser(id: string): Observable<any> {
    const url = this._url + '/DeletePessoa/' + id;
    return this.http.delete<any>(url);
  }

  verificaCPFdup(users: RequestCreate) {
    this.getUsers().subscribe((res) => {
      this.users = res;
      if (res.cpf == users.cpf) {
        alert("CPF já existente na base de dados!")
        return false;
      }
    })
  }
  // oi






}


