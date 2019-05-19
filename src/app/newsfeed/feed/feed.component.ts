import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../httpLink';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private http: HttpClient){}
  feeds: any = null;
  ngOnInit() {
    this.http.get(URL + 'api/newsfeed')
    .subscribe( res => {
      this.feeds = res
      console.log(this.feeds)
    })
  }
  url : string = "assets/uploads/"
  description: string = "With supporting text below as a natural lead-in to additional content.";
  profileName: string = "Jon Snow"





}
