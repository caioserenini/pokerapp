import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  public user: User = {username:'', owner: false};
  public form!: FormGroup;
  public otherUsers: any[] = [
    {username: "Alice", owner: true, vote: 5},
    {username: "Bruna", owner: false, vote: 5},
    {username: "Antônio", owner: false, vote: 5},
    {username: "Maria", owner: false, vote: 5},
    {username: "José", owner: false, vote: 5},
    {username: "Ronaldo", owner: false, vote: 5},
                                
  ]
  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      username: ['',Validators.required],
      owner: [false]
    })
    this.user.username = 'Caioo'
  }

  signIn(){
     this.user.username = this.form.controls['username'].value;
     this.user.owner = this.form.controls['owner'].value;
     const data = JSON.stringify(this.user)     
     localStorage.setItem('user', data)
     if(this.user.owner==true){
       this.otherUsers[0].owner = false;
     }
      this.otherUsers.push(this.user)
     let data2 = JSON.stringify(this.otherUsers)
     localStorage.setItem('allUsers', data2 )
    
    console.log(this.user)

  }
  
  ngOnInit(): void {
  }

}
