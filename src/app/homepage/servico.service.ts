import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseUsers, ResponseCreate, RequestCreate, ResponseUser, User, RequestUpdate, ResponseUpdate } from './pessoa.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private _url = 'http://localhost:49971/api';

  user: User;


  constructor(private http: HttpClient) { }

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
  // oi






}


