import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from  'rxjs/operators';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  allMessages: Observable<Message[]>;
  messageCollection: AngularFirestoreCollection<Message>; //pipeline to firebase database

  constructor(private fb: AngularFirestore) {
    this.messageCollection = fb.collection<Message>('posts'); // initialize connection app -> firebase

   }

   retrieveMessagesFromDB(){
    this.allMessages = this.messageCollection.snapshotChanges().pipe(
      map(actions => {
          return actions.map(a => {
              let data = a.payload.doc.data();
              var d: any = data.createdOn; // <- firebase data format
              if(d){
                data.createdOn = new firestore.Timestamp(d.seconds, d.nanoseconds).toDate();
              }
              return {... data }
          })
      })
    );
  }


   //this is the preffered method to get data back form firebase (w/o dates)
  //  retrieveMessageFromDB(){
  //   this.allMessages = this.messageCollection.valueChanges();
  //  }



  public saveMessage(message){
    var plain = Object.assign({}, message);
    this.messageCollection.add(plain);

    console.log(plain);
    console.log(message);

  }

  public getAllMessages(){
    this.retrieveMessagesFromDB(); //subcribe to changes
    return this.allMessages;

  }
}

