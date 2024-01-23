import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
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
  shouldShowProgress: boolean = true;

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {

    const teamsObservable = this._franchisesService.getTeams();

    teamsObservable.pipe(
      catchError( error =>  {
        console.error('Error during the search of franchises', error);
        return []
      })
    ).subscribe((res: ResultWapper<Teams>) => {
      if(res.meta) {
        this.franchises = res.data;
        this.shouldShowProgress = false;
        console.log(this.franchises);
      } else {
        console.error('Error during the recovery of teams');
      }
    });

  }


}
