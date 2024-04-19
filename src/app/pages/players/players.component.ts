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
 
  next_cursor: number = 0;
  per_page: number = 10;
  search = "";
  inputSearch: string = "";
  showBack: boolean = false;
  showLoadMore: boolean = false;

  
  ngOnInit(): void {
    this.getPlayersPaginated();
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
      if(res.meta) {
        this.players = res.data;
        if(this.players.length > 0) {
          for( let p of this.players) {
            p.weight = this.getWeightInKilos(p.weight);
            p.height = this.getHeightInMeters(p.height);
          }
        }
      } else {
        console.error('Error during the recovery of players');
      }
    })
  }
  
  getWeightInKilos(weight: string) {
    let parsedWeight: number = parseFloat(weight);
    parsedWeight = Math.round(parsedWeight * 0.45359237);
    return `${parsedWeight.toString()} kg` ;
  }

  getHeightInMeters(height: string) {
    let [feet, inches] = height.split('-').map(Number);

    let totalInches = feet * 12 + inches;
    let toMeters = totalInches * 0.0254;

    let roundedMeters = toMeters.toFixed(2);

    return `${roundedMeters} metros`

  }

  onSearchEvent(event: any) {
    this.search = event;
  }

  backhome(){
  this.next_cursor = 0;
  this.per_page= 10;
  this.search = "";
  this.inputSearch = "";
  this.showBack = false;
  this.getPlayersPaginated();
  }
}
