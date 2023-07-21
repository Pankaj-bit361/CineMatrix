import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieData } from '../home/home.component';
import { ApiService } from '../api.service';

// Define the new interface for movie details


@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent {
  data!: MovieData; // Use non-null assertion operator



  constructor(private route: ActivatedRoute, private apiservice: ApiService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.apiservice.fetchSingleData(id).subscribe((res) => {
        this.data = res[0];
        console.log(this.data,this.data.img);
      });
    });
  }

handlecinema(){
  this.router.navigate(["/cinema",this.data.title])
}

}
