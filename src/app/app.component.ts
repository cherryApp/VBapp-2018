import { Component, OnInit } from '@angular/core';
import { BaseService } from './service/base.service';
import { Team } from './model/team';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './service/auth.service';
import { isNull } from 'util';
import { ImportService } from './service/import.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Awesome VB2018 app';
  user: any = {};
  teamKeys: string[] = [];
  teams: Team[] = [];
  oneTeam: any;
  newRow: any = {};

  constructor(
    private baseService: BaseService<Team>,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private importService: ImportService
  ) {
    let keyTeam: Team = new Team();
    this.teamKeys = Object.keys( keyTeam );
  }

  ngOnInit() {
    this.afAuth.user.subscribe(
      user => { 
        this.user = user;
        if (!isNull(user)) {
          this.getAllData();
        }
      },
      err => console.log(err)
    );

    this.importService.getVBData();
  }
  
  getAllData() {
    this.baseService.getAll('teams').subscribe(
      teams => this.teams = teams,
      err => console.error(err)
    );
  }

  getTeam(teamID) {
    this.baseService.getOne(teamID).forEach(
      team => this.oneTeam = team
    );
  }

  updateRow(team: Team): void {
    this.baseService.update(team.id, team);
  }

  addRow(team: Team): void {
    this.baseService.create(team);
  }

  deleteRow(id: string): void {
    this.baseService.delete(id);
  }
}
