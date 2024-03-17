import { Component, OnInit, signal } from '@angular/core';
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
  
  constructor(private _playersService: PlayersService) {}

  private playersSubscription: Subscription | undefined;
  
  players: IPlayers[] = [];
  fields: PoDynamicField[] = playersFields;

  loading = signal(false);

  next_cursor: number = 0;
  per_page: number = 10;
  
  ngOnInit(): void {
    this.getPlayersPaginated();
  }

  getPlayersPaginated() {
    this.loading.set(true);
    this.playersSubscription = this._playersService.getPlayersPaginated(this.next_cursor, this.per_page).pipe(
      catchError( error => {
        console.error('Error during the search of players', error);
        return [];
      })
    ).subscribe((res: ResultWapper<IPlayers>) => {
      this.loading.set(false);
      if(res.meta) {
        this.players = res.data;
        if(this.players.length > 0) {
          for( let p of this.players) {
            p.weight = this.getWeightInKilos(p.weight);
            p.height = this.getHeightInMeters(p.height);
          }
        }
      } else {
        this.loading.set(false);
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
    console.log(event);
  }
}
