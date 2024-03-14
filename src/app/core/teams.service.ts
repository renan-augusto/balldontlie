import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResultWapperGeneral, ResultWapper } from '../models/common.model';
import { Teams } from '../models/teams.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.api;

  private header: HttpHeaders = new HttpHeaders({
    'Authorization': environment.header.apiKey
  })


  getTeams() {
    return this.http.get<IResultWapperGeneral<Teams>>(`${this.baseUrl}teams`, {headers: this.header});
  }

  getPagination(page: any, perPage: any) {
    return this.http.get<ResultWapper<Teams>>(`${this.baseUrl}teams/?next_cursor=${page}&per_page=${perPage}`, {headers: this.header});
  }

  getTeamById(id: any) {
    return this.http.get<Teams>(`${this.baseUrl}teams/${id}`, {headers: this.header});
  }

}
