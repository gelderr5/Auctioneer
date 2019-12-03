import {Component, OnInit} from '@angular/core';
import * as firebase from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app-fb.component.html',
  styleUrls: ['./app-fb.component.css']
})
export class AppFbComponent implements OnInit {

  ngOnInit() {
    const firebaseConfig = {
      apiKey: "AIzaSyB2ZlXAVSLbzRxVk0wMuzGoYBF-aQ8hoMM",
      authDomain: "the-auctioneer-c8b9a.firebaseapp.com",
      databaseURL: "https://the-auctioneer-c8b9a.firebaseio.com",
      projectId: "the-auctioneer-c8b9a",
      storageBucket: "the-auctioneer-c8b9a.appspot.com",
      messagingSenderId: "81831106957",
      appId: "1:81831106957:web:f10047ee76ff5a56db85c4",
      measurementId: "G-0QY8FFS71Q"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
