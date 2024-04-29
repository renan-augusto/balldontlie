import { Component, OnInit, EventEmitter } from '@angular/core';
import { PoComboComponent, PoComboOption, PoDynamicViewField, PoSelectOption } from '@po-ui/ng-components';
import { Subscription, catchError } from 'rxjs';
import { TeamsService } from 'src/app/core/teams.service';
import { IResultWapperGeneral, ResultWapper } from 'src/app/models/common.model';
import { teamsFields } from 'src/app/models/fields.model';
import { ITeams } from 'src/app/models/teams.model';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-franchises',
  templateUrl: './franchises.component.html',
  styleUrls: ['./franchises.component.css']
})
export class FranchisesComponent implements OnInit {
  constructor(private _franchisesService: TeamsService) {}

  franchises: ITeams[] = [];
  franchisesBackup: ITeams[] = [];
  franchisesForOptions: ITeams[] =[];
  franchisesOptions: PoComboOption[] = [];
  selectedFranchise: PoComboOption = {value: '', label: ''};
  filterValue: string | number | PoSelectOption = "";
  fields: PoDynamicViewField[] = teamsFields;
  first: number = 0;
  rows: number = 5;
  
  
  

  private teamsSubscription: Subscription | undefined;
  private teamsOptionsSubscription: Subscription | undefined;

  ngOnInit(): void {
    // this.getTeamsPaginated(this.page, this.perPage);
    this.getTeams();
    this.getFullTeamsOptions();
    
  }

  getTeamsPaginated(page: number, per_page: number) {
    this.teamsSubscription = this._franchisesService.getPagination(page, per_page).pipe(
      catchError( error => {
        console.error('Error during the search of franchises', error);
        return [];
      })
    ).subscribe((res: ResultWapper<ITeams>) => {
      if(res.meta) {
        this.franchises = res.data;
      } else  {
        console.error('Error during the recovery of teams');
      }
    });
  }

  getFullTeamsOptions() {
    this.teamsOptionsSubscription = this._franchisesService.getTeams().pipe(
      catchError( error =>  {
        console.error('Error during the search of franchises', error);
        return [];
      })
    ).subscribe((res: IResultWapperGeneral<ITeams>) => {
      if(res) {
        let franchisesFull = res.data;
        console.log(franchisesFull);
        this.getOptions(franchisesFull);

      } else {
        console.error('Error during the recovery of teams');

      }
    });
  }

  getTeams() {
    this.teamsSubscription = this._franchisesService.getTeams().pipe(
      catchError( error =>  {
        console.error('Error during the search of franchises', error);
        return [];
      })
    ).subscribe((res: IResultWapperGeneral<ITeams>) => {
      if(res) {
        this.franchisesBackup = res.data;
        this.franchises = this.franchisesBackup.slice(0, 4);
        this.getOptions(this.franchisesBackup);
        
        
      } else {
        console.error('Error during the recovery of teams');

      }
    });
  }

  getOptions(franchises: any) {

    if(franchises.length > 0) {
      this.franchisesOptions = franchises.map((a: any) => ({
        label: a.name,
        value: a.id
      }));
      return this.franchisesOptions as PoComboOption[];
    } else {
      return
    }
  }

  paginate(event: any){
    console.log(event);
    let next = (event.first + event.rows) - 1;
    return this.franchises = this.franchisesBackup.slice(event.first, next);   
  }

  onChangeFilter(event: PoSelectOption): void {
    this.filterValue = event;
  }

  onClearFilter(): void {
    this.selectedFranchise = {value: '', label: ''}
    this.franchisesOptions = [];
    this.getTeams();
  }

  filterOptions(event: any) {
    let newList = this._franchisesService.getTeamById(this.filterValue).pipe(
      catchError( error =>  {
        console.error('Error during the search of franchises', error);
        return []
      })
    ).subscribe((res: any) => {
      this.franchises = [res.data];
    })
  }

  backtop(){
    window.scrollTo(0, 0);
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }


  ngOnDestroy(): void {
    if(this.teamsSubscription) {
      this.teamsSubscription.unsubscribe();
    }
  }


}
