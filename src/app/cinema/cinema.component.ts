import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MovieData } from '../home/home.component';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent {
  dates: string[][] = [];
  data: MovieData[]=[];
  y=0;
  MovieName!: "";
  datesData1:string[][]=[]
  constructor(private route: ActivatedRoute, private apiservice: ApiService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const title = params["title"];

      this.apiservice.fetchcinemaData(title,"").subscribe((response) => {
        this.data = response;
        this.MovieName = title;
        console.log(this.data,"line 26");
      });

      
    });
   this.getDate()
  }


  getDate() {
    let someDate = new Date();
    const numberOfDaysToAdd = 10;
    this.dates = [];
  
    for (let i = 0; i < numberOfDaysToAdd; i++) {
      someDate.setDate(someDate.getDate() + i);
      console.log(someDate);
      let dateString = someDate.toDateString(); // Convert the Date object to a string
      let dateParts = dateString.split(" "); // Split the string into an array of parts
  
      this.dates.push(dateParts);
    }
    console.log(this.dates);
    
  }
  
  seat(){
    this.router.navigate(["/seats"])
  }

  getChange(e: any): void {
    console.log(e.target.value); 
  this.apiservice.fetchcinemaData(this.MovieName,e.target.value).subscribe((response)=>{
    console.log(response)
   this.data=response
  })
  }

}