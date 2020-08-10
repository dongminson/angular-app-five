import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PollService } from '../services/poll.service';
import { Poll } from '../models/poll.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../reducers/app.reducer';
import * as AppAction from '../actions/poll.action';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit, OnDestroy {
  @Input() poll: Poll;
  @Input() question: string = '';
  @Input() answers: string[];
  @Input() userId: string;
  @Output() answersEmitter: EventEmitter<string[]> = new EventEmitter<string[]>();
  edit: boolean = false;
  result: boolean = false;
  selected: number;

  constructor(
    private pollService: PollService, 
    private store:Store<{app: fromApp.State}>,
  ) {}

  ngOnInit(): void {
    this.answersEmitter.subscribe(answers => this.answers = answers);
  }

  ngOnDestroy(): void {
    this.answersEmitter.unsubscribe();
  }

  trackByIdx = (index: number): number => index;
  
  onAddAnswers(): void {
    if (this.answers && this.answers.length < 11) {
      this.answersEmitter.emit([...this.answers, '']);
    }
  }
  
  emitAnswers(value: string, index: number): void {
    this.answersEmitter.emit(
      this.answers.map((answer, i) => {
        return i === index
          ? value
          : answer;
      })
    );
  }

  onRemoveAnswer(index: number): void {
    this.answersEmitter.emit(
      this.answers.filter((answer, i) => i !== index)
    );
  }

  onDelete(id: string): void {
    this.store.dispatch(new AppAction.DeletePoll(id));
  }

  onToggleEdit(): void {
    this.edit = !this.edit;
    this.result = false;
  }

  onEdit(): void {
    let results = new Array(this.answers.length).fill(0);
    const value: Poll = {
      id: this.poll.id,
      author: this.poll.author,
      question: this.question,
      answers: this.answers,
      users: [],
      results: results
    };
    if (this.pollService.validatePoll(value)) {
      this.store.dispatch(new AppAction.UpdatePoll(value));
      this.onToggleEdit();
    }
  }

  onSend(): void {
    let results = [...this.poll.results];
    results[this.selected] = results[this.selected]+1;
    let users = [...this.poll.users];
    users.push(this.userId);
    const value: Poll = {
      id: this.poll.id,
      author: this.poll.author,
      question: this.poll.question,
      answers: this.poll.answers,
      users: users,
      results: results
    };
    this.store.dispatch(new AppAction.UpdatePoll(value));
  }

  toggleResult(): void {
    this.result = !this.result;
  }

  calculateWidth(index: number): number {
    let total = this.countTotal();
    if (this.poll.results[index]) {
      return this.poll.results[index]/total*100;
    } else {
      return 0;
    }
  }

  countTotal():number {
    return this.poll.results.reduce((acc, num) => {return acc + num});
  }
}
