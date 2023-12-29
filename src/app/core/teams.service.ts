import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultWapper } from '../models/common.model';
import { Teams } from '../models/teams.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.api

  getTeams() {
    return this.http.get<ResultWapper<Teams>>(`${this.baseUrl}teams`);
  }

  getPagination(page: any, perPage: any) {
    return this.http.get<ResultWapper<Teams>>(`${this.baseUrl}teams/?page=${page}&per_page=${perPage}`);
  }

  getTeamById(id: any) {
    return this.http.get<Teams>(`${this.baseUrl}teams/${id}`);
  }

}
