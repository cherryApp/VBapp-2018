import { Component, OnInit, Input } from '@angular/core';
import { Knockout } from '../model/knockout';
import { BaseService } from '../service/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { concat, zip } from 'rxjs';
import { Team } from '../model/team';
import { Stadium } from '../model/stadium';
import { TeamService } from '../service/team.service';
import { StadiumService } from '../service/stadium.service';
import { KnockoutService } from '../service/knockout.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  @Input() listName: string;
  knockout: any = {};
  teams: Team[] = [];
  stadiums: Stadium[] = [];
  isDataLoaded: boolean = false;

  constructor(
    private knockService: KnockoutService,
    private teamService: TeamService,
    private stadiumService: StadiumService,
  ) { }

  ngOnInit() {
    let knockouts = this.knockService.getAll('knockout')
      
    let teams = this.teamService.getAll('teams')
      
    let stadiums = this.stadiumService.getAll('stadiums')
      


    zip( knockouts, teams, stadiums ).subscribe( 
      values => {
        this.knockout = values[0][0];
        this.teams = values[1];
        this.stadiums = values[2];
        this.isDataLoaded = true;
      },
      err => console.error(err)
    );
  }

  /*

  .subscribe(
      knockout => {
        console.log( knockout[0] );
        this.knockout = knockout[0];
        console.log( this.knockout.mathces );
      }
    );

    */

}
