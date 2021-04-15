import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudeService {
  
  
  constructor(public fireservices:AngularFirestore) { }

  create_Newemployee(Record: any)
  {
     return this.fireservices.collection('Employee').add(Record);
  }

  get_Allemployee():any{
    return this.fireservices.collection('Employee').snapshotChanges();
  }

  update_employee(recordid:any, record:any)
  {
    this.fireservices.doc('Employee/' + recordid).update(record);
  }
  delete_employee(record_id: any)
  {
    this.fireservices.doc('Employee/' + record_id).delete();
  }
}
