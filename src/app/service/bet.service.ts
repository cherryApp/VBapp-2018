import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Bet } from '../model/bet';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class BetService extends BaseService<Bet> {

  constructor(afs: AngularFirestore) {
    super(afs);
  }
}
