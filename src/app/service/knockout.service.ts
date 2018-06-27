import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Knockout } from '../model/knockout';

@Injectable({
  providedIn: 'root'
})
export class KnockoutService extends BaseService<Knockout> {

  constructor(afs: AngularFirestore) {
    super(afs);
  }
}
