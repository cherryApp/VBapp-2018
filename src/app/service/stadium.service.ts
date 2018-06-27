import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Stadium } from '../model/stadium';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class StadiumService extends BaseService<Stadium> {

  constructor(afs: AngularFirestore) {
    super(afs);
  }
}
