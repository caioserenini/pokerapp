import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  public user: User = {username:'', owner: false};
  public form!: FormGroup;
  mediaSub!: Subscription;
  deviceXs!: boolean;
  // public otherUsers: any[] = [
  //   {username: "Alice", owner: true, vote: 5},
  //   {username: "Bruna", owner: false, vote: 5},
  //   {username: "Antônio", owner: false, vote: 5},
  //   {username: "Maria", owner: false, vote: 5},
  //   {username: "José", owner: false, vote: 5},
  //   {username: "Ronaldo", owner: false, vote: 5},

  // ]
  public allUsers: any[] = JSON.parse(localStorage['allUsers']);

  constructor(private fb: FormBuilder, public mediaObserver: MediaObserver) {
    this.form = this.fb.group({
      username: ['',Validators.required],
      owner: [false]
    })

  }

  signIn(){
     this.user.username = this.form.controls['username'].value;
     this.user.owner = this.form.controls['owner'].value;
     const data = JSON.stringify(this.user)
     localStorage.setItem('user', data)
     if(this.user.owner==true){
      this.allUsers.map((user)=>{
        user.owner = false
      })
     }

      this.allUsers.push(this.user)
     let data2 = JSON.stringify(this.allUsers)
     localStorage.setItem('allUsers', data2 )

    console.log(this.user)

  }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange)=>{
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    })
  }
  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

}
