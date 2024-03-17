import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResultWapperGeneral, ResultWapper } from '../models/common.model';
import { environment } from 'src/environments/environment';
import { ITeams } from '../models/teams.model';

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
    return this.http.get<IResultWapperGeneral<ITeams>>(`${this.baseUrl}teams`, {headers: this.header});
  }

  getPagination(page: any, perPage: any) {
    return this.http.get<ResultWapper<ITeams>>(`${this.baseUrl}teams/?next_cursor=${page}&per_page=${perPage}`, {headers: this.header});
  }

  getTeamById(id: any) {
    return this.http.get<ITeams>(`${this.baseUrl}teams/${id}`, {headers: this.header});
  }

}
