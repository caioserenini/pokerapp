import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, take } from 'rxjs';
import { Router } from '@angular/router';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
  public user: any = JSON.parse(localStorage['user']);
  public fibonacci: number[] = [1,2,3,5,8,13,21,34,55];
  public chosen!: number;
  public allUsers: any[] = JSON.parse(localStorage['allUsers']);  
  displayedColumns: string[] = ['username','owner']
  opened = false;
  timer: number=0;
  prazo: number=8; // em segundos
  timerRunning: boolean=false;
  subscription1$!: Subscription;
  
  mediaSub!: Subscription;
  deviceXs!: boolean;
  
  constructor(private router: Router, public mediaObserver: MediaObserver) { }

  chooseNumber(number: number){
    (this.chosen==number)?(this.chosen=0):(this.chosen = number);
  }
  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange)=>{
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    })
  }

  ngOnDestroy(): void{
    if(this.subscription1$){this.subscription1$.unsubscribe()};
    this.mediaSub.unsubscribe();
  }

  unsubscribe(){

  }
  randomPick(items: number[]){
    return items[Math.floor(Math.random()*items.length)];
  }

  eraseVotes(array: any[]){
    array.map((user)=>{
      user.vote = null
    })
  }
  exitRoom(){
    this.allUsers.pop()
    localStorage.setItem('allUsers', JSON.stringify(this.allUsers))
    this.router.navigate(['']);
  }
  startTimer(){
    this.timerRunning = true;
    const obs$ = interval(1000).pipe(take(this.prazo+1));
    this.subscription1$ =obs$.subscribe((d)=>{
      this.timer = d  ;
      if(this.timer==this.prazo){
        console.log('Chosen: '+ this.chosen)
        console.log(this.allUsers[this.allUsers.length - 1])
        this.allUsers.map((user, index)=>{
          index!=this.allUsers.length - 1?user.vote= this.randomPick(this.fibonacci):user.vote=this.chosen;
        })
        //this.allUsers[this.allUsers.length - 1].vote = this.chosen;
        console.log(this.allUsers)
        const data3 = JSON.stringify(this.allUsers)
        localStorage.setItem('allVotes', data3)
        setTimeout(()=>{
          if(this.chosen>0){
          this.router.navigate(['results']);}
        },1000)
        
      }

    })
  }

}
