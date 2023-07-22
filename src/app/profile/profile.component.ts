import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  data: any[] = [];
  val1:string=""
  val2:""=""


constructor(private apiservice:ApiService){}
isLoggedIn: boolean = false;

ngOnInit(){
  this.data = JSON.parse(localStorage.getItem('user') ?? '[]');
  this.val1 = this.data[1].username;
  this.val2 = this.data[1].dob;
}

onSelectChange(e:any) {
  const ob={
    username:this.data[1].username,
    plans:e.target.value,
    dob:this.data[1].dob
  }
  console.log(ob)
  this.apiservice.patchprofileData(this.data[1]["_id"],ob).subscribe((res)=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Plan Change successfully',
      showConfirmButton: false,
      timer: 1500
    })
    localStorage.setItem("user",JSON.stringify(res))
this.data=res[1]

  })

}


onformsubmit(){
  const ob={
    "username":this.val1,
    "plans":this.data[1].plans,
    "dob":this.val2
  }

  console.log(ob)

  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
   
    if (result.isConfirmed) {
      Swal.fire('Saved!', '', 'success')
      this.apiservice.patchprofileData(this.data[1]["_id"],ob).subscribe((res)=>{
        localStorage.setItem("user",JSON.stringify(res))
    this.data=res[1]
      })
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })

}


}
