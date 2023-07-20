import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


export interface MovieData{
  title:string
  img:string
  print:string
  language:string
  duration:string
  about:string
  _id:string
  genre:string
  likes:string
  rating:string
  img2:string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 movies:MovieData[] =[]
 movies2:MovieData[]=[]
constructor(private apiService:ApiService,private router:Router){}


ngOnInit(){
  this.apiService.fetchMovies().subscribe((response)=>{
    for(let i=0;i< response.length/2;i++){
      this.movies.push(response[i])
    }
    for(let i=response.length/2;i<response.length;i++){
      this.movies2.push(response[i])
    }
   console.log(this.movies,this.movies2)
  })
}


movieclick(data:MovieData){
  console.log(data)

  this.router.navigate(["/single",data._id])
}

}
