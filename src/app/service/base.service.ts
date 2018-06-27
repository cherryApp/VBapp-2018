import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from '../model/team';

/**
 * Service for get data from firebase.
 * This is a CRUD service. Create, Read, Update, Delete.
 */
@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  itemsCollection: AngularFirestoreCollection<T>;
  collectionName: string = '';
  afs: AngularFirestore;

  constructor(afs: AngularFirestore) {
    this.afs = afs;
  }

  getAll(collectionName: string): Observable<T[]> {
    if (!this.itemsCollection) {
      this.collectionName = collectionName;
      this.itemsCollection = this.afs.collection<T>(this.collectionName);
    }

    return this.itemsCollection.snapshotChanges().pipe(
      map(action => action.map(a => {
        const data = a.payload.doc.data();
        data['id'] = a.payload.doc.id;
        return data;
      }))
    );
  }

  getOne(teamOrID: T | string): Observable<{}> {
    let id = teamOrID['id'] || teamOrID;
    return this.itemsCollection.doc(id).valueChanges().pipe(
      map( doc => {
        doc['id'] = id;
        return doc;
      })
    );
  }

  create(team: T): Promise<any> {
    delete team['id'];
    return this.itemsCollection.add(team);
  }

  update(teamOrID: T | string, newTeamData: any): void {
    let id = teamOrID['id'] || teamOrID;
    this.itemsCollection.doc(id).update(newTeamData);
  }

  delete(teamOrID: T | string): void {
    let id = teamOrID['id'] || teamOrID;
    this.itemsCollection.doc(id).delete();
  }
}
