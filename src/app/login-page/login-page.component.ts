import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  hide = true;
  admin_login!:FormGroup


  constructor(
    private service:ServiceService,
    private route:Router,
    private formbuilder:FormBuilder
  ){
    localStorage.removeItem
    localStorage.clear()
  }

  ngOnInit(): void {
    this.admin_login = this.formbuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }


  login(){
    if(this.admin_login.valid){
      this.service.adminLogin(this.admin_login.value).subscribe(
        (res:any) => {
          if(res.success){
            localStorage.setItem('Token', JSON.stringify(res.data[0]));
            this.route.navigate(['home']);
            alert('Login Successfully')
          }
          else{
            alert('Invalid user name or password')
          }
        }
      )
    }
    else{
      alert('Fill all mandatory fields')
    }
  }

  forgot(){
    alert('T ham ki kariau ab')
  }
}
