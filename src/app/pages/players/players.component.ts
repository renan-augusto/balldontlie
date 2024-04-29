import { Component, OnInit, signal } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoDynamicField } from '@po-ui/ng-components/lib/components/po-dynamic/po-dynamic-field.interface';
import { Subscription, catchError } from 'rxjs';
import { PlayersService } from 'src/app/core/players.service';
import { ResultWapper } from 'src/app/models/common.model';
import { playersFields } from 'src/app/models/fields.model';
import { IPlayers } from 'src/app/models/players.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  
  constructor(private _playersService: PlayersService,
    public poNotification: PoNotificationService
  ) {}

  private playersSubscription: Subscription | undefined;
  
  players: IPlayers[] = [];
  fields: PoDynamicField[] = playersFields;
 
  next_cursor: number = 10;
  per_page: number = 10;
  search = "";
  inputSearch: string = "";
  showBack: boolean = false;
  showLoadMore: boolean = false;
  buttonloadMore: boolean = false;

  
  ngOnInit(): void {
    this.getPlayersPaginated();
    this.inputSearch = "";
    this.showLoadMore = true;
  }
  
  getSearch(){
    this.playersSubscription = this._playersService.searchPlayer(this.search).pipe(
      catchError(error => {
        console.log("Unable to find your search", error);
        return[]
      })
    ).subscribe((res: ResultWapper<IPlayers>) => {
      if(res.data.length > 0){
        this.players = res.data;
        this.showBack = true
        this.showLoadMore = false;
      }
      else{
        this.poNotification.warning("Jogador não encontrado")
        this.inputSearch = "";
      }
      
    });
  }

  getPlayersPaginated() {
    this.playersSubscription = this._playersService.getPlayersPaginated(this.next_cursor, this.per_page).pipe(
      catchError( error => {
        console.error('Error during the search of players', error);
        return [];
      })
    ).subscribe((res: ResultWapper<IPlayers>) => {
      if(res.data.length > 0) {
        //this.players = res.data.concat(res.data);
        this.players = this.players.concat(res.data)
        this.players = this.players.map((player) => ({
            ...player,
            height: this.getHeightInMeters(player.height),
            weight: this.getWeightInKilos(player.weight)
          })
        );
      } else {
        console.error('Error during the recovery of players');
      
      }

      if(res.meta.next_cursor){
        this.next_cursor = res.meta.next_cursor;
      }
    })
  }
  
  getWeightInKilos(weight: string) {
    const parsedWeight: number = parseFloat(weight);
    const weightInKilos: number = Math.round(parsedWeight * 0.675);
    return `${weightInKilos} kg`;
  }

  getHeightInMeters(height: string) {
    const [feet, inches] = height.split('-').map(Number);

    const totalInches = feet * 12 + inches;
    const toMeters = totalInches * 0.0254;

    const roundedMeters = toMeters.toFixed(2);

    return `${roundedMeters} metros`;
  }

  onSearchEvent(event: any) {
    this.search = event;
  }

  backHome(){
  window.scrollTo(0, 0);
  this.next_cursor = 0;
  this.per_page= 10;
  this.search = "";
  this.inputSearch = "";
  this.showBack = false;
  this.getPlayersPaginated();
  this.showLoadMore = true;
  }
  
  backtop(){
    window.scrollTo(0, 0);
  }
}
