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

  private _header: HttpHeaders = new HttpHeaders({
    'Authorization': environment.header.apiKey
  })

  getAllPlayers() {
    return this.http.get<ResultWapper<IPlayers>>(`${this.baseUrl}players`, {headers: this._header});
  }

  getPlayerById(id: any) {
    return this.http.get<IPlayers>(`${this.baseUrl}players/${id}`, {headers: this._header});
  }

  getPlayersPaginated(cursor: number, per_page: number) {
    return this.http.get<ResultWapper<IPlayers>>(`${this.baseUrl}players?per_page=${per_page}&cursor=${cursor}`, {
      headers: this._header
    })
  };

  searchPlayer(search: string) {
    return this.http.get<ResultWapper<IPlayers>>(`${this.baseUrl}players/?search=${search}`, {
      headers: this._header
    })
  };

  getPlayersByTeamsId(teamId: number) {
    return this.http.get<ResultWapper<IPlayers>>(`${this.baseUrl}players/?teams_ids[]=${teamId}`, {headers: this._header})
  }

}
