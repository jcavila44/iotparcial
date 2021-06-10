import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Mcu } from '../models/mcu';


@Injectable({
  providedIn: 'root'
})
export class McuService {

  mcu: AngularFireList<Mcu>;

  constructor(public db: AngularFireDatabase) {
    this.mcu = db.list(environment.path.mcu);
  }

  getElementsMcu() {

    this.mcu = this.db.list(environment.path.mcu);

    return this.mcu.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, value: c.payload.val() }))
      )
    );
  }


  PowerOnFan() {
    return this.db.object('/').update({
      fan: '1'
    });
  }

  PowerOffFan() {
    return this.db.object('/').update({
      fan: '0'
    });
  }

  PowerOnLedNode() {
    return this.db.object('/').update({
      ledApp: '1'
    });
  }

  PowerOffLedNode() {
    return this.db.object('/').update({
      ledApp: '0'
    });
  }

  PowerOnBuzzer() {
    return this.db.object('/').update({
      buzzer: '1'
    });
  }





}
