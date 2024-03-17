import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResultWapper } from '../models/common.model';
import { IPlayers } from '../models/players.model';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.api;

  private header: HttpHeaders = new HttpHeaders({
    'Authorization': environment.header.apiKey
  })

  getAllPlayers() {
    return this.http.get<ResultWapper<IPlayers>>(`${this.baseUrl}players`, {headers: this.header});
  }

  getPlayerById(id: any) {
    return this.http.get<IPlayers>(`${this.baseUrl}players/${id}`, {headers: this.header});
  }

  getPlayersPaginated(next_cursor: number | string, per_page: number | string) {
    return this.http.get<ResultWapper<IPlayers>>(`${this.baseUrl}players/?next_cursor=${next_cursor}&per_page=${per_page}`, {headers: this.header});
  }

  searchPlayer(search: any) {
    return this.http.get<ResultWapper<IPlayers>>(`${this.baseUrl}players/?search=${search}`, {headers: this.header});
  }

  getPlayersByTeamsId(teamId: number) {
    return this.http.get<ResultWapper<IPlayers>>(`${this.baseUrl}players/?teams_ids[]=${teamId}`, {headers: this.header})
  }

}
