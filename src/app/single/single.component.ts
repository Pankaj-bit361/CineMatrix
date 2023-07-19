import { Component } from '@angular/core';
import { MovieData } from '../home/home.component';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent {

ngOnInit(){
 
}
getdata(data:MovieData){
console.log(data,"onSingleProduct Page")
}

}
