import { Component, OnInit } from '@angular/core';
import { PollService } from '../services/poll.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';
import * as fromApp from '../reducers/app.reducer';
import { Poll } from '../models/poll.model';
import { take } from 'rxjs/operators';
import * as pollAction from '../actions/poll.action';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {
  lowValue: number = 0;
  highValue: number = 20;
  userId: string;
  id: string = null;
  question: string;
  answers: string[] = [''];
  isLoading$: Observable<boolean>;
  polls$: Observable<Poll[]>;
  userId$: Observable<string>;
  
  constructor(
    private pollService: PollService, 
    private store:Store<{app: fromApp.State}>,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromApp.selectLoading);
    this.polls$ = this.store.select(fromApp.selectPolls);
    this.userId$ = this.store.select(fromApp.selectUserId);
    this.pollService.getPolls();
  }

  trackByIdx = (index: number): number => index;

  reset(): void {
    this.question = null;
    this.answers = [''];
  }

  onCreate(): void {
    this.store.select(fromApp.selectUserId).pipe(
      take(1)
    ).subscribe(userId => this.handleCreate(userId));
  }

  handleCreate(userId: string): void {
    const value: Poll = {
      author: userId,
      question: this.question,
      answers: this.answers,
      users: [],
      results: Array(this.answers.length).fill(0)
    };

    if (this.pollService.validatePoll(value)) {
      this.store.dispatch(new pollAction.CreatePoll(value));
      this.reset();
    }
  }

  onAddAnswers(): void {
    if (this.answers.length < 11) {
      this.answers.push('');
    } 
  }

  onRemoveAnswer(index: number): void {
    this.answers = this.answers.filter((answer, i) => i !== index);
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}
