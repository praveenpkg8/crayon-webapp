import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../httpLink';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  ngOnInit() {

  }
  public imagePath;
  selectedFile= null;
  url: any = null;
  upload: boolean = true;
  description: string = '';

  constructor(private http: HttpClient){}
// selecting image for preview
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.imagePath = event.target.files;
      this.upload = false;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result; //add source to image
        
      }
      this.selectedFile = event.target.files[0];
    }
  }

     onClickMe() {
      this.url = null; // hiding image preview
      this.upload = true; // disable upload button again

    }
    
    //upload file to datastore
    onUpload(){
      const fd = new FormData();
      fd.append('file', this.selectedFile)
      fd.append('description', this.description)
      this.http.post(URL + 'api/newsfeed', fd)
      .subscribe(res => {
        console.log(res);
      })
      this.description = '';
    }
  

}
