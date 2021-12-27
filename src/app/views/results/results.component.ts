import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  mediaSub!: Subscription;
  allVotes = JSON.parse(localStorage['allVotes'])
  deviceXs!: boolean;
  public allUsers: any[] = JSON.parse(localStorage['allUsers']);


  eraseVotes(array: any[]){
    array.map((user)=>{
      user.vote = null
    })
    let data = JSON.stringify(this.allVotes)
    localStorage.setItem('allVotes',data)
  }
  exitRoom(){
    this.allUsers.pop()
    localStorage.setItem('allUsers', JSON.stringify(this.allUsers))
    this.router.navigate(['']);
  }

  constructor(private router: Router, public mediaObserver: MediaObserver) { }

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
