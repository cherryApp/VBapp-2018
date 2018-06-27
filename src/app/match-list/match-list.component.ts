import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from '../service/team.service';
import { KnockoutService } from '../service/knockout.service';
import { StadiumService } from '../service/stadium.service';
import { Knockout } from '../model/knockout';
import { Team } from '../model/team';
import { Stadium } from '../model/stadium';
import { zip } from 'rxjs';
import { BetService } from '../service/bet.service';
import { Bet } from '../model/bet';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  knockout: Knockout = new Knockout();
  teams: Team[] = [];
  stadiums: Stadium[] = [];
  isLoaded: boolean = false;

  @Input() listName: string;

  constructor(
    private teamService: TeamService,
    private knockoutService: KnockoutService,
    private stadiumService: StadiumService,
    private betService: BetService
  ) { }

  ngOnInit() {
    let teams = this.teamService.getAll('teams');
    let stadium = this.stadiumService.getAll('stadiums');
    let knockouts = this.knockoutService.getAll('knockout');
    let bets = this.betService.getAll('bets');

    zip( teams, stadium, knockouts ).subscribe( 
      values => {
        this.teams = values[0];
        this.stadiums = values[1];
        this.knockout = values[2].filter( round => round.id == this.listName )[0];
        this.isLoaded = true;
      }
    );

  }

  getStadium(id: string): Stadium {
    return this.stadiums.filter( item => item.id == id )[0];
  }
  
  getTeam(id: string): Team {
    return this.teams.filter( item => item.id == id )[0] || new Team();
  }

  pickTeam(match, id): void {
    match.picked = id;
  }

  onBet(match) {
    match.error = false;
    if (!match.amount || !match.picked) {
      return match.error = true;
    }

    let bet: any = {};
    bet.amount = match.amount;
    bet.match = match;
    bet.team = match.picked;
    bet.time = new Date();
    this.betService.create(bet);

  }

}
