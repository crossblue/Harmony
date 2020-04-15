import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from  'rxjs/operators';
import { firestore } from 'firebase';
import { Friend } from '../models/friend';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  allMessages: Observable<Message[]>;
  messageCollection: AngularFirestoreCollection<Message>; //pipeline to firebase database

  allFriends: Observable<Friend[]>;
  friendCollection: AngularFirestoreCollection<Friend>; //pipeline to firebase db

  constructor(private fb: AngularFirestore) {
    this.messageCollection = fb.collection<Message>('posts'); // initialize connection app -> firebase

    this.friendCollection = fb.collection<Friend>('friends');//initialize connection

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

  retriveFriendsFromDB(){
    this.allFriends = this.friendCollection.valueChanges();

  }

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
  public saveFriend(friend){

    var plain = Object.assign({}, friend);
    this.friendCollection.add(plain);
  }

  public getAllFriends(){

    this.retriveFriendsFromDB();
    return this.allFriends;
  }
  
}

