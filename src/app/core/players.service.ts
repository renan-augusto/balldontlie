import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResultWapper } from '../models/common.model';
import { Players } from '../models/players.model';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.api;

  getAllPlayers() {
    return this.http.get<ResultWapper<Players>>(`${this.baseUrl}players`);
  }

  getPlayerById(id: any) {
    return this.http.get<Players>(`${this.baseUrl}players/${id}`);
  }

  getPlayersPaginated(page: any, perPage: any) {
    return this.http.get<ResultWapper<Players>>(`${this.baseUrl}players/?page=${page}&$per_page={perPage}`);
  }

  searchPlayer(search: any) {
    return this.http.get<ResultWapper<Players>>(`${this.baseUrl}players/?search=${search}`);
  }

}
