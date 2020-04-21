import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Message } from '../models/message';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  displayMessage: Message[];
  

  constructor(private data: DataService, private shared: SharedService) {

    this.homework();
    data.getAllMessages().subscribe(list => {

     var filtered = [];
     for(let i = 0; i <list.length; i++){

      var m = list[i];
      if(m.to == "General" || m.to == shared.userName || m.from == shared.userName){

        filtered.push(m);
      }
     }


      this.displayMessage = filtered.sort((left, right) => {
        // return -1 when left should go first
        // return 1 when the right should go first
        //return 0 if they are the same
        
        if(!left.createdOn) return -1; // if left dont have a data it goes first
        if(left.createdOn > right.createdOn){

          return 1;
        }
        else if(right.createdOn > left.createdOn){

          return -1;
        }
          
        return 0;

      })
    });
    
  }

  homework(){
    var data =[
      {
        "_id": "5e935f94b0ecb3f1e7c2188d",
        "isActive": false,
        "balance": "$1,109.06",
        "picture": "http://placehold.it/32x32",
        "age": 26,
        "name": "Mccall Osborn",
        "gender": "male"
      },
      {
        "_id": "5e935f94d65b81a62f64430e",
        "isActive": false,
        "balance": "$2,152.47",
        "picture": "http://placehold.it/32x32",
        "age": 25,
        "name": "Olson Lowe",
        "gender": "male"
      },
      {
        "_id": "5e935f94889d06c58631e68e",
        "isActive": true,
        "balance": "$2,701.96",
        "picture": "http://placehold.it/32x32",
        "age": 33,
        "name": "Delores Leonard",
        "gender": "female"
      },
{
        "_id": "5e935f94f20f720d11cd6093",
        "isActive": true,
        "balance": "$1,215.36",
        "picture": "http://placehold.it/32x32",
        "age": 40,
        "name": "Fleming Foley",
        "gender": "male"
      },
      {
        "_id": "5e935f948c4a563504788d41",
        "isActive": true,
        "balance": "$2,077.13",
        "picture": "http://placehold.it/32x32",
        "age": 26,
        "name": "Pena Wyatt",
        "gender": "male"
      },
      {
        "_id": "5e935f9459e91f3b5d650b4d",
        "isActive": false,
        "balance": "$1,775.41",
        "picture": "http://placehold.it/32x32",
        "age": 39,
        "name": "Lara Deleon",
        "gender": "male"
      },
      {
        "_id": "5e935f944b34247e8b9ffc46",
        "isActive": false,
        "balance": "$1,322.41",
        "picture": "http://placehold.it/32x32",
        "age": 29,
        "name": "Landry Guerra",
        "gender": "male"
      },
      {
        "_id": "5e935f94a12111bc33101587",
        "isActive": false,
        "balance": "$3,259.59",
        "picture": "http://placehold.it/32x32",
        "age": 21,
        "name": "Sarah Cole",
        "gender": "female"
      },
      {
        "_id": "5e935f945e70b7835c3b4508",
        "isActive": true,
        "balance": "$3,942.66",
        "picture": "http://placehold.it/32x32",
        "age": 36,
        "name": "Watkins Manning",
        "gender": "male"
      }
    ]
    
  
    console.log(data);
    //1 - Sort items by Age Desc
    //this.solve1(data);
    //2 - Sort items by age Asc
    //this.solve2(data);
    //3 - Print only active
    this.solve3(data);
    //4 - Sum all the balances
    this.solve4(data);
  }
    solve1(data){
      data.sort((a,b) => {

        return b.age - a.age;
      });
    }

    solve2(data){
      data.sort((a,b) => {

       return a.age - b.age;
      });

    }
    solve3(data){
   
      data.forEach((d) => {
        if(d.isActive === true){
          console.log(`${d.isActive}`);
        }
        
    });
     
   }
    
   solve4(data){

    var total = 0;
    data.forEach((d) => {
    
    var num = d.balance.replace("$","").replace(",","");
    var pnum = parseFloat(num);
    var sum = total += pnum;
    console.log(`${sum++}`);
    
  });
  
      
  }



}
