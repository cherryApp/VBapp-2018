import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Stadium } from '../model/stadium';

@Injectable({
  providedIn: 'root'
})
export class StadiumService extends BaseService<Stadium> {

  constructor(afs: AngularFirestore) {
    super(afs);
  }
}
