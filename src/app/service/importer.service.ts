import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamService } from './team.service';
import { StadiumService } from './stadium.service';
import { KnockoutService } from './knockout.service';
import { BaseService } from './base.service';
import { Knockout } from '../model/knockout';

@Injectable({
  providedIn: 'root'
})
export class ImporterService {
  jsonURL: string = "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json";
  vbData: any = {};
  constructor(
    private http: HttpClient,
    private tService: TeamService,
    private sService: StadiumService,
    private kService: KnockoutService
  ) { }

  getJsonData() {
    this.http.get(this.jsonURL).forEach(
      jsonData => {
        console.log(jsonData);
        this.vbData = jsonData;
        this.processData();
      }
    );
  }

  processData() {
    this.pushAll(this.tService, 'teams', this.vbData.teams);
    this.pushAll(this.sService, 'stadiums', this.vbData.stadiums);
    
    let knocks: Knockout[] = [];
    for (let k in this.vbData.knockout) {
      this.vbData.knockout[k].id = k;
      knocks.push(this.vbData.knockout[k]);
    }
    this.pushAll(this.kService, 'knockout', knocks);
  }

  pushAll(service, collectionName, data) {
    service.getAll(collectionName).subscribe(
      list => {
        let db: firebase.firestore.Firestore = service.itemsCollection.ref.firestore;
        let batch = db.batch();

        for (let k in data) {
          let id = data[k].id.toFixed ? data[k].id.toFixed() : data[k].id;
          let ref = db.collection(collectionName).doc(id);
          batch.set(ref, data[k]);
        }

        batch.commit().then( () => {
          console.log(`${collectionName} committed`);
        });
      }
    );
  }
}
