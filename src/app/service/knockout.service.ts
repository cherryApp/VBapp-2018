import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Knockout } from '../model/knockout';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class KnockoutService extends BaseService<Knockout> {

  constructor(afs: AngularFirestore) {
    super(afs);
  }
}
