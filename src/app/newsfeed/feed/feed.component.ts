import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL } from '../../httpLink';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private http: HttpClient){}
  feeds: any = null;
  page_num = "1";
  url : string = "assets/uploads/";
  description: string = "With supporting text below as a natural lead-in to additional content.";
  profileName: string = "Jon Snow";
  like_count: number = 0;
  toggle: boolean = true;
  status = 'Enable'; 
  converted_date: Date;
  // calls feed for diaplay from database
  ngOnInit() {
    let params = new HttpParams().set("page", this.page_num);
    this.http.get(URL + 'api/newsfeed/paginate',{ "params": params})
    .subscribe( res => {
      this.feeds = res['pages'];
      this.page_num = res['number'];
    })

  }
// display date in feed
  displayDate(date){
    this.converted_date = new Date(date)
    var day = this.converted_date.getDate();
    var monthIndex = this.converted_date.getMonth();
    var year = this.converted_date.getFullYear();
    var minutes = this.converted_date.getMinutes();
    var hours = this.converted_date.getHours();
    var seconds = this.converted_date.getSeconds();
    var myFormattedDate = day+"-"+(monthIndex+1)+"-"+year+" "+ hours+":"+minutes+":"+seconds;
    return myFormattedDate;

  }
  

// navigation of pagination
  navPaginate(num){
    let params = new HttpParams().set("page", num);
    this.http.get(URL + 'api/newsfeed/paginate',{ "params": params})
    .subscribe( res => {
      this.feeds = res['pages'];
      this.page_num = res['number'];
    })

  }
// updating like count
  updateLike(id, feed){
    this.http.put(URL +'api/feed/like', {"id": id})
    .subscribe( res => {
      feed.like_count = res['like_count']
    })
    feed.is_active = !feed.is_active;
  }







}
