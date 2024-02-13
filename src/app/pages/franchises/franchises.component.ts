import { Component, OnInit } from '@angular/core';
import { PoDynamicViewField, PoSelectOption } from '@po-ui/ng-components';
import { Subscription, catchError } from 'rxjs';
import { TeamsService } from 'src/app/core/teams.service';
import { ICommonType, ResultWapper } from 'src/app/models/common.model';
import { Teams } from 'src/app/models/teams.model';

@Component({
  selector: 'app-franchises',
  templateUrl: './franchises.component.html',
  styleUrls: ['./franchises.component.css']
})
export class FranchisesComponent implements OnInit {

  constructor(private _franchisesService: TeamsService) {}

  franchises: Teams[] = [];
  franchisesOptions: PoSelectOption[] = [];
  shouldShowProgress: boolean = true;
  filterValue: string | number | PoSelectOption = "";
  private teamsSubscription: Subscription | undefined

  fields: PoDynamicViewField[] = [
    {property: 'id', label: 'ID', divider: 'Dados dos times', gridColumns: 2, order: 1},
    {property: 'abbreviation', label: 'Nome Abreviado', gridColumns: 2},
    {property: 'city', label: 'Cidade', gridColumns: 8},
    {property: 'conference', label: 'Conferência', divider:'Conferência', gridColumns: 2, order: 1},
    {property: 'division', label: 'Divisão de conferência', gridColumns: 4},
    {property: 'full_name', label: 'Nome Completo', gridColumns: 4},
    {property: 'name', label: 'Nome', gridColumns: 2}
  ];



  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {
    this.teamsSubscription = this._franchisesService.getTeams().pipe(
      catchError( error =>  {
        console.error('Error during the search of franchises', error);
        return []
      })
    ).subscribe((res: ResultWapper<Teams>) => {
      if(res.meta) {

        this.franchises = res.data;
        this.getOptions(this.franchises);
        this.shouldShowProgress = false;
        console.log(this.franchises);

      } else {

        console.error('Error during the recovery of teams');

      }
    });
  }

  getOptions(franchises: any) {
    if(this.franchises.length > 0) {
      this.franchisesOptions = this.franchises.map( (a) => ({
        label:a.name,
        value: a.id
      }));
      this.franchisesOptions
    } else {
      return;
    }
  }

  onChangeFilter(event: PoSelectOption): void {
    this.filterValue = event;
  }

  filterOptions() {
    this.shouldShowProgress = true;
    let newList = this._franchisesService.getTeamById(this.filterValue).pipe(
      catchError( error =>  {
        this.shouldShowProgress = false;
        console.error('Error during the search of franchises', error);
        return []
      })
    ).subscribe((res: Teams) => {
      this.shouldShowProgress = false;
      this.franchises = [res];
    })
  }

  ngOnDestroy(): void {
    if(this.teamsSubscription) {
      this.teamsSubscription.unsubscribe();
    }
  }


}
