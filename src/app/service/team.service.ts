import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Team } from '../model/team';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService<Team> {

  constructor(afs: AngularFirestore) {
    super(afs);
  }
}
