import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamService } from './team.service';
import { firestore } from 'firebase';
import { BaseService } from './base.service';
import { Team } from '../model/team';
import { Stadium } from '../model/stadium';
import { Tvchannel } from '../model/tvchannel';
import { Knockout } from '../model/knockout';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  jsonUrl: string = "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json";
  vbData: any = {};
  teams: any = [];

  constructor(
    private http: HttpClient,
    private teamService: BaseService<Team>,
    private stadiumService: BaseService<Stadium>,
    private tvService: BaseService<Tvchannel>,
    private knockService: BaseService<Knockout>,
  ) { }

  getVBData() {
    this.http.get(this.jsonUrl)
      .forEach(
        vbData => this.processVBData(vbData)
      );
  }

  processVBData(vbData): void {
    // Get a new write batch
    this.pushAll(this.teamService, 'teams', vbData.teams);
    this.pushAll(this.stadiumService, 'stadiums', vbData.stadiums);
    this.pushAll(this.tvService, 'tvchannels', vbData.tvchannels);

    let knockout = [];
    for (let k in vbData.knockout) {
      vbData.knockout[k].id = k;
      knockout.push( vbData.knockout[k] );
    }
    console.log( knockout );
    this.pushAll(this.knockService, 'knockout', knockout);
  }

  pushAll(service, serviceName, data): void {
    service.getAll(serviceName).subscribe(
      list => {
        let db = service.itemsCollection.ref.firestore;
        let batch = db.batch();
    
        for (let k in data) {
          let id = data[k].id.toFixed ? data[k].id.toFixed() : data[k].id;
          let laRef = db.collection(serviceName).doc(id);
          batch.set(laRef, data[k]);
        }
    
        // Commit the batch
        batch.commit().then( () => {
          console.log( `commit done: ${serviceName}` );
        });
      }
    );
  }
}
