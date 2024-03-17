import { Component, OnInit } from '@angular/core';
import { PoDynamicViewField, PoSelectOption } from '@po-ui/ng-components';
import { Subscription, catchError } from 'rxjs';
import { TeamsService } from 'src/app/core/teams.service';
import { ICommonType, IResultWapperGeneral, ResultWapper } from 'src/app/models/common.model';
import { ITeams } from 'src/app/models/teams.model';

@Component({
  selector: 'app-franchises',
  templateUrl: './franchises.component.html',
  styleUrls: ['./franchises.component.css']
})
export class FranchisesComponent implements OnInit {

  constructor(private _franchisesService: TeamsService) {}

  franchises: ITeams[] = [];
  franchisesForOptions: ITeams[] =[];
  franchisesOptions: PoSelectOption[] = [];
  shouldShowProgress: boolean = true;
  filterValue: string | number | PoSelectOption = "";
  page: number = 1;
  perPage: number = 5;
  private teamsSubscription: Subscription | undefined;
  private teamsOptionsSubscription: Subscription | undefined;

  fields: PoDynamicViewField[] = [
    {property: 'conference', label: 'Conferência', divider:'Conferência', gridColumns: 2, order: 1},
    {property: 'city', label: 'Cidade', gridColumns: 2},
    {property: 'division', label: 'Divisão de conferência', gridColumns: 2},
    {property: 'full_name', label: 'Nome Completo', divider:'Franquia', gridColumns: 2},
    {property: 'abbreviation', label: 'Nome Abreviado', gridColumns: 2},
  ];



  ngOnInit(): void {
    // this.getTeamsPaginated(this.page, this.perPage);
    this.getTeams();
    this.getFullTeamsOptions();
  }

  getTeamsPaginated(page: number, per_page: number) {
    this.teamsSubscription = 
    this._franchisesService.getPagination(page, per_page).pipe(
      catchError( error => {
        this.shouldShowProgress = false;
        console.error('Error during the search of franchises', error);
        return [];
      })
    ).subscribe((res: ResultWapper<ITeams>) => {
      if(res.meta) {
        this.franchises = res.data;
        this.shouldShowProgress = false;
      } else  {
        console.error('Error during the recovery of teams');
      }
    });
  }

  getFullTeamsOptions() {
    this.teamsOptionsSubscription = 
    this._franchisesService.getTeams().pipe(
      catchError( error =>  {
        this.shouldShowProgress = false;
        console.error('Error during the search of franchises', error);
        return [];
      })
    ).subscribe((res: IResultWapperGeneral<ITeams>) => {
      if(res) {

        let franchisesFull = res.data;
        console.log(franchisesFull);
        this.getOptions(franchisesFull);
        this.shouldShowProgress = false;

      } else {
        this.shouldShowProgress = false;
        console.error('Error during the recovery of teams');

      }
    });
  }

  getTeams() {
    this.teamsSubscription = 
    this._franchisesService.getTeams().pipe(
      catchError( error =>  {
        this.shouldShowProgress = false;
        console.error('Error during the search of franchises', error);
        return [];
      })
    ).subscribe((res: IResultWapperGeneral<ITeams>) => {
      if(res) {

        this.franchises = res.data;
        this.getOptions(this.franchises);
        this.shouldShowProgress = false;

      } else {
        this.shouldShowProgress = false;
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
      return this.franchisesOptions;
    } else {
      return
    }
  }

  onChangeFilter(event: PoSelectOption): void {
    this.filterValue = event;
  }

  onClearFilter() {
    this.getTeamsPaginated(1, 5);
  }

  filterOptions() {
    this.shouldShowProgress = true;
    let newList = this._franchisesService.getTeamById(this.filterValue).pipe(
      catchError( error =>  {
        this.shouldShowProgress = false;
        console.error('Error during the search of franchises', error);
        return []
      })
    ).subscribe((res: any) => {
      this.shouldShowProgress = false;
      this.franchises = [res.data];
    })
  }

  loadMore() {
    this.page += 1;
    this.shouldShowProgress = true;

    this._franchisesService.getPagination(this.page, this.perPage)
      .pipe(
        catchError(error => {
          this.shouldShowProgress = false;
          console.error('Error when getting page content', error);
          return []
        })
      )
      .subscribe( (res: any) => {
        const pageContent: ITeams[] = res.data;
        this.franchises = this.franchises.concat(pageContent);
        this.shouldShowProgress = false;
      })
  }


  ngOnDestroy(): void {
    if(this.teamsSubscription) {
      this.teamsSubscription.unsubscribe();
    }
  }


}
