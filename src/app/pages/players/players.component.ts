import { Component, OnInit } from '@angular/core';
import { Subscription, catchError } from 'rxjs';
import { PlayersService } from 'src/app/core/players.service';
import { ResultWapper } from 'src/app/models/common.model';
import { IPlayers } from 'src/app/models/players.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  
  constructor(private _playersService: PlayersService) {}

  private playersSubscription: Subscription | undefined;
  
  players: IPlayers[] = [];


  next_cursor: number = 0;
  per_page: number = 10;
  
  ngOnInit(): void {
    this.getPlayersPaginated();
  }

  getPlayersPaginated() {
    this.playersSubscription = this._playersService.getPlayersPaginated(this.next_cursor, this.per_page).pipe(
      catchError( error => {
        console.error('Error during the search of players', error);
        return [];
      })
    ).subscribe((res: ResultWapper<IPlayers>) => {
      if(res.meta) {
        this.players = res.data;
      } else {
        console.error('Error during the recovery of players');
      }
    })
  }
  

  onSearchEvent(event: any) {
    console.log(event);
  }
}
