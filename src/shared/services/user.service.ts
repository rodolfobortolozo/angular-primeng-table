import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Pagination } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient : HttpClient) { }

  getAll():Observable<User[]>{
    return this.httpClient.get<User[]>("http://localhost:3000/users");
  }

  getPaginate(page: number, perPage:number):Observable<Pagination<User>>{
    return this.httpClient
      .get<Pagination<User>>(`http://localhost:3000/users?_page=${page}&_per_page=${perPage}`)
      .pipe(delay(1000));
  }
}
